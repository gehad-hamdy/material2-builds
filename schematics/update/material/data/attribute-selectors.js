"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const transform_change_data_1 = require("../transform-change-data");
exports.attributeSelectors = transform_change_data_1.transformChanges([
    {
        pr: 'https://github.com/angular/material2/pull/10257',
        changes: [
            {
                replace: 'cdkPortalHost',
                replaceWith: 'cdkPortalOutlet'
            },
            {
                replace: 'portalHost',
                replaceWith: 'cdkPortalOutlet'
            }
        ]
    }
]);
//# sourceMappingURL=attribute-selectors.js.map