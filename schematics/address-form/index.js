"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const build_component_1 = require("../utils/build-component");
const ast_1 = require("../utils/ast");
/**
 * Scaffolds a new table component.
 * Internally it bootstraps the base component schematic
 */
function default_1(options) {
    return schematics_1.chain([
        build_component_1.buildComponent(Object.assign({}, options), {
            template: './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.html',
            stylesheet: './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.__styleext__',
        }),
        options.skipImport ? schematics_1.noop() : addFormModulesToModule(options)
    ]);
}
exports.default = default_1;
/**
 * Adds the required modules to the relative module.
 */
function addFormModulesToModule(options) {
    return (host) => {
        const modulePath = ast_1.findModuleFromOptions(host, options);
        ast_1.addModuleImportToModule(host, modulePath, 'MatInputModule', '@angular/material');
        ast_1.addModuleImportToModule(host, modulePath, 'MatButtonModule', '@angular/material');
        ast_1.addModuleImportToModule(host, modulePath, 'MatSelectModule', '@angular/material');
        ast_1.addModuleImportToModule(host, modulePath, 'MatRadioModule', '@angular/material');
        ast_1.addModuleImportToModule(host, modulePath, 'MatCardModule', '@angular/material');
        ast_1.addModuleImportToModule(host, modulePath, 'ReactiveFormsModule', '@angular/forms');
        return host;
    };
}
//# sourceMappingURL=index.js.map