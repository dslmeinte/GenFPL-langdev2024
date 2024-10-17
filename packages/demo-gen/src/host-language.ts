import {builtinClassifiers, Concept, Containment, Interface, Language, Reference} from "@lionweb/core"


export const hostLanguage = new Language("HostLanguage", "1", "host-lang", "host-lang")

export const Value = new Interface(hostLanguage, "Value", "Value", "Value")
export const Type = new Interface(hostLanguage, "Type", "Type", "Type")

export const Attribute = new Concept(hostLanguage, "Attribute", "host-lang-Attribute", "host-lang-Attribute", false)
Attribute.implementing(builtinClassifiers.inamed)
const Attribute_type = new Reference(Attribute, "type", "host-lang-Attribute-type", "host-lang-Attribute-type").ofType(Type)
Attribute.havingFeatures(Attribute_type)

export const RecordDefinition = new Concept(hostLanguage, "RecordDefinition", "host-lang-RecordDefinition", "host-lang-RecordDefinition", false)
RecordDefinition.implementing(builtinClassifiers.inamed)
const Record_attributes = new Containment(RecordDefinition, "attributes", "host-lang-RecordDefinition-attributes", "host-lang-RecordDefinition-attributes").ofType(Attribute).isMultiple()
RecordDefinition.havingFeatures(Record_attributes)

hostLanguage.havingEntities(Value, Type, Attribute, RecordDefinition)

