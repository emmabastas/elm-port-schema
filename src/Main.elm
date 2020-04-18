port module Main exposing
    ( BadDeclarationError(..)
    , Error(..)
    , errorToString
    , main
    , parseElm
    , schemaFromElm
    )

import Elm.Parser
import Elm.Processing
import Elm.Syntax.Declaration exposing (Declaration)
import Elm.Syntax.Exposing
import Elm.Syntax.File exposing (File)
import Elm.Syntax.Module as Module
import Elm.Syntax.ModuleName exposing (ModuleName)
import Elm.Syntax.Node as Node exposing (Node(..))
import Elm.Syntax.TypeAnnotation exposing (TypeAnnotation)
import GenerateElm exposing (generateElm)
import GenerateTypeScript exposing (generateTypeScript)
import Json.Decode as Decode
import Json.Encode as Encode
import Parser
import Platform
import Result.Extra
import Schema exposing (Schema)
import String.Format exposing (namedValue)


port done : Encode.Value -> Cmd msg


main : Platform.Program Decode.Value () ()
main =
    Platform.worker
        { init = \request -> ( (), done (handleRequest request) )
        , update = \_ _ -> ( (), Cmd.none )
        , subscriptions = \_ -> Sub.none
        }


handleRequest : Decode.Value -> Encode.Value
handleRequest unDecodedRequest =
    case decodeRequest unDecodedRequest of
        Ok request ->
            request.schemaContents
                |> parseElm
                |> Result.andThen schemaFromElm
                |> Result.map
                    (\schema ->
                        { generatedElm = generateElm schema
                        , generatedTypescript = generateTypeScript schema
                        }
                    )
                |> encodeResponse

        Err err ->
            encodeResponse (Err err)


type alias Request =
    { schemaContents : String }


type alias Response =
    Result Error
        { generatedElm : String
        , generatedTypescript : String
        }


type Error
    = DecodeRequestError Decode.Error
    | ParseSchemaError (List Parser.DeadEnd)
    | NotNamedSchema ModuleName
    | IsPortModule
    | IsEffectModule
    | DoesNotExposeAll
    | ContainsImports
    | MissingFromElmMessageDeclaration
    | MissingToElmMessageDeclaration
    | ContainsBadDeclarations (List BadDeclarationError)


type BadDeclarationError
    = IsValue
    | IsParametric
    | ContainsFunction
    | ContainsInvalidReference
    | ContainsInvalidTuple


parseElm : String -> Result Error File
parseElm schema =
    Elm.Parser.parse schema
        |> Result.mapError ParseSchemaError
        |> Result.map (Elm.Processing.process Elm.Processing.init)


schemaFromElm : File -> Result Error Schema
schemaFromElm file =
    let
        moduleName =
            Module.moduleName (Node.value file.moduleDefinition)
    in
    if moduleName /= [ "Schema" ] then
        Err (NotNamedSchema moduleName)

    else if Module.isPortModule (Node.value file.moduleDefinition) then
        Err IsPortModule

    else if Module.isEffectModule (Node.value file.moduleDefinition) then
        Err IsEffectModule

    else if not (exposesAll file) then
        Err DoesNotExposeAll

    else if List.length file.imports /= 0 then
        Err ContainsImports

    else
        let
            ( schemaDeclarations, errors ) =
                file.declarations
                    |> List.map Node.value
                    |> List.map schemaDeclarationFromElmDeclaration
                    |> Result.Extra.partition

            hasFromElmMessage =
                List.any
                    ((==) "FromElmMessage" << Schema.declarationName)
                    schemaDeclarations

            hasToElmMessage =
                List.any
                    ((==) "ToElmMessage" << Schema.declarationName)
                    schemaDeclarations
        in
        if List.length errors /= 0 then
            Err (ContainsBadDeclarations errors)

        else if not hasFromElmMessage then
            Err MissingFromElmMessageDeclaration

        else if not hasToElmMessage then
            Err MissingToElmMessageDeclaration

        else
            Ok { declarations = schemaDeclarations }


