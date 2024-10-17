import {deserializeLanguages, MemoisingSymbolTable, SerializationChunk} from "@lionweb/core"

import languagesJson from "./combined-languages.json" with { type: "json" }


export const languages = deserializeLanguages(languagesJson as unknown as SerializationChunk)

export const symbolTable = new MemoisingSymbolTable(languages)

