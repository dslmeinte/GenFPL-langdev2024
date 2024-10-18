import {builtinClassifiers, concatenator, LanguageFactory} from "@lionweb/core"

export const factory = new LanguageFactory("HostLanguage", "1", concatenator("-"), concatenator("-"))
export const hostLanguage = factory.language

export const Value = factory.interface("Value")
export const Type = factory.interface("Type")

export const Attribute = factory.concept("Attribute", false)
    .implementing(builtinClassifiers.inamed)
const Attribute_type = factory.reference(Attribute, "type")
    .ofType(Type)
Attribute.havingFeatures(Attribute_type)

export const RecordDefinition = factory.concept("RecordDefinition", false)
    .implementing(builtinClassifiers.inamed)
const Record_attributes = factory.containment(RecordDefinition, "attributes")
    .ofType(Attribute).isMultiple()
RecordDefinition.havingFeatures(Record_attributes)

hostLanguage.havingEntities(Value, Type, Attribute, RecordDefinition)

