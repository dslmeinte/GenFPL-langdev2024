import {serializeLanguages} from "@lionweb/core"
import {generatePlantUmlForLanguage, languageAsText, languagesAsText, writeJsonAsFile} from "@lionweb/utilities"
import {writeFileSync} from "fs"
import {join} from "path"

import {hostLanguage} from "./host-language.js"
import {generateFPL} from "genfpl"
import {subFPLConfiguration} from "./configuration.js";


const pathJoiner = (initialPath: string) =>
    (finalPath: string) =>
        join(initialPath, finalPath)


const artifact = pathJoiner("artifacts")


// 1. Save the host language's definition as LionWeb JSON, textualized, and as PlantUML diagram:

writeJsonAsFile(artifact("host-language.json"), serializeLanguages(hostLanguage))
writeFileSync(artifact("host-language.txt"), languageAsText(hostLanguage))
writeFileSync(artifact("host-language.puml"), generatePlantUmlForLanguage(hostLanguage))


// 2. Generate:

const {metamodel: subLanguage, defaultInterpreter} = generateFPL(subFPLConfiguration)

// 3a. Persist generated sub language's definition as LionWeb JSON, textualized, and as PlantUML diagram:

writeJsonAsFile(artifact("sub-fpl.json"), serializeLanguages(subLanguage))
writeFileSync(artifact("sub-fpl.txt"), languageAsText(subLanguage))
writeFileSync(artifact("sub-fpl.puml"), generatePlantUmlForLanguage(subLanguage))

// 3b. Combine host and sub language, and persist those as LionWeb JSON, and textualized:

const languages = [hostLanguage, subLanguage]
writeJsonAsFile(artifact("combined-languages.json"), serializeLanguages(...languages))
writeFileSync(artifact("combined-languages.txt"), languagesAsText(languages))


// 4. Save the generated source of the interpreter scaffold to disk:

const generated = pathJoiner("../demo/src/gen")

writeFileSync(generated("interpreter.default.ts"), defaultInterpreter)

