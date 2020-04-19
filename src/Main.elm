port module Main exposing
    ( BadDeclarationError(..)
    , Error(..)
    , SchemaFromElmError(..)
    , errorToString
    , main
    , schemaFromElm
    )

import Elm.Interface as Interface exposing (Interface)
import Elm.Parser
import Elm.Processing
import Elm.RawFile exposing (RawFile)
import Elm.Syntax.Declaration exposing (Declaration)
import Elm.Syntax.Exposing
import Elm.Syntax.Module as Module
import Elm.Syntax.Node as Node exposing (Node(..))
import Elm.Syntax.Range as Range exposing (Location, Range)
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
                |> Elm.Parser.parse
                |> Result.mapError ParseElm
                |> Result.andThen
                    (\ast ->
                        schemaFromElm ast
                            |> Result.mapError
                                (SchemaFromElm request.schemaContents)
                    )
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


decodeRequest : Decode.Value -> Result Error Request
decodeRequest value =
    let
        decoder =
            Decode.map Request
                (Decode.field "schemaContents" Decode.string)
    in
    Decode.decodeValue decoder value
        |> Result.mapError DecodeRequest


encodeResponse : Response -> Encode.Value
encodeResponse response =
    case response of
        Ok { generatedElm, generatedTypescript } ->
            Encode.object
                [ ( "generatedElm", Encode.string generatedElm )
                , ( "generatedTypescript", Encode.string generatedTypescript )
                ]

        Err err ->
            Encode.object
                [ ( "errorMessage", Encode.string (errorToString err) )
                ]


type Error
    = DecodeRequest Decode.Error
    | ParseElm (List Parser.DeadEnd)
    | SchemaFromElm String SchemaFromElmError


type SchemaFromElmError
    = NotCorrectModuleName Range
    | IsPortModule Range
    | IsEffectModule Range
    | DoesNotExposeAll Range
    | ContainsImports (List Range)
    | MissingFromElmMessageDeclaration
    | MissingToElmMessageDeclaration
    | BadDeclarations (List BadDeclarationError)


type BadDeclarationError
    = DeclarationIsValue Range
    | TypeHasVariable Range
    | DeclarationIsExstensibleRecord Range
    | FunctionType Range
    | InvalidReference Range
    | InvalidTuple Range


schemaFromElm : RawFile -> Result SchemaFromElmError Schema
schemaFromElm rawFile =
    let
        file =
            Elm.Processing.process Elm.Processing.init rawFile

        interface =
            Interface.build rawFile

        (Node moduleRange module_) =
            file.moduleDefinition

        ( moduleName, moduleNameRange ) =
            (case module_ of
                Module.NormalModule data ->
                    data.moduleName

                Module.PortModule data ->
                    data.moduleName

                Module.EffectModule data ->
                    data.moduleName
            )
                |> (\(Node range name) -> ( name, range ))

        ( exposesAll, exposesRange ) =
            case Module.exposingList (Node.value file.moduleDefinition) of
                Elm.Syntax.Exposing.All range ->
                    ( True, range )

                Elm.Syntax.Exposing.Explicit exposings ->
                    ( False, Range.combine (List.map Node.range exposings) )

        declarationNames =
            List.filterMap
                (\(Node _ declaration) ->
                    case declaration of
                        Elm.Syntax.Declaration.FunctionDeclaration func ->
                            func
                                |> .declaration
                                |> Node.value
                                |> .name
                                |> Node.value
                                |> Just

                        Elm.Syntax.Declaration.AliasDeclaration alias ->
                            Node.value alias.name
                                |> Just

                        Elm.Syntax.Declaration.CustomTypeDeclaration customType ->
                            Node.value customType.name
                                |> Just

                        _ ->
                            Nothing
                )
                file.declarations
    in
    if moduleName /= [ "Schema" ] then
        Err (NotCorrectModuleName moduleNameRange)

    else if Module.isPortModule (Node.value file.moduleDefinition) then
        let
            start =
                moduleRange.start

            end =
                Location start.row (start.column + 4)
        in
        Err (IsPortModule (Range start end))

    else if Module.isEffectModule (Node.value file.moduleDefinition) then
        let
            start =
                moduleRange.start

            end =
                Location start.row (start.column + 6)
        in
        Err (IsEffectModule (Range start end))

    else if not exposesAll then
        Err (DoesNotExposeAll exposesRange)

    else if List.length file.imports /= 0 then
        file.imports
            |> List.map Node.range
            |> ContainsImports
            |> Err

    else if List.all ((/=) "FromElmMessage") declarationNames then
        Err MissingFromElmMessageDeclaration

    else if List.all ((/=) "ToElmMessage") declarationNames then
        Err MissingToElmMessageDeclaration

    else
        let
            ( schemaDeclarations, errors ) =
                file.declarations
                    |> List.map (schemaDeclarationFromElmDeclaration interface)
                    |> Result.Extra.partition
                    |> Tuple.mapSecond List.concat
        in
        if List.length errors /= 0 then
            Err (BadDeclarations errors)

        else
            Ok { declarations = schemaDeclarations }