exposesAll : File -> Bool
exposesAll file =
    case Module.exposingList (Node.value file.moduleDefinition) of
        Elm.Syntax.Exposing.All _ ->
            True

        Elm.Syntax.Exposing.Explicit _ ->
            False


schemaDeclarationFromElmDeclaration : Declaration -> Result BadDeclarationError Schema.Declaration
schemaDeclarationFromElmDeclaration elmDeclaration =
    case elmDeclaration of
        Elm.Syntax.Declaration.AliasDeclaration { name, typeAnnotation } ->
            schemaTypeFromElmTypeAnnotation (Node.value typeAnnotation)
                |> Result.map
                    (\schemaType ->
                        Schema.TypeAliasDeclaration
                            { name = Node.value name
                            , definition = schemaType
                            }
                    )

        Elm.Syntax.Declaration.CustomTypeDeclaration customType ->
            customType.constructors
                |> List.map
                    (\(Node _ { name, arguments }) ->
                        List.map
                            (schemaTypeFromElmTypeAnnotation << Node.value)
                            arguments
                            |> Result.Extra.combine
                            |> Result.map
                                (\schemaArguments ->
                                    { name = Node.value name
                                    , arguments = schemaArguments
                                    }
                                )
                    )
                |> Result.Extra.combine
                |> Result.map
                    (\schemaConstructors ->
                        Schema.CustomTypeDeclaration
                            { name = Node.value customType.name
                            , constructors = schemaConstructors
                            }
                    )

        _ ->
            Err IsValue


schemaTypeFromElmTypeAnnotation : TypeAnnotation -> Result BadDeclarationError Schema.Type
schemaTypeFromElmTypeAnnotation typeAnnotation =
    case typeAnnotation of
        Elm.Syntax.TypeAnnotation.GenericType _ ->
            Err IsParametric

        Elm.Syntax.TypeAnnotation.Unit ->
            Ok Schema.Unit

        Elm.Syntax.TypeAnnotation.Typed (Node _ ( moduleName, typeName )) typeAnnotations ->
            let
                typeParameters =
                    List.map (schemaTypeFromElmTypeAnnotation << Node.value) typeAnnotations
                        |> Result.Extra.combine
            in
            case ( moduleName, typeName, typeParameters ) of
                ( [], "Bool", Ok [] ) ->
                    Ok Schema.Bool

                ( [], "Int", Ok [] ) ->
                    Ok Schema.Int

                ( [], "Float", Ok [] ) ->
                    Ok Schema.Float

                ( [], "Char", Ok [] ) ->
                    Ok Schema.Char

                ( [], "String", Ok [] ) ->
                    Ok Schema.String

                ( [], "List", Ok [ t ] ) ->
                    Ok (Schema.List t)

                ( [], "Maybe", Ok [ t ] ) ->
                    Ok (Schema.Maybe t)

                ( [], "Result", Ok [ t1, t2 ] ) ->
                    Ok (Schema.Result t1 t2)

                ( [], s, Ok [] ) ->
                    Ok (Schema.TypeRef s)

                ( [], _, Err err ) ->
                    Err err

                _ ->
                    Err ContainsInvalidReference

        Elm.Syntax.TypeAnnotation.Tupled typeAnnotations ->
            let
                typeParameters =
                    List.map (schemaTypeFromElmTypeAnnotation << Node.value) typeAnnotations
                        |> Result.Extra.combine
            in
            case typeParameters of
                Err err ->
                    Err err

                Ok [ t1, t2 ] ->
                    Ok (Schema.Tuple t1 t2)

                Ok [ t1, t2, t3 ] ->
                    Ok (Schema.Tuple3 t1 t2 t3)

                _ ->
                    Err ContainsInvalidTuple

        Elm.Syntax.TypeAnnotation.Record recordFields ->
            recordFields
                |> List.map
                    (\(Node _ ( Node _ fieldName, Node _ fieldTypeAnnotation )) ->
                        schemaTypeFromElmTypeAnnotation fieldTypeAnnotation
                            |> Result.map
                                (\schemaType ->
                                    { name = fieldName
                                    , type_ = schemaType
                                    }
                                )
                    )
                |> Result.Extra.combine
                |> Result.map Schema.Record

        Elm.Syntax.TypeAnnotation.GenericRecord _ _ ->
            Err IsParametric

        Elm.Syntax.TypeAnnotation.FunctionTypeAnnotation _ _ ->
            Err ContainsFunction


