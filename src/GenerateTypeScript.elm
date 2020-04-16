module GenerateTypeScript exposing (generateTypeScript)

import Schema exposing (Schema)
import String.Format exposing (namedValue, value)


generateTypeScript : Schema -> String
generateTypeScript schema =
    """/*
 * Module
*/

export let Elm: {
    Main: {
        init: (flags?: any) => ElmApp
    }
}

export interface ElmApp extends Object {
    ports: {
        toElm: {
            send: (msg: ToElmMessage) => void
        },
        fromElm: {
            subscribe: (f: (msg: FromElmMessage) => void) => void
        }
    }
}

/*
 * Declarations
*/

{{ declarations }}

/*
 * Prelude
*/

export type Unit =
    { variant : "()"
    }

export type Maybe<T>
    = { variant : "Just"
      , _0 : T
      }
    | { variant : "Nothing"
      }

export type Result<E, T>
    = { variant : "Ok"
      , _0 : T
      }
    | { variant : "Err"
      , _0 : E
      }
"""
        |> namedValue
            "declarations"
            (List.map generateDeclaration schema.declarations |> String.join "\n\n")


generateDeclaration : Schema.Declaration -> String
generateDeclaration declaration =
    case declaration of
        Schema.TypeAliasDeclaration typeAliasDeclaration ->
            generateTypeAliasDeclaration typeAliasDeclaration

        Schema.CustomTypeDeclaration customTypeDeclaration ->
            generateCustomTypeDeclaration customTypeDeclaration


generateTypeAliasDeclaration : Schema.TypeAlias -> String
generateTypeAliasDeclaration { name, definition } =
    [ "export type {{ name }} ="
    , "    {{ type }}"
    ]
        |> String.join "\n"
        |> namedValue "name" name
        |> namedValue
            "type"
            (generateType False definition
                |> reJoinLines "\n    "
            )


generateCustomTypeDeclaration : Schema.CustomType -> String
generateCustomTypeDeclaration { name, constructors } =
    [ "export type {{ name }}"
    , "    = {{ constructors }}"
    ]
        |> String.join "\n"
        |> namedValue "name" name
        |> namedValue
            "constructors"
            (List.map generateCustomTypeConstructor constructors
                |> String.join "\n| "
                |> reJoinLines "\n    "
            )


generateCustomTypeConstructor : Schema.Constructor -> String
generateCustomTypeConstructor { name, arguments } =
    if List.length arguments == 0 then
        "{ variant : \"{{ variant }}\" }"
            |> namedValue "variant" name

    else
        [ "{ variant : \"{{ variant }}\""
        , ", {{ arguments }}"
        , "}"
        ]
            |> String.join "\n"
            |> namedValue "variant" name
            |> namedValue
                "arguments"
                (List.indexedMap
                    (\i argument ->
                        let
                            argumentStr =
                                generateType False argument
                        in
                        if String.contains "\n" argumentStr then
                            [ "_{{ i }} :"
                            , "    {{ argument }}"
                            ]
                                |> String.join "\n"
                                |> namedValue "i" (String.fromInt i)
                                |> namedValue
                                    "argument"
                                    (reJoinLines "\n    " argumentStr)

                        else
                            "_{{ i }} : {{ argument }}"
                                |> namedValue "i" (String.fromInt i)
                                |> namedValue "argument" argumentStr
                    )
                    arguments
                    |> String.join "\n, "
                )


generateType : Bool -> Schema.Type -> String
generateType inline type_ =
    case type_ of
        Schema.Unit ->
            "Unit"

        Schema.Bool ->
            "boolean"

        Schema.Int ->
            "number"

        Schema.Float ->
            "number"

        Schema.Char ->
            "string"

        Schema.String ->
            "string"

        Schema.List t ->
            "Array<" ++ generateType True t ++ ">"

        Schema.Tuple t1 t2 ->
            [ "[ {{ type1 }}"
            , ", {{ type2 }}"
            , "]"
            ]
                |> String.join "\n"
                |> namedValue "type1" (indent 2 (generateType inline t1))
                |> namedValue "type2" (indent 2 (generateType inline t2))

        Schema.Tuple3 t1 t2 t3 ->
            [ "[ {{ type1 }}"
            , ", {{ type2 }}"
            , ", {{ type3 }}"
            , "]"
            ]
                |> String.join "\n"
                |> namedValue "type1" (indent 2 (generateType inline t1))
                |> namedValue "type2" (indent 2 (generateType inline t2))
                |> namedValue "type3" (indent 2 (generateType inline t3))

        Schema.Record fields ->
            let
                fieldsList =
                    List.map
                        (\field ->
                            field.name
                                ++ ": "
                                ++ generateType inline field.type_
                        )
                        fields
            in
            if inline then
                "{ {{ fields }} }"
                    |> namedValue "fields" (String.join ", " fieldsList)

            else
                [ "{ {{ fields }}"
                , "}"
                ]
                    |> String.join "\n"
                    |> namedValue "fields" (reJoin "\n,  " fieldsList)

        Schema.TypeRef name ->
            name

        Schema.Maybe t ->
            "Maybe<" ++ generateType True t ++ ">"

        Schema.Result e t ->
            "Result<" ++ generateType True e ++ ", " ++ generateType True t ++ ">"


indent : Int -> String -> String
indent n s =
    String.split "\n" s
        |> String.join ("\n" ++ String.repeat n " ")


reJoinLines : String -> String -> String
reJoinLines delim str =
    String.join delim (String.split "\n" str)


reJoin : String -> List String -> String
reJoin delim strings =
    String.join delim (String.split "\n" (String.join "\n" strings))
