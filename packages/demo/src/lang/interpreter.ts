import {DynamicNode, ExtractionFacade} from "@lionweb/core"
import {SubLanguageDefaultInterpreter} from "../gen/interpreter.default.js"


export const dynamicExtractionFacade: ExtractionFacade<DynamicNode> = ({
    classifierOf: (node) => node.classifier,
    getFeatureValue: (node, feature) =>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
        (node.settings as any)[feature.name],
    enumerationLiteralFrom: (value, enumeration) =>
        enumeration.literals.find(({name}) => name === value)
        ?? null,    // (undefined -> null)
})


class SubLanguageInterpreter extends SubLanguageDefaultInterpreter<DynamicNode> {}

export const interpreter = new SubLanguageInterpreter(dynamicExtractionFacade)