decodeRequest : Decode.Value -> Result Error Request
decodeRequest value =
    let
        decoder =
            Decode.map Request
                (Decode.field "schemaContents" Decode.string)
    in
    Decode.decodeValue decoder value
        |> Result.mapError DecodeRequestError


encodeResponse : Response -> Encode.Value
encodeResponse response =
    let
        status =
            case response of
                Ok _ ->
                    [ ( "status", Encode.string "success" ) ]

                Err _ ->
                    [ ( "status", Encode.string "error" ) ]

        data =
            case response of
                Ok { generatedElm, generatedTypescript } ->
                    [ ( "generatedElm", Encode.string generatedElm )
                    , ( "generatedTypescript", Encode.string generatedTypescript )
                    ]

                Err err ->
                    [ ( "type", Encode.string "error" )
                    , ( "message", Encode.string (errorToString err) )
                    ]
    in
    Encode.object (status ++ data)


errorToString : Error -> String
errorToString err =
    case err of
        DecodeRequestError decodeError ->
            """---Unknown Error!---
Well this is embarasing. Something has gone wrong but i don't know why.. This is probably a bug. Full error message:
{{ error }}"""
                |> namedValue "error" (Decode.errorToString decodeError)

        ParseSchemaError deadEnds ->
            """---Parse schema error!---
Im got stuck parsing your schema. unfortunatley im not sophisticated enough to produce i nice error message, but here is my best atempt:
{{ error }}"""
                |> namedValue "error" (Parser.deadEndsToString deadEnds)

        NotNamedSchema currentName ->
            """---Error: module must be named schema!---
Your schema must be named "Schema", it is currently named {{ currentName }}"""
                |> namedValue "currentName" (String.join "." currentName)

        IsPortModule ->
            """---Error: schema is port module!---
your schema is as a port module, i will automatically generate ports for you so there is no need to place any in your scmema. The first line of your schema should be this: "module Schema expoisng (..)\""""

        IsEffectModule ->
            """---Error: schema is effect module!---
Hey you! Stop that!"""

        DoesNotExposeAll ->
            """---Error: module does not expose all---
Maybe this is a bit strict on my part but you should expose everyting in your schema, i.e. the first line of your schema should be "module Schema exposing(..)\""""

        ContainsImports ->
            """---Error: contains imports---
Your module contains import. Unfortunately i can't handle this (but maybe in the future??). You will have to remove all imports."""

        ContainsBadDeclarations _ ->
            """---Error: bad declarations---
You have used some declarations in your schema that i don't know how to deal with. You can't have anything that:
is a value. E.g "myValue = 1"
is a function. E.g "myFunction n = n + 1
has type variables in them. E.g type MyParametricType a = Foo a

The only types you are alowed to reference are those defined by you in your schema and thes ones: (), Bool, Int, Float, Char, String, List, Maybe and Result.
"""

        MissingFromElmMessageDeclaration ->
            """---Error: missing FromElmMessage---
I can't find a FromElmMessage type in your schema, maybe you misspelled it?
I always need a FromElmMessage type to be declared even if you wont use it. In that case just declare it as "type alias FromElmMessage = ()\""""

        MissingToElmMessageDeclaration ->
            """---Error: missing ToElmMessage---
I can't find a ToElmMessage type in your schema, maybe you misspelled it?
I always need a ToElmMessage type to be declared even if you wont use it. In that case just declare it as "type alias ToElmMessage = ()\""""
