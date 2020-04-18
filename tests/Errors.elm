module Errors exposing (..)

import Expect
import Fuzz
import Main
import Schema exposing (Schema)
import Test exposing (Test, fuzz, test)


parseSchema : String -> Result Main.Error Schema
parseSchema s =
    s
        |> Main.parseElm
        |> Result.andThen Main.schemaFromElm


garbeled : Test
garbeled =
    fuzz Fuzz.string "Should not accept invalid elm" <|
        \s ->
            case parseSchema s of
                Err (Main.ParseSchemaError _) ->
                    Expect.pass

                x ->
                    Expect.fail
                        ("Should be parse error. Is:\n"
                            ++ Debug.toString x
                        )


badModuleName : Test
badModuleName =
    test "Should not accept a module name that is not Schema" <|
        \_ ->
            let
                fooModule =
                    """module Foo exposing (..)
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""
            in
            case parseSchema fooModule of
                Err (Main.ParseSchemaError _) ->
                    Expect.pass

                x ->
                    Expect.fail
                        ("Should be parse error. Is:\n"
                            ++ Debug.toString x
                        )


portModule : Test
portModule =
    test "Should not accept a port module" <|
        \_ ->
            """port module Schema exposing (..)
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""
                |> parseSchema
                |> Expect.equal (Err Main.IsPortModule)


effectModule : Test
effectModule =
    test "Should not accept an effect module" <|
        \_ ->
            """effect module Schema where { command = Foo } exposing (..)
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""
                |> parseSchema
                |> Expect.equal (Err Main.IsEffectModule)


doesNotExposeAll : Test
doesNotExposeAll =
    test "Should not accept a module that does not expose all" <|
        \_ ->
            """module Schema exposing (FromElmMessage, ToElmMessage)
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""
                |> parseSchema
                |> Expect.equal (Err Main.DoesNotExposeAll)


containsImports : Test
containsImports =
    test "Should not accept a module with imports" <|
        \_ ->
            """module Schema exposing (..)
import Dict
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""
                |> parseSchema
                |> Expect.equal (Err Main.ContainsImports)


missingFromElm : Test
missingFromElm =
    test "FromElmMessage type must exist" <|
        \_ ->
            """module Schema exposing (..)
type alias ToElmMessage = ()"""
                |> parseSchema
                |> Expect.equal (Err Main.MissingFromElmMessageDeclaration)


missingToElm : Test
missingToElm =
    test "ToElmMessage type must exist" <|
        \_ ->
            """module Schema exposing (..)
type alias FromElmMessage = ()"""
                |> parseSchema
                |> Expect.equal (Err Main.MissingToElmMessageDeclaration)


withFunctionType : Test
withFunctionType =
    test "No function types should be allowed" <|
        \_ ->
            """module Schema exposing (..)
type alias Foo = Int -> String
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""
                |> parseSchema
                |> Expect.equal
                    (Err (Main.ContainsBadDeclarations [ Main.ContainsFunction ]))


withTypeVariables : Test
withTypeVariables =
    test "No type variables should be allowed" <|
        \_ ->
            """module Schema exposing (..)
type alias Foo a = Maybe a
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""
                |> parseSchema
                |> Expect.equal
                    (Err (Main.ContainsBadDeclarations [ Main.IsParametric ]))


onlyTypes : Test
onlyTypes =
    test "Only type declaration should be allowed" <|
        \_ ->
            """module Schema exposing (..)
foo = 1
bar a = a
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""
                |> parseSchema
                |> Expect.equal
                    (Err
                        (Main.ContainsBadDeclarations
                            [ Main.IsValue
                            , Main.IsValue
                            ]
                        )
                    )


invalidReference : Test
invalidReference =
    test "References to types that don't exist shouldn't be allowed" <|
        \_ ->
            """module Schema exposing (..)
type alias Foo = Bar
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""
                |> parseSchema
                |> Expect.equal
                    (Err
                        (Main.ContainsBadDeclarations
                            [ Main.ContainsInvalidReference ]
                        )
                    )
