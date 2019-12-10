import { __extends, __awaiter, __generator, __read } from 'tslib';
import { HarnessPredicate, ComponentHarness } from '@angular/cdk/testing';
import { MatFormFieldControlHarness } from '@angular/material/form-field/testing/control';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a the `mat-option` for a `mat-select` in tests. */
var MatSelectOptionHarness = /** @class */ (function (_super) {
    __extends(MatSelectOptionHarness, _super);
    function MatSelectOptionHarness() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // TODO(crisbeto): things to add here when adding a common option harness:
    // - isDisabled
    // - isSelected
    // - isActive
    // - isMultiple
    MatSelectOptionHarness.with = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatSelectOptionHarness, options)
            .addOption('text', options.text, function (harness, title) { return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = HarnessPredicate).stringMatches;
                    return [4 /*yield*/, harness.getText()];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent(), title])];
            }
        }); }); });
    };
    /** Clicks the option. */
    MatSelectOptionHarness.prototype.click = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).click()];
                }
            });
        });
    };
    /** Gets a promise for the option's label text. */
    MatSelectOptionHarness.prototype.getText = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).text()];
                }
            });
        });
    };
    MatSelectOptionHarness.hostSelector = '.mat-select-panel .mat-option';
    return MatSelectOptionHarness;
}(ComponentHarness));
/** Harness for interacting with a the `mat-optgroup` for a `mat-select` in tests. */
var MatSelectOptionGroupHarness = /** @class */ (function (_super) {
    __extends(MatSelectOptionGroupHarness, _super);
    function MatSelectOptionGroupHarness() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._label = _this.locatorFor('.mat-optgroup-label');
        return _this;
    }
    MatSelectOptionGroupHarness.with = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatSelectOptionGroupHarness, options)
            .addOption('labelText', options.labelText, function (harness, title) { return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = HarnessPredicate).stringMatches;
                    return [4 /*yield*/, harness.getLabelText()];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent(), title])];
            }
        }); }); });
    };
    /** Gets a promise for the option group's label text. */
    MatSelectOptionGroupHarness.prototype.getLabelText = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._label()];
                    case 1: return [2 /*return*/, (_a.sent()).text()];
                }
            });
        });
    };
    MatSelectOptionGroupHarness.hostSelector = '.mat-select-panel .mat-optgroup';
    return MatSelectOptionGroupHarness;
}(ComponentHarness));

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Harness for interacting with a standard mat-select in tests. */
var MatSelectHarness = /** @class */ (function (_super) {
    __extends(MatSelectHarness, _super);
    function MatSelectHarness() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._documentRootLocator = _this.documentRootLocatorFactory();
        _this._backdrop = _this._documentRootLocator.locatorFor('.cdk-overlay-backdrop');
        _this._optionalPanel = _this._documentRootLocator.locatorForOptional('.mat-select-panel');
        _this._trigger = _this.locatorFor('.mat-select-trigger');
        _this._value = _this.locatorFor('.mat-select-value');
        return _this;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatSelectHarness` that meets
     * certain criteria.
     * @param options Options for filtering which select instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    MatSelectHarness.with = function (options) {
        if (options === void 0) { options = {}; }
        return new HarnessPredicate(MatSelectHarness, options);
    };
    /** Gets a boolean promise indicating if the select is disabled. */
    MatSelectHarness.prototype.isDisabled = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).hasClass('mat-select-disabled')];
                }
            });
        });
    };
    /** Gets a boolean promise indicating if the select is valid. */
    MatSelectHarness.prototype.isValid = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [4 /*yield*/, (_a.sent()).hasClass('ng-invalid')];
                    case 2: return [2 /*return*/, !(_a.sent())];
                }
            });
        });
    };
    /** Gets a boolean promise indicating if the select is required. */
    MatSelectHarness.prototype.isRequired = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).hasClass('mat-select-required')];
                }
            });
        });
    };
    /** Gets a boolean promise indicating if the select is empty (no value is selected). */
    MatSelectHarness.prototype.isEmpty = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).hasClass('mat-select-empty')];
                }
            });
        });
    };
    /** Gets a boolean promise indicating if the select is in multi-selection mode. */
    MatSelectHarness.prototype.isMultiple = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ariaMultiselectable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1:
                        ariaMultiselectable = (_a.sent()).getAttribute('aria-multiselectable');
                        return [4 /*yield*/, ariaMultiselectable];
                    case 2: return [2 /*return*/, (_a.sent()) === 'true'];
                }
            });
        });
    };
    /** Gets a promise for the select's value text. */
    MatSelectHarness.prototype.getValueText = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._value()];
                    case 1: return [2 /*return*/, (_a.sent()).text()];
                }
            });
        });
    };
    /** Focuses the select and returns a void promise that indicates when the action is complete. */
    MatSelectHarness.prototype.focus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).focus()];
                }
            });
        });
    };
    /** Blurs the select and returns a void promise that indicates when the action is complete. */
    MatSelectHarness.prototype.blur = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.host()];
                    case 1: return [2 /*return*/, (_a.sent()).blur()];
                }
            });
        });
    };
    /** Gets the options inside the select panel. */
    MatSelectHarness.prototype.getOptions = function (filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._documentRootLocator.locatorForAll(MatSelectOptionHarness.with(filter))()];
            });
        });
    };
    /** Gets the groups of options inside the panel. */
    MatSelectHarness.prototype.getOptionGroups = function (filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._documentRootLocator.locatorForAll(MatSelectOptionGroupHarness.with(filter))()];
            });
        });
    };
    /** Gets whether the select is open. */
    MatSelectHarness.prototype.isOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._optionalPanel()];
                    case 1: return [2 /*return*/, !!(_a.sent())];
                }
            });
        });
    };
    /** Opens the select's panel. */
    MatSelectHarness.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isOpen()];
                    case 1:
                        if (!!(_a.sent())) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._trigger()];
                    case 2: return [2 /*return*/, (_a.sent()).click()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Clicks the options that match the passed-in filter. If the select is in multi-selection
     * mode all options will be clicked, otherwise the harness will pick the first matching option.
     */
    MatSelectHarness.prototype.clickOptions = function (filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, isMultiple, options;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.open()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Promise.all([this.isMultiple(), this.getOptions(filter)])];
                    case 2:
                        _a = __read.apply(void 0, [_b.sent(), 2]), isMultiple = _a[0], options = _a[1];
                        if (options.length === 0) {
                            throw Error('Select does not have options matching the specified filter');
                        }
                        if (!isMultiple) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all(options.map(function (option) { return option.click(); }))];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, options[0].click()];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /** Closes the select's panel. */
    MatSelectHarness.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isOpen()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._backdrop()];
                    case 2: 
                    // This is the most consistent way that works both in both single and multi-select modes,
                    // but it assumes that only one overlay is open at a time. We should be able to make it
                    // a bit more precise after #16645 where we can dispatch an ESCAPE press to the host instead.
                    return [2 /*return*/, (_a.sent()).click()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MatSelectHarness.hostSelector = '.mat-select';
    return MatSelectHarness;
}(MatFormFieldControlHarness));

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

export { MatSelectHarness };
//# sourceMappingURL=testing.js.map