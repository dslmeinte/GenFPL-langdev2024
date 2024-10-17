import {builtinClassifiers, Concept, DynamicNode} from "@lionweb/core"
import {nanoid} from "nanoid"

import {equal, throws} from "./assertions.js"

import {symbolTable} from "../lang/languages.js"
import {interpreter} from "../lang/interpreter.js"


const makeDynamicNode = (conceptName: string, settings: Record<string, unknown>): DynamicNode => ({
    id: nanoid(),
    classifier: symbolTable.entityMatching({ language: "sub-fpl", version: "0", key: `sub-fpl-${conceptName}`}) as Concept,
    settings,
    annotations: []
})


describe("interpreter", () => {

    it("fails for something unknown", () => {
        throws(() => {
            interpreter.interpret(
                {
                    id: "foo",
                    classifier: builtinClassifiers.node,
                    settings: {},
                    annotations: []
                }
            )
        }, "don't know how to interpret an instance of Node")
    })

    it("works for a boolean literal", () => {
        const result = interpreter.interpret(makeDynamicNode("BooleanLiteral", {
            value: true
        }))
        equal(result, true)
    })

    it("works for boolean negation", () => {
        const result = interpreter.interpret(makeDynamicNode("BooleanNegation", {
            operand: makeDynamicNode("BooleanLiteral", {
                value: true
            })
        }))
        equal(result, false)
    })

    it("works for boolean and", () => {
        const result = interpreter.interpret(makeDynamicNode("BooleanBinaryOperation", {
            operator: "and",
            left: makeDynamicNode("BooleanLiteral", { value: true }),
            right: makeDynamicNode("BooleanLiteral", { value: false })
        }))
        equal(result, false)
    })

    it("works for boolean or", () => {
        const result = interpreter.interpret(makeDynamicNode("BooleanBinaryOperation", {
            operator: "or",
            left: makeDynamicNode("BooleanLiteral", { value: true }),
            right: makeDynamicNode("BooleanLiteral", { value: false })
        }))
        equal(result, true)
    })

})

