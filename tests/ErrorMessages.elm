module ErrorMessages exposing (..)

import Elm.Parser
import Elm.Syntax.Range exposing (Location, Range)
import Expect
import Main
import Schema exposing (Schema)
import Test exposing (Test, test)


parseSchema : String -> Result Main.Error Schema
parseSchema s =
    s
        |> Elm.Parser.parse
        |> Result.mapError Main.ParseElm
        |> Result.andThen
            (Result.mapError (Main.SchemaFromElm s) << Main.schemaFromElm)


parseElm : Test
parseElm =
    test "ParseElm" <|
        \_ ->
            let
                input =
                    "foo"

                expectedOutput =
                    Err """-- Syntax error ----------------- src/Schema.elm

I think there's a syntax error in your schema. Try and run `elm make src/Schema.elm`. That might be able to tell you what the problem is."""
            in
            input
                |> parseSchema
                |> Result.mapError Main.makeErrorMessage
                |> Expect.equal expectedOutput


notCorrectModuleName : Test
notCorrectModuleName =
    test "NotCorrectModuleName" <|
        \_ ->
            let
                input =
                    """module Foo exposing (..)
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""

                expectedOutput =
                    Err """-- Invalid module name ---------- src/Schema.elm

A schema module must be named `Schema`.

1| module Foo exposing (..)
          ^^^

Rename the module to `Schema`."""
            in
            input
                |> parseSchema
                |> Result.mapError Main.makeErrorMessage
                |> Expect.equal expectedOutput


isPortModule : Test
isPortModule =
    test "IsPortModule" <|
        \_ ->
            let
                input =
                    """port module Schema exposing (..)
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""

                expectedOutput =
                    Err """-- Schema is a port module ------ src/Schema.elm

Your schema is declared as a port module.

1| port module Schema exposing (..)
   ^^^^

elm-port-schema will generate ports for you in src/Port.elm. There is no need to define your own here. Remove the `port` part from your module declaration."""
            in
            input
                |> parseSchema
                |> Result.mapError Main.makeErrorMessage
                |> Expect.equal expectedOutput


isEffectModule : Test
isEffectModule =
    test "IsEffectModule" <|
        \_ ->
            let
                input =
                    """effect module Schema where { command = Foo } exposing (..)
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""

                expectedOutput =
                    Err """-- Schema is effect module ------ src/Schema.elm

Hey, you! Stop that!"""
            in
            input
                |> parseSchema
                |> Result.mapError Main.makeErrorMessage
                |> Expect.equal expectedOutput


doesNotExposeAll : Test
doesNotExposeAll =
    test "DoesNotExposeAll" <|
        \_ ->
            let
                input =
                    """module Schema exposing (FromElmMessage, ToElmMessage)
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""

                expectedOutput =
                    Err """-- Schema does not expose all --- src/Schema.elm

Your schema needs to expose everything using `(..)`.

1| module Schema exposing (FromElmMessage, ToElmMessage)
                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Replace the exposing statement with `(..)`."""
            in
            input
                |> parseSchema
                |> Result.mapError Main.makeErrorMessage
                |> Expect.equal expectedOutput


containsImports : Test
containsImports =
    test "ContainsImports" <|
        \_ ->
            let
                input =
                    """module Schema exposing (..)
import Dict
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""

                expectedOutput =
                    Err """-- Schema has imports ----------- src/Schema.elm

Your schema imports things. That is not allowed!

2| import Dict
   ^^^^^^^^^^^

I can't deal with imports. It is better if all the types that can pass through ports live in the schema.

If there are types in another module in your project that you want to use here you could move them into the schema insted, and the import them from src/Port.elm

If you want to use types from another package then you're out of luck :/. You could try to copy the types into the schema insted."""
            in
            input
                |> parseSchema
                |> Result.mapError Main.makeErrorMessage
                |> Expect.equal expectedOutput


missingFromElmFromDeclaration : Test
missingFromElmFromDeclaration =
    test "MissingFromElmMessageDeclaration" <|
        \_ ->
            let
                input =
                    """module Schema exposing (..)
type alias ToElmMessage = ()"""

                expectedOutput =
                    Err """-- Missing FromElmMessage ------- src/Schema.elm

I can't find a FromElmMessage type in your schema, maybe you misspelled it? I always need a FromElmMessage type to be declared even if you wont use it. In that case just declare it as `type alias FromElmMessage = ()`"""
            in
            input
                |> parseSchema
                |> Result.mapError Main.makeErrorMessage
                |> Expect.equal expectedOutput


