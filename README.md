> # :rotating_light: NOTE: This project is in early development :rotating_light:
> Lots of very breaking changes are likley to occur and im sure there's many
bugs to be discovered!

# elm-port-schema

Bring type-safety to the interface between js and elm!
Automatially generate decoders/encoders and typescript definitions from your
elm types.



## Why i made this tool

Elm is great! But not everything can be done in pure elm.
Sometimes we need to pass over into js-land and to do that we have ports.
If our elm app happends to be very port-heavy for whatever reason,
we might find ourselved spending increasing amounts of time writing json
decoders/encoders, syncing that with the js-side and debugging whenever
a typo or something small like that slipps through. Elm and typescript helps
us write code with fewer errors, lets bring them to the interface between elm and js!



## Installation
`npm install --save-dev elm-port-schema`



## How it works

__NOTE__: We will use typescript instead of javascript. Typescript is essentially javascript
with types, which is exacly what wen need.

Everything revolves around a _schema_ located at `src/Schema.elm`
and the two types that need to be in it: `FromElmMessage` and `ToElmMessage`.
if your schema looks like this:
```elm
module Schema exposing (..)

type FromElmMessage = ...

type ToElmMessage = ...
```
and you run `elm-port-schema` it will generate two files.<br/><br/>

1. `src/Port.elm`.
You can import this module from the rest of your elm to send and recive messages.
It looks a bit like this:
```elm
port module Port exposing (..)

type FromElmMessage = ...

type ToElmMessage = ...

send : FromElmMessage -> Cmd msg
send = ...

recive : (Result Json.Decode.Error ToElmMessage -> msg) -> Sub msg
recive = ...

...
```
<br/>

2. `src/Main.d.ts`.
This file makes typescript aware of what data can be sent to and from elm.<br/>
It look a little like this:
```typescript
export let Elm: { Main: { init: (flags?: any) => ElmApp } }

export interface ElmApp {
    ports: {
        toElm: { send: (msg: ToElmMessage) => void },
        fromElm: { subscribe: (f: (msg: FromElmMessage) => void) => void },
    }
}

...
```
<br/>

Whenever you want to change how data is passed between elm and typescript,
just update `Schema.elm`, run `elm-port-schema` and fix all compiler errors
in your elm and typescript. Piece of cake!

### How elm and typescript maps to eachother
* `Bool` <=> `bool`
* `Int`, `Float` <=> `number`
* `Char`, `String` <=> `string`
* `List` <=> `Array`
* `( Int, String )` <=> `[ number, string ]`
* `{ foo : Int, bar : String }` <=> `{ foo: number, bar: string }`
* `type Foo = Bar Int String` <=> `{ variant: "bar", _0: number, _1: string }`

`Maybe` and `Result` values map to typescript just the same as any other
custom type would,<br/> i.e `Nothing` maps to `{ variant: "Nothing" }`, not `null`!



## Example
https://github.com/hugobastas/elm-port-schema-starter has the boilerplate needed
to get up and runing with `elm-port-schema`.



## Important notes / Words of caution
Before using this tool, know that it __WILL__ add complexity to your project.
compared to plain js and elm you will need `typescript`, a bundler like `webpack`
with a `typescript` and `elm` loader. If you're only goin to spend a couple hours
interfacing js and elm this additional complexity might not be worth it.
[This comic](https://www.xkcd.com/974/) commes to mind.


Also note that `elm-port-schema` is __NOT__ intended for data interchange
between client and server. Thats a a different problem and something like
[elm-graphql](https://github.com/dillonkearns/elm-graphql/) would be more appropriate
to solve it.<br/>
Also read this [vission for data interchange in elm](https://gist.github.com/evancz/1c5f2cf34939336ecb79b97bb89d9da6). I found it to be very enlightening!



## License
MIT
