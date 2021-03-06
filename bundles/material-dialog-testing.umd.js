(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('@angular/cdk/testing')) :
    typeof define === 'function' && define.amd ? define('@angular/material/dialog/testing', ['exports', 'tslib', '@angular/cdk/testing'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.material = global.ng.material || {}, global.ng.material.dialog = global.ng.material.dialog || {}, global.ng.material.dialog.testing = {}), global.tslib, global.ng.cdk.testing));
}(this, (function (exports, tslib, testing) { 'use strict';

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /** Harness for interacting with a standard `MatDialog` in tests. */
    var MatDialogHarness = /** @class */ (function (_super) {
        tslib.__extends(MatDialogHarness, _super);
        function MatDialogHarness() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Gets a `HarnessPredicate` that can be used to search for a `MatDialogHarness` that meets
         * certain criteria.
         * @param options Options for filtering which dialog instances are considered a match.
         * @return a `HarnessPredicate` configured with the given options.
         */
        MatDialogHarness.with = function (options) {
            if (options === void 0) { options = {}; }
            return new testing.HarnessPredicate(MatDialogHarness, options);
        };
        /** Gets the id of the dialog. */
        MatDialogHarness.prototype.getId = function () {
            return tslib.__awaiter(this, void 0, void 0, function () {
                var id;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.host()];
                        case 1: return [4 /*yield*/, (_a.sent()).getAttribute('id')];
                        case 2:
                            id = _a.sent();
                            // In case no id has been specified, the "id" property always returns
                            // an empty string. To make this method more explicit, we return null.
                            return [2 /*return*/, id !== '' ? id : null];
                    }
                });
            });
        };
        /** Gets the role of the dialog. */
        MatDialogHarness.prototype.getRole = function () {
            return tslib.__awaiter(this, void 0, void 0, function () {
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.host()];
                        case 1: return [2 /*return*/, (_a.sent()).getAttribute('role')];
                    }
                });
            });
        };
        /** Gets the value of the dialog's "aria-label" attribute. */
        MatDialogHarness.prototype.getAriaLabel = function () {
            return tslib.__awaiter(this, void 0, void 0, function () {
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.host()];
                        case 1: return [2 /*return*/, (_a.sent()).getAttribute('aria-label')];
                    }
                });
            });
        };
        /** Gets the value of the dialog's "aria-labelledby" attribute. */
        MatDialogHarness.prototype.getAriaLabelledby = function () {
            return tslib.__awaiter(this, void 0, void 0, function () {
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.host()];
                        case 1: return [2 /*return*/, (_a.sent()).getAttribute('aria-labelledby')];
                    }
                });
            });
        };
        /** Gets the value of the dialog's "aria-describedby" attribute. */
        MatDialogHarness.prototype.getAriaDescribedby = function () {
            return tslib.__awaiter(this, void 0, void 0, function () {
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.host()];
                        case 1: return [2 /*return*/, (_a.sent()).getAttribute('aria-describedby')];
                    }
                });
            });
        };
        /**
         * Closes the dialog by pressing escape.
         *
         * Note: this method does nothing if `disableClose` has been set to `true` for the dialog.
         */
        MatDialogHarness.prototype.close = function () {
            return tslib.__awaiter(this, void 0, void 0, function () {
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.host()];
                        case 1: return [4 /*yield*/, (_a.sent()).sendKeys(testing.TestKey.ESCAPE)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // Developers can provide a custom component or template for the
        // dialog. The canonical dialog parent is the "MatDialogContainer".
        /** The selector for the host element of a `MatDialog` instance. */
        MatDialogHarness.hostSelector = '.mat-dialog-container';
        return MatDialogHarness;
    }(testing.ComponentHarness));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    exports.MatDialogHarness = MatDialogHarness;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-dialog-testing.umd.js.map