schemaDeclarationFromElmDeclaration :
    Interface
    -> Node Declaration
    -> Result (List BadDeclarationError) Schema.Declaration
schemaDeclarationFromElmDeclaration interface elmDeclaration =
    case Node.value elmDeclaration of
        Elm.Syntax.Declaration.AliasDeclaration { name, typeAnnotation } ->
            schemaTypeFromElmTypeAnnotation interface typeAnnotation
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
                            (schemaTypeFromElmTypeAnnotation interface)
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
            Err [ DeclarationIsValue (Node.range elmDeclaration) ]


schemaTypeFromElmTypeAnnotation :
    Interface
    -> Node TypeAnnotation
    -> Result (List BadDeclarationError) Schema.Type
schemaTypeFromElmTypeAnnotation interface (Node range typeAnnotation) =
    case typeAnnotation of
        Elm.Syntax.TypeAnnotation.GenericType _ ->
            Err [ TypeHasVariable range ]

        Elm.Syntax.TypeAnnotation.Unit ->
            Ok Schema.Unit

        Elm.Syntax.TypeAnnotation.Typed name parameters ->
            let
                (Node typeNameRange ( moduleName, typeName )) =
                    name

                parametersAsSchemaType =
                    parameters
                        |> List.map (schemaTypeFromElmTypeAnnotation interface)
                        |> Result.Extra.combine

                refersToTypeInSchema =
                    List.filterMap
                        (\exposed ->
                            case exposed of
                                Interface.CustomType ( customTypeName, _ ) ->
                                    Just customTypeName

                                Interface.Alias aliasName ->
                                    Just aliasName

                                _ ->
                                    Nothing
                        )
                        interface
                        |> List.member typeName
            in
            case
                ( typeName :: moduleName
                , refersToTypeInSchema
                , parametersAsSchemaType
                )
            of
                ( [ "Bool" ], _, Ok [] ) ->
                    Ok Schema.Bool

                ( [ "Int" ], _, Ok [] ) ->
                    Ok Schema.Int

                ( [ "Float" ], _, Ok [] ) ->
                    Ok Schema.Float

                ( [ "Char" ], _, Ok [] ) ->
                    Ok Schema.Char

                ( [ "String" ], _, Ok [] ) ->
                    Ok Schema.String

                ( [ "List" ], _, Ok [ t ] ) ->
                    Ok (Schema.List t)

                ( [ "Maybe" ], _, Ok [ t ] ) ->
                    Ok (Schema.Maybe t)

                ( [ "Result" ], _, Ok [ t1, t2 ] ) ->
                    Ok (Schema.Result t1 t2)

                ( [ ref ], True, Ok [] ) ->
                    Ok (Schema.TypeRef ref)

                ( _, False, _ ) ->
                    Err [ InvalidReference typeNameRange ]

                ( _, True, Ok _ ) ->
                    Err [ InvalidReference typeNameRange ]

                ( _, True, Err err ) ->
                    Err err

        Elm.Syntax.TypeAnnotation.Tupled typeAnnotations ->
            let
                typeParameters =
                    List.map
                        (schemaTypeFromElmTypeAnnotation interface)
                        typeAnnotations
                        |> Result.Extra.combine
            in
            case typeParameters of
                Ok [ t1, t2 ] ->
                    Ok (Schema.Tuple t1 t2)

                Ok [ t1, t2, t3 ] ->
                    Ok (Schema.Tuple3 t1 t2 t3)

                Ok _ ->
                    Err [ InvalidTuple range ]

                Err err ->
                    Err err

        Elm.Syntax.TypeAnnotation.Record recordFields ->
            recordFields
                |> List.map
                    (\(Node _ ( Node _ fieldName, fieldTypeAnnotation )) ->
                        schemaTypeFromElmTypeAnnotation
                            interface
                            fieldTypeAnnotation
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
            Err [ TypeHasVariable range ]

        Elm.Syntax.TypeAnnotation.FunctionTypeAnnotation _ _ ->
            Err [ FunctionType range ]


errorToString : Error -> String
errorToString err =
    case err of
        DecodeRequest decodeError ->
            """---Unknown Error!---
Well this is embarasing. Something has gone wrong but i don't know why.. This is probably a bug. Full error message:
{{ error }}"""
                |> namedValue "error" (Decode.errorToString decodeError)

        ParseElm deadEnds ->
            """---Parse schema error!---
Im got stuck parsing your schema. unfortunatley im not sophisticated enough to produce i nice error message, but here is my best atempt:
{{ error }}"""
                |> namedValue "error" (Parser.deadEndsToString deadEnds)

        SchemaFromElm _ (NotCorrectModuleName _) ->
            """---Error: module must be named schema!---
Your schema must be named "Schema", it is currently named something else"""

        SchemaFromElm _ (IsPortModule _) ->
            """---Error: schema is port module!---
your schema is as a port module, i will automatically generate ports for you so there is no need to place any in your scmema. The first line of your schema should be this: "module Schema expoisng (..)\""""

        SchemaFromElm _ (IsEffectModule _) ->
            """---Error: schema is effect module!---
Hey you! Stop that!"""

        SchemaFromElm _ (DoesNotExposeAll _) ->
            """---Error: module does not expose all---
Maybe this is a bit strict on my part but you should expose everyting in your schema, i.e. the first line of your schema should be "module Schema exposing(..)\""""

        SchemaFromElm _ (ContainsImports _) ->
            """---Error: contains imports---
Your module contains import. Unfortunately i can't handle this (but maybe in the future??). You will have to remove all imports."""

        SchemaFromElm _ (BadDeclarations _) ->
            """---Error: bad declarations---
You have used some declarations in your schema that i don't know how to deal with. You can't have anything that:
is a value. E.g "myValue = 1"
is a function. E.g "myFunction n = n + 1
has type variables in them. E.g type MyParametricType a = Foo a

The only types you are alowed to reference are those defined by you in your schema and thes ones: (), Bool, Int, Float, Char, String, List, Maybe and Result.
"""

        SchemaFromElm _ MissingFromElmMessageDeclaration ->
            """---Error: missing FromElmMessage---
I can't find a FromElmMessage type in your schema, maybe you misspelled it?
I always need a FromElmMessage type to be declared even if you wont use it. In that case just declare it as "type alias FromElmMessage = ()\""""

        SchemaFromElm _ MissingToElmMessageDeclaration ->
            """---Error: missing ToElmMessage---
I can't find a ToElmMessage type in your schema, maybe you misspelled it?
I always need a ToElmMessage type to be declared even if you wont use it. In that case just declare it as "type alias ToElmMessage = ()\""""


genericErrorMessage :
    { title : String
    , reason : String
    , offendingCode :
        Maybe
            { code : String
            , errorLocation : Range
            , fix : String
            }
    }
    -> String
genericErrorMessage { title, reason, offendingCode } =
    "-- "
        ++ String.padRight 30 '-' (title ++ " ")
        ++ " src/Schema.elm"
        ++ "\n\n"
        ++ reason
        ++ (case offendingCode of
                Nothing ->
                    ""

                Just { code, errorLocation, fix } ->
                    "\n\n"
                        ++ offendingCodeSnippet code errorLocation
                        ++ "\n\n"
                        ++ fix
           )


offendingCodeSnippet : String -> Range -> String
offendingCodeSnippet code range =
    let
        sr =
            range.start.row

        sc =
            range.start.column

        er =
            range.end.row

        ec =
            range.end.column

        relevantLines =
            code
                |> String.lines
                |> List.drop (sr - 1)
                |> List.take (er - sr + 1)

        errorMarkings =
            relevantLines
                |> List.indexedMap
                    (\i line ->
                        line
                            |> String.toList
                            |> List.indexedMap
                                (\j _ ->
                                    if sr == er then
                                        if j + 1 >= sc && j + 1 < ec then
                                            '^'

                                        else
                                            ' '

                                    else if i == 0 && sc <= j + 1 then
                                        '^'

                                    else if i == (er - sc) && ec >= j + 1 then
                                        '^'

                                    else if i > 0 && i <= (er - sr) then
                                        '^'

                                    else
                                        ' '
                                )
                            |> String.fromList
                            |> String.trimRight
                    )
    in
    List.map3
        (\lineNmber line errorMarking ->
            let
                foo =
                    String.length (String.fromInt er)
            in
            [ String.padRight foo ' ' (String.fromInt lineNmber) ++ "| " ++ line
            , String.repeat (foo + 2) " " ++ errorMarking
            ]
        )
        (List.indexedMap (\i _ -> i + sr) relevantLines)
        relevantLines
        errorMarkings
        |> List.concat
        |> String.join "\n"
