import {GenFPLConfiguration} from "genfpl"

import {Attribute, RecordDefinition, Type, Value} from "./host-language.js"


export const subFPLConfiguration: GenFPLConfiguration = {

    subLanguageIdentification: {
        name: "SubLanguage",
        version: "0",
        key: "sub-fpl",
        id: "sub-fpl"
    },

    valueClassifier: Value,
    typeClassifier: Type,

    booleanArea: true,

    recordArea: {
        definition: {
            recordConcept: RecordDefinition,
            attributeConcept: Attribute
        },
        recordLiteralName: "RecordInstance",
        attributeValueName: "AttributeValue"
    },

    comments: true
}

