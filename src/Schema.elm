module Schema exposing
    ( Constructor
    , CustomType
    , Declaration(..)
    , Schema
    , Type(..)
    , TypeAlias
    , declarationName
    )


type alias Schema =
    { declarations : List Declaration
    }


type Declaration
    = TypeAliasDeclaration TypeAlias
    | CustomTypeDeclaration CustomType


type alias TypeAlias =
    { name : String
    , definition : Type
    }


type alias CustomType =
    { name : String
    , constructors : List Constructor
    }


type alias Constructor =
    { name : String
    , arguments : List Type
    }


type Type
    = Unit
    | Bool
    | Int
    | Float
    | Char
    | String
    | List Type
    | Tuple Type Type
    | Tuple3 Type Type Type
    | Record (List { name : String, type_ : Type })
    | TypeRef String
    | Maybe Type
    | Result Type Type


declarationName : Declaration -> String
declarationName declaration =
    case declaration of
        TypeAliasDeclaration { name } ->
            name

        CustomTypeDeclaration { name } ->
            name
