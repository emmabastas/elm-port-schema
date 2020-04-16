import * as fs from "fs"
import * as path from "path"
const { Elm } = require("./Main.elm")

const schemaPath = path.resolve(process.cwd(), "./src/Schema.elm")
const generatedElmPath = path.resolve(process.cwd(), "./src/Port.elm")
const generatedElmModuleName = "Port"
const generatedTsPath = path.resolve(process.cwd(), "./src/Main.d.ts")

let schemaContents
try {
    schemaContents = fs.readFileSync(schemaPath, 'utf8')
} catch (e) {
    console.log(`There was a problem opening the schema located at ${schemaPath}. Error:`)
    console.log(e.message)
    process.exit(1)
}

let elm = Elm.Main.init({
    flags: { 
        schemaContents,
        elmModule: generatedElmModuleName,
    }
})

elm.ports.done.subscribe(function(response: any) {
    if (response.status == 'error') {
        console.log(response.message)
        process.exit(1)
    }

    try {
        fs.writeFileSync(generatedElmPath, response.generatedElm)
    } catch (err) {
        console.log('Error generating elm at "' + generatedElmPath + '". Error message:')
        console.log(err.message)
        process.exit(1)
    }

    try {
        fs.writeFileSync(generatedTsPath, response.generatedTypescript)
    } catch (err) {
        console.log('Error generating typescript at "' + generatedTsPath + '". Error message:')
        console.log(err.message)
        process.exit(1)
    }

    console.log(
      "successfully generated " + generatedElmPath + "\n" +
      "and                    " + generatedTsPath
    )
})
