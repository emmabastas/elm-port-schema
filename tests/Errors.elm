module Errors exposing (..)

import Elm.Parser
import Elm.Syntax.Range exposing (Location, Range)
import Expect
import Fuzz
import Main
import Schema exposing (Schema)
import Test exposing (Test, fuzz, test)


parseSchema : String -> Result Main.Error Schema
parseSchema s =
    s
        |> Elm.Parser.parse
        |> Result.mapError Main.ParseElm
        |> Result.andThen
            (Result.mapError (Main.SchemaFromElm s) << Main.schemaFromElm)


garbeled : Test
garbeled =
    fuzz Fuzz.string "Should not accept invalid elm" <|
        \s ->
            case parseSchema s of
                Err (Main.ParseElm _) ->
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
                input =
                    """module Foo exposing (..)
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""

                expectedOutput =
                    (Err << Main.SchemaFromElm input << Main.NotCorrectModuleName)
                        (Range (Location 1 8) (Location 1 11))
            in
            Expect.equal (parseSchema input) expectedOutput


portModule : Test
portModule =
    test "Should not accept a port module" <|
        \_ ->
            let
                input =
                    """port module Schema exposing (..)
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""

                expectedOutput =
                    (Err << Main.SchemaFromElm input << Main.IsPortModule)
                        (Range (Location 1 1) (Location 1 5))
            in
            Expect.equal (parseSchema input) expectedOutput


effectModule : Test
effectModule =
    test "Should not accept an effect module" <|
        \_ ->
            let
                input =
                    """effect module Schema where { command = Foo } exposing (..)
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""

                expectedOutput =
                    (Err << Main.SchemaFromElm input << Main.IsEffectModule)
                        (Range (Location 1 1) (Location 1 7))
            in
            Expect.equal (parseSchema input) expectedOutput


doesNotExposeAll : Test
doesNotExposeAll =
    test "Should not accept a module that does not expose all" <|
        \_ ->
            let
                input =
                    """module Schema exposing (FromElmMessage, ToElmMessage)
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""

                expectedOutput =
                    (Err << Main.SchemaFromElm input << Main.DoesNotExposeAll)
                        (Range (Location 1 25) (Location 1 53))
            in
            Expect.equal (parseSchema input) expectedOutput


containsImports : Test
containsImports =
    test "Should not accept a module with imports" <|
        \_ ->
            let
                input =
                    """module Schema exposing (..)
import Dict
import Set
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""

                expectedOutput =
                    (Err << Main.SchemaFromElm input << Main.ContainsImports)
                        [ Range (Location 2 1) (Location 2 12)
                        , Range (Location 3 1) (Location 3 11)
                        ]
            in
            Expect.equal (parseSchema input) expectedOutput


missingFromElm : Test
missingFromElm =
    test "FromElmMessage type must exist" <|
        \_ ->
            let
                input =
                    """module Schema exposing (..)
type alias ToElmMessage = ()"""

                expectedOutput =
                    Err (Main.SchemaFromElm input Main.MissingFromElmMessageDeclaration)
            in
            Expect.equal (parseSchema input) expectedOutput


missingToElm : Test
missingToElm =
    test "ToElmMessage type must exist" <|
        \_ ->
            let
                input =
                    """module Schema exposing (..)
type alias FromElmMessage = ()"""

                expectedOutput =
                    Err (Main.SchemaFromElm input Main.MissingToElmMessageDeclaration)
            in
            Expect.equal (parseSchema input) expectedOutput


withFunctionType : Test
withFunctionType =
    test "No function types should be allowed" <|
        \_ ->
            let
                input =
                    """module Schema exposing (..)
type alias Foo = Int -> String
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""

                expectedOutput =
                    (Err << Main.SchemaFromElm input << Main.BadDeclarations)
                        [ Main.FunctionType
                            (Range
                                (Location 2 18)
                                (Location 2 31)
                            )
                        ]
            in
            Expect.equal (parseSchema input) expectedOutput


withTypeVariables : Test
withTypeVariables =
    test "No type variables should be allowed" <|
        \_ ->
            let
                input =
                    """module Schema exposing (..)
type alias Foo a = { foo : a }
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""

                expectedOutput =
                    (Err << Main.SchemaFromElm input << Main.BadDeclarations)
                        [ Main.TypeHasVariable
                            (Range (Location 2 16) (Location 2 17))
                        ]
            in
            Expect.equal (parseSchema input) expectedOutput


onlyTypes : Test
onlyTypes =
    test "Only type declaration should be allowed" <|
        \_ ->
            let
                input =
                    """module Schema exposing (..)
foo = 1
bar a = a
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""

                expectedOutput =
                    (Err << Main.SchemaFromElm input << Main.BadDeclarations)
                        [ Main.DeclarationIsValue
                            (Range (Location 2 1) (Location 2 8))
                        , Main.DeclarationIsValue
                            (Range (Location 3 1) (Location 3 10))
                        ]
            in
            Expect.equal (parseSchema input) expectedOutput


invalidReference : Test
invalidReference =
    test "References to types that don't exist shouldn't be allowed" <|
        \_ ->
            let
                input =
                    """module Schema exposing (..)
type alias Foo = Bar
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""

                expectedOutput =
                    (Err << Main.SchemaFromElm input << Main.BadDeclarations)
                        [ Main.InvalidReference
                            (Range (Location 2 18) (Location 2 21))
                        ]
            in
            Expect.equal (parseSchema input) expectedOutput