missingToElmMessageDeclaration : Test
missingToElmMessageDeclaration =
    test "MissingToElmMessageDeclaration" <|
        \_ ->
            let
                input =
                    """module Schema exposing (..)
type alias FromElmMessage = ()"""

                expectedOutput =
                    Err """-- Missing ToElmMessage --------- src/Schema.elm

I can't find a ToElmMessage type in your schema, maybe you misspelled it? I always need a ToElmMessage type to be declared even if you wont use it. In that case just declare it as `type alias ToElmMessage = ()`"""
            in
            input
                |> parseSchema
                |> Result.mapError Main.makeErrorMessage
                |> Expect.equal expectedOutput


badDeclarations : Test
badDeclarations =
    test "BadDeclarations" <|
        \_ ->
            let
                input =
                    """module Schema exposing (..)
value = 1
function a = a
type alias WithTypeVariable a = Maybe a
type alias ExstensibleRecord a = { a | foo : a }
type alias FunctionType = Int -> Int
type alias InvalidReference = Foo
type alias InvalidTuple = (Int, Int, Int, Int)
type alias FromElmMessage = ()
type alias ToElmMessage = ()"""

                expectedOutput =
                    Err """-- Declaration is a value/function  src/Schema.elm

Only type aliases and custom types are allowed in a schema.

2| value = 1
   ^^^^^^^^^

Remove this declaration.


-- Declaration is a value/function  src/Schema.elm

Only type aliases and custom types are allowed in a schema.

3| function a = a
   ^^^^^^^^^^^^^^

Remove this declaration.


-- Type has a type variable ----- src/Schema.elm

Types with type variables can't be declared in a schema.

4| type alias WithTypeVariable a = Maybe a
                               ^

I wouldn't know how to create encoders and decoders for a type with type variables. Replace the this type with something without type variables.


-- Type is an exstensible record  src/Schema.elm

Exstensible records can't be declared in a schema.

5| type alias ExstensibleRecord a = { a | foo : a }
                                    ^^^^^^^^^^^^^^^

I wouldn't know how to create encoders and decoders for an exstensible record. Replace this type with a normal record.


-- Type contains function ------- src/Schema.elm

Types on the form `(a -> b)` can't be declared in a schema.

6| type alias FunctionType = Int -> Int
                             ^^^^^^^^^^

I wouldn't know how to create encoders and decoders for a function. To convert an elm function to a javascript one is simply not a good idea. You'll have to do it another way.


-- Invalid reference ------------ src/Schema.elm

You are trying to reference a type that i can't find.

7| type alias InvalidReference = Foo
                                 ^^^

Make sure there are no typos. Running `elm make src/Schema.elm` might give usefull help.


-- Bad tuple -------------------- src/Schema.elm

I only accept tuples with two or three items. This has to many:

8| type alias InvalidTuple = (Int, Int, Int, Int)
                             ^^^^^^^^^^^^^^^^^^^^

I recommend switching to records. Each item will be named, and you can use `pont.x` syntax to access them.

Note: Read <https://github.com/elm/compiler/blob/master/hints/tuples.md> for more comprehensive advice on working with large chunkds of data in Elm."""
            in
            input
                |> parseSchema
                |> Result.mapError Main.makeErrorMessage
                |> Expect.equal expectedOutput


offendingCodeSnippetSingleLine : Test
offendingCodeSnippetSingleLine =
    test "offendingCodeSnippet marks correct parts of code for a single line" <|
        \_ ->
            let
                code =
                    """module Schema exposing (..)

type alias IllegalType = { foo : Int -> Int, bar : Int }

type alias LegalType = ()"""

                range =
                    Range (Location 3 34) (Location 3 44)

                expectedOutput =
                    [ "3| type alias IllegalType = { foo : Int -> Int, bar : Int }"
                    , "                                    ^^^^^^^^^^"
                    ]
                        |> String.join "\n"
            in
            Expect.equal
                expectedOutput
                (Main.offendingCodeSnippet code range)


offendingCodeSnippetMultiLine : Test
offendingCodeSnippetMultiLine =
    test "offendingCodeSnippet marks correct pars of code over multiple lines" <|
        \_ ->
            let
                code =
                    """module Schema exposing
    ( foo
    , bar
    )

type alias Baz = ()"""

                range =
                    Range (Location 2 5) (Location 4 6)

                expectedOutput =
                    [ "2|     ( foo"
                    , "       ^^^^^"
                    , "3|     , bar"
                    , "   ^^^^^^^^^"
                    , "4|     )"
                    , "   ^^^^^"
                    ]
                        |> String.join "\n"
            in
            Expect.equal
                expectedOutput
                (Main.offendingCodeSnippet code range)
