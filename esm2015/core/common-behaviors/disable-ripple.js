/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
/**
 * \@docs-private
 * @record
 */
export function CanDisableRipple() { }
if (false) {
    /**
     * Whether ripples are disabled.
     * @type {?}
     */
    CanDisableRipple.prototype.disableRipple;
}
/**
 * Mixin to augment a directive with a `disableRipple` property.
 * @template T
 * @param {?} base
 * @return {?}
 */
export function mixinDisableRipple(base) {
    return class extends base {
        /**
         * @param {...?} args
         */
        constructor(...args) {
            super(...args);
            this._disableRipple = false;
        }
        /**
         * Whether the ripple effect is disabled or not.
         * @return {?}
         */
        get disableRipple() { return this._disableRipple; }
        /**
         * @param {?} value
         * @return {?}
         */
        set disableRipple(value) { this._disableRipple = coerceBooleanProperty(value); }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZS1yaXBwbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvY29yZS9jb21tb24tYmVoYXZpb3JzL2Rpc2FibGUtcmlwcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBSTVELHNDQUdDOzs7Ozs7SUFEQyx5Q0FBdUI7Ozs7Ozs7O0FBT3pCLE1BQU0sVUFBVSxrQkFBa0IsQ0FBNEIsSUFBTztJQUNuRSxPQUFPLEtBQU0sU0FBUSxJQUFJOzs7O1FBT3ZCLFlBQVksR0FBRyxJQUFXO1lBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFOckMsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFNTSxDQUFDOzs7OztRQUgvQyxJQUFJLGFBQWEsS0FBSyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOzs7OztRQUNuRCxJQUFJLGFBQWEsQ0FBQyxLQUFVLElBQUksSUFBSSxDQUFDLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FHdEYsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0NvbnN0cnVjdG9yfSBmcm9tICcuL2NvbnN0cnVjdG9yJztcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ2FuRGlzYWJsZVJpcHBsZSB7XG4gIC8qKiBXaGV0aGVyIHJpcHBsZXMgYXJlIGRpc2FibGVkLiAqL1xuICBkaXNhYmxlUmlwcGxlOiBib29sZWFuO1xufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IHR5cGUgQ2FuRGlzYWJsZVJpcHBsZUN0b3IgPSBDb25zdHJ1Y3RvcjxDYW5EaXNhYmxlUmlwcGxlPjtcblxuLyoqIE1peGluIHRvIGF1Z21lbnQgYSBkaXJlY3RpdmUgd2l0aCBhIGBkaXNhYmxlUmlwcGxlYCBwcm9wZXJ0eS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtaXhpbkRpc2FibGVSaXBwbGU8VCBleHRlbmRzIENvbnN0cnVjdG9yPHt9Pj4oYmFzZTogVCk6IENhbkRpc2FibGVSaXBwbGVDdG9yICYgVCB7XG4gIHJldHVybiBjbGFzcyBleHRlbmRzIGJhc2Uge1xuICAgIHByaXZhdGUgX2Rpc2FibGVSaXBwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSByaXBwbGUgZWZmZWN0IGlzIGRpc2FibGVkIG9yIG5vdC4gKi9cbiAgICBnZXQgZGlzYWJsZVJpcHBsZSgpIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVSaXBwbGU7IH1cbiAgICBzZXQgZGlzYWJsZVJpcHBsZSh2YWx1ZTogYW55KSB7IHRoaXMuX2Rpc2FibGVSaXBwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG5cbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzOiBhbnlbXSkgeyBzdXBlciguLi5hcmdzKTsgfVxuICB9O1xufVxuIl19