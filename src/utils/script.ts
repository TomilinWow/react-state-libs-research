import * as ts from "typescript";

export function countFunctionsAndOperators() {
    let path = ''
    const sourceFile = ts.createSourceFile(path, `код`, ts.ScriptTarget.Latest, true);
    let functionCount = 0;
    let operatorCount = 0;

    function visitNode(node: ts.Node) {
        if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) || ts.isArrowFunction(node)) {
            functionCount++;
        } else if (ts.isBinaryExpression(node)
            || ts.isConditionalExpression(node)
            || ts.isPrefixUnaryExpression(node)
            || ts.isPostfixUnaryExpression(node)
            || ts.isAsExpression(node)
            || ts.isTypeAssertion(node)
            || ts.isNonNullExpression(node)
            || ts.isTypeOfExpression(node)
            || ts.isNewExpression(node)
            || ts.isYieldExpression(node)
            || ts.isSpreadElement(node)
            || ts.isSpreadAssignment(node)
            || ts.isVoidExpression(node)
            || ts.isDeleteExpression(node)
            || ts.isAwaitExpression(node)) {
            operatorCount++;
        }
        ts.forEachChild(node, visitNode);
    }

    visitNode(sourceFile);

    console.log(`Function count: ${functionCount}`);
    console.log(`Operator count: ${operatorCount}`);
}

