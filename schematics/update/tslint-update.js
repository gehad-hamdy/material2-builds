"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
/** List of rules that need to be enabled when running the TSLint fix task. */
const upgradeRules = [
    // Attribute selector update rules.
    'attribute-selectors-string-literal',
    'attribute-selectors-stylesheet',
    'attribute-selectors-template',
    // Class name update rules
    'class-names-identifier',
    'class-names-identifier-misc',
    // CSS selectors update rules
    'css-selectors-string-literal',
    'css-selectors-stylesheet',
    'css-selectors-template',
    // Element selector update rules
    'element-selectors-string-literal',
    'element-selectors-stylesheet',
    'element-selectors-template',
    // Input name update rules
    'input-names-stylesheet',
    'input-names-template',
    // Output name update rules
    'output-names-template',
    // Property name update rules
    'property-names-access',
    'property-names-misc',
    // Method call checks
    'method-calls-check',
    // Class inheritance
    'class-inheritance-check',
    'class-inheritance-misc',
    // Additional misc rules.
    'check-import-misc',
    'check-template-misc'
];
/** List of absolute paths that refer to directories that contain the upgrade rules. */
const rulesDirectory = [
    // TODO(devversion): consider automatically resolving rule directories.
    path_1.join(__dirname, 'rules/'),
    path_1.join(__dirname, 'rules/attribute-selectors'),
    path_1.join(__dirname, 'rules/class-names'),
    path_1.join(__dirname, 'rules/class-inheritance'),
    path_1.join(__dirname, 'rules/input-names'),
    path_1.join(__dirname, 'rules/output-names'),
    path_1.join(__dirname, 'rules/css-selectors'),
    path_1.join(__dirname, 'rules/element-selectors'),
    path_1.join(__dirname, 'rules/property-names'),
    path_1.join(__dirname, 'rules/method-calls'),
];
/**
 * Creates a TSLint configuration object that can be passed to the schematic `TSLintFixTask`.
 * Each rule will have the specified target version as option which can be used to swap out
 * the upgrade data based on the given target version.
 */
function createTslintConfig(target) {
    const rules = upgradeRules.reduce((result, ruleName) => {
        result[ruleName] = [true, target];
        return result;
    }, {});
    return { rulesDirectory, rules };
}
exports.createTslintConfig = createTslintConfig;
//# sourceMappingURL=tslint-update.js.map