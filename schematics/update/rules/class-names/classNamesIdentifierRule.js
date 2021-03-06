"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const tslint_1 = require("tslint");
const ts = require("typescript");
const class_names_1 = require("../../material/data/class-names");
const typescript_specifiers_1 = require("../../material/typescript-specifiers");
const imports_1 = require("../../typescript/imports");
/**
 * Rule that walks through every identifier that is part of Angular Material and replaces the
 * outdated name with the new one.
 */
class Rule extends tslint_1.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
    }
}
exports.Rule = Rule;
class Walker extends tslint_1.RuleWalker {
    constructor() {
        super(...arguments);
        /**
         * List of identifier names that have been imported from `@angular/material` or `@angular/cdk`
         * in the current source file and therefore can be considered trusted.
         */
        this.trustedIdentifiers = new Set();
        /** List of namespaces that have been imported from `@angular/material` or `@angular/cdk`. */
        this.trustedNamespaces = new Set();
    }
    /** Method that is called for every identifier inside of the specified project. */
    visitIdentifier(identifier) {
        // For identifiers that aren't listed in the className data, the whole check can be
        // skipped safely.
        if (!class_names_1.classNames.some(data => data.replace === identifier.text)) {
            return;
        }
        // For namespace imports that are referring to Angular Material or the CDK, we store the
        // namespace name in order to be able to safely find identifiers that don't belong to the
        // developer's application.
        if (imports_1.isNamespaceImportNode(identifier) && typescript_specifiers_1.isMaterialImportDeclaration(identifier)) {
            this.trustedNamespaces.add(identifier.text);
            return this._createFailureWithReplacement(identifier);
        }
        // For export declarations that are referring to Angular Material or the CDK, the identifier
        // can be immediately updated to the new name.
        if (imports_1.isExportSpecifierNode(identifier) && typescript_specifiers_1.isMaterialExportDeclaration(identifier)) {
            return this._createFailureWithReplacement(identifier);
        }
        // For import declarations that are referring to Angular Material or the CDK, the name of
        // the import identifiers. This allows us to identify identifiers that belong to Material and
        // the CDK, and we won't accidentally touch a developer's identifier.
        if (imports_1.isImportSpecifierNode(identifier) && typescript_specifiers_1.isMaterialImportDeclaration(identifier)) {
            this.trustedIdentifiers.add(identifier.text);
            return this._createFailureWithReplacement(identifier);
        }
        // In case the identifier is part of a property access expression, we need to verify that the
        // property access originates from a namespace that has been imported from Material or the CDK.
        if (ts.isPropertyAccessExpression(identifier.parent)) {
            const expression = identifier.parent.expression;
            if (ts.isIdentifier(expression) && this.trustedNamespaces.has(expression.text)) {
                return this._createFailureWithReplacement(identifier);
            }
        }
        else if (this.trustedIdentifiers.has(identifier.text)) {
            return this._createFailureWithReplacement(identifier);
        }
    }
    /** Creates a failure and replacement for the specified identifier. */
    _createFailureWithReplacement(identifier) {
        const classData = class_names_1.classNames.find(data => data.replace === identifier.text);
        if (!classData) {
            console.error(`Could not find updated name for identifier "${identifier.text}" in ` +
                ` in file ${this.getSourceFile().fileName}.`);
            return;
        }
        const replacement = this.createReplacement(identifier.getStart(), identifier.getWidth(), classData.replaceWith);
        this.addFailureAtNode(identifier, `Found deprecated identifier "${chalk_1.red(classData.replace)}" which has been renamed to` +
            ` "${chalk_1.green(classData.replaceWith)}"`, replacement);
    }
}
exports.Walker = Walker;
//# sourceMappingURL=classNamesIdentifierRule.js.map