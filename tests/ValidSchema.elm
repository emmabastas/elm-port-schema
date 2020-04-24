module ValidSchema exposing (..)

import Elm.Parser
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


builtinTypes : Test
builtinTypes =
    test "Some types should be allowed even though they are not defined in the schema" <|
        \_ ->
            let
                input =
                    """module Schema exposing (..)
type alias Unit = ()
type alias Bool_ = Bool
type alias Int_ = Int
type alias Float_ = Float
type alias Char_ = Char
type alias String_ = String
type alias List_ = List ()
type alias Maybe_ = Maybe ()
type alias Result_ = Result () ()

type alias FromElmMessage = ()
type alias ToElmMessage = ()"""
            in
            case parseSchema input of
                Ok _ ->
                    Expect.pass

                Err err ->
                    Expect.fail
                        ("Should pass. Got this instead:\n"
                            ++ Debug.toString err
                        )


validReferences : Test
validReferences =
    test "A reference to another type defined in the schema should be allowed" <|
        \_ ->
            let
                input =
                    """module Schema exposing (..)
type alias Foo = ()
type alias Bar = Foo

type alias FromElmMessage = ()
type alias ToElmMessage = ()"""
            in
            case parseSchema input of
                Ok _ ->
                    Expect.pass

                Err err ->
                    Expect.fail
                        ("Should pass. Got this instead:\n"
                            ++ Debug.toString err
                        )
