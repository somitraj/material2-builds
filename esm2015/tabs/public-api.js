/**
 * @fileoverview added by tsickle
 * Generated from: src/material/tabs/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export { MatTabsModule } from './tabs-module';
export { MatTabChangeEvent, _MatTabGroupBase, MatTabGroup } from './tab-group';
export { MatInkBar, _MAT_INK_BAR_POSITIONER } from './ink-bar';
export { MatTabBody, _MatTabBodyBase, MatTabBodyPortal } from './tab-body';
export { MatTabHeader, _MatTabHeaderBase } from './tab-header';
export { MatTabLabelWrapper } from './tab-label-wrapper';
export { MatTab, MAT_TAB_GROUP } from './tab';
export { MatTabLabel } from './tab-label';
export { MatTabNav, MatTabLink, _MatTabNavBase, _MatTabLinkBase } from './tab-nav-bar/index';
export { MatTabContent } from './tab-content';
export { matTabsAnimations } from './tabs-animations';
export { MAT_TABS_CONFIG } from './tab-config';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC90YWJzL3B1YmxpYy1hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1QyxpRUFBYyxhQUFhLENBQUM7QUFDNUIsT0FBTyxFQUFDLFNBQVMsRUFBd0IsdUJBQXVCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDbkYsT0FBTyxFQUNMLFVBQVUsRUFDVixlQUFlLEVBR2YsZ0JBQWdCLEVBQ2pCLE1BQU0sWUFBWSxDQUFDO0FBQ3BCLE9BQU8sRUFBQyxZQUFZLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDN0QsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDNUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDM0YsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU1QyxrQ0FBYyxtQkFBbUIsQ0FBQztBQUNsQyxPQUFPLEVBQUMsZUFBZSxFQUFnQixNQUFNLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5leHBvcnQge01hdFRhYnNNb2R1bGV9IGZyb20gJy4vdGFicy1tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi90YWItZ3JvdXAnO1xuZXhwb3J0IHtNYXRJbmtCYXIsIF9NYXRJbmtCYXJQb3NpdGlvbmVyLCBfTUFUX0lOS19CQVJfUE9TSVRJT05FUn0gZnJvbSAnLi9pbmstYmFyJztcbmV4cG9ydCB7XG4gIE1hdFRhYkJvZHksXG4gIF9NYXRUYWJCb2R5QmFzZSxcbiAgTWF0VGFiQm9keU9yaWdpblN0YXRlLFxuICBNYXRUYWJCb2R5UG9zaXRpb25TdGF0ZSxcbiAgTWF0VGFiQm9keVBvcnRhbFxufSBmcm9tICcuL3RhYi1ib2R5JztcbmV4cG9ydCB7TWF0VGFiSGVhZGVyLCBfTWF0VGFiSGVhZGVyQmFzZX0gZnJvbSAnLi90YWItaGVhZGVyJztcbmV4cG9ydCB7TWF0VGFiTGFiZWxXcmFwcGVyfSBmcm9tICcuL3RhYi1sYWJlbC13cmFwcGVyJztcbmV4cG9ydCB7TWF0VGFiLCBNQVRfVEFCX0dST1VQfSBmcm9tICcuL3RhYic7XG5leHBvcnQge01hdFRhYkxhYmVsfSBmcm9tICcuL3RhYi1sYWJlbCc7XG5leHBvcnQge01hdFRhYk5hdiwgTWF0VGFiTGluaywgX01hdFRhYk5hdkJhc2UsIF9NYXRUYWJMaW5rQmFzZX0gZnJvbSAnLi90YWItbmF2LWJhci9pbmRleCc7XG5leHBvcnQge01hdFRhYkNvbnRlbnR9IGZyb20gJy4vdGFiLWNvbnRlbnQnO1xuZXhwb3J0IHtTY3JvbGxEaXJlY3Rpb259IGZyb20gJy4vcGFnaW5hdGVkLXRhYi1oZWFkZXInO1xuZXhwb3J0ICogZnJvbSAnLi90YWJzLWFuaW1hdGlvbnMnO1xuZXhwb3J0IHtNQVRfVEFCU19DT05GSUcsIE1hdFRhYnNDb25maWd9IGZyb20gJy4vdGFiLWNvbmZpZyc7XG4iXX0=