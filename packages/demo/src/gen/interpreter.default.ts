import {
    allFeaturesOf,
    Classifier,
    Concept,
    Enumeration,
    ExtractionFacade,
    Feature,
    Node,
    Property
} from "@lionweb/core";


export abstract class SubLanguageDefaultInterpreter<NT extends Node> {

    constructor(private readonly extractionFacade: ExtractionFacade<NT>) {}

    private lookupFeature(classifier: Classifier, featureKey: string): Feature {
        return allFeaturesOf(classifier).find((feature) => feature.key === featureKey)!;
    }

    private valueOfFeature(node: NT, classifier: Classifier, featureKey: string) {
        return this.extractionFacade.getFeatureValue(node, this.lookupFeature(classifier, featureKey));
    }

    protected interpretBooleanValue(expression: NT) {
        const classifier = this.extractionFacade.classifierOf(expression);
        switch (classifier.key) {
            case "sub-fpl-BooleanLiteral": return this.valueOfFeature(expression, classifier, "sub-fpl-BooleanLiteral-value");
            case "sub-fpl-BooleanBinaryOperation": {
                const operatorFeature = this.lookupFeature(classifier, "sub-fpl-BooleanBinaryOperation-operator") as Property;
                const operator = this.extractionFacade.enumerationLiteralFrom(this.extractionFacade.getFeatureValue(expression, operatorFeature), operatorFeature.type! as Enumeration);
                const left = this.valueOfFeature(expression, classifier, "sub-fpl-BooleanBinaryOperation-left");
                const evalLeft = this.interpret(left as NT);
                const right = this.valueOfFeature(expression, classifier, "sub-fpl-BooleanBinaryOperation-right");
                const evalRight = this.interpret(right as NT);
                switch (operator!.key) {
                    case "sub-fpl-BooleanBinaryOperators-and": return evalLeft && evalRight;
                    case "sub-fpl-BooleanBinaryOperators-or": return evalLeft || evalRight;
                    default:
                        throw new Error(`don't know how to handle binary operator "${operator!.key}"`);
                }
            }
            case "sub-fpl-BooleanNegation": {
                const operand = this.valueOfFeature(expression, classifier, "sub-fpl-BooleanNegation-operand");
                const evalOperand = this.interpret(operand as NT);
                return !evalOperand;
            }
            default:
                throw new Error(`don't know how to interpret an instance of ${classifier.name}`);
        }
    }

    protected interpretDotExpression(expression: NT) {
        const classifier = this.extractionFacade.classifierOf(expression);
        const left = this.valueOfFeature(expression, classifier, "sub-fpl-DotExpression-left") as NT;
        if (this.extractionFacade.classifierOf(left).key !== "sub-fpl-RecordInstance") {
            throw new Error(`left-hand side of . expression is not a RecordInstance`);
        }
        const right = this.valueOfFeature(expression, classifier, "sub-fpl-DotExpression-right") as NT;
        if (this.extractionFacade.classifierOf(right).key !== "HostLanguage-Attribute") {
            throw new Error(`right-hand side of . expression is not (a reference to) an Attribute`);
        }
        throw new Error(`fail - gave up here...`);
    }

    interpret(expression: NT): unknown {
        const classifier = this.extractionFacade.classifierOf(expression);
        if ((classifier as Concept).extends?.key === "sub-fpl-BooleanValue") {
            return this.interpretBooleanValue(expression);
        }
        throw new Error(`don't know how to interpret an instance of ${classifier.name}`);
    }

}

