/**
 * @fileoverview added by tsickle
 * Generated from: src/material/datepicker/datepicker.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { Overlay, OverlayConfig, } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, InjectionToken, Input, NgZone, Optional, Output, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { DateAdapter, mixinColor, } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { merge, Subject, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { MatCalendar } from './calendar';
import { matDatepickerAnimations } from './datepicker-animations';
import { createMissingDateImplError } from './datepicker-errors';
/**
 * Used to generate a unique ID for each datepicker instance.
 * @type {?}
 */
let datepickerUid = 0;
/**
 * Injection token that determines the scroll handling while the calendar is open.
 * @type {?}
 */
export const MAT_DATEPICKER_SCROLL_STRATEGY = new InjectionToken('mat-datepicker-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
export function MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY(overlay) {
    return (/**
     * @return {?}
     */
    () => overlay.scrollStrategies.reposition());
}
/**
 * \@docs-private
 * @type {?}
 */
export const MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MAT_DATEPICKER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY,
};
// Boilerplate for applying mixins to MatDatepickerContent.
/**
 * \@docs-private
 */
class MatDatepickerContentBase {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    MatDatepickerContentBase.prototype._elementRef;
}
/** @type {?} */
const _MatDatepickerContentMixinBase = mixinColor(MatDatepickerContentBase);
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * MatCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * \@docs-private
 * @template D
 */
export class MatDatepickerContent extends _MatDatepickerContentMixinBase {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._calendar.focusActiveCell();
    }
}
MatDatepickerContent.decorators = [
    { type: Component, args: [{
                selector: 'mat-datepicker-content',
                template: "<mat-calendar cdkTrapFocus\n    [id]=\"datepicker.id\"\n    [ngClass]=\"datepicker.panelClass\"\n    [startAt]=\"datepicker.startAt\"\n    [startView]=\"datepicker.startView\"\n    [minDate]=\"datepicker._minDate\"\n    [maxDate]=\"datepicker._maxDate\"\n    [dateFilter]=\"datepicker._dateFilter\"\n    [headerComponent]=\"datepicker.calendarHeaderComponent\"\n    [selected]=\"datepicker._selected\"\n    [dateClass]=\"datepicker.dateClass\"\n    [@fadeInCalendar]=\"'enter'\"\n    (selectedChange)=\"datepicker.select($event)\"\n    (yearSelected)=\"datepicker._selectYear($event)\"\n    (monthSelected)=\"datepicker._selectMonth($event)\"\n    (_userSelection)=\"datepicker.close()\">\n</mat-calendar>\n",
                host: {
                    'class': 'mat-datepicker-content',
                    '[@transformPanel]': '"enter"',
                    '[class.mat-datepicker-content-touch]': 'datepicker.touchUi',
                },
                animations: [
                    matDatepickerAnimations.transformPanel,
                    matDatepickerAnimations.fadeInCalendar,
                ],
                exportAs: 'matDatepickerContent',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                inputs: ['color'],
                styles: [".mat-datepicker-content{display:block;border-radius:4px}.mat-datepicker-content .mat-calendar{width:296px;height:354px}.mat-datepicker-content-touch{display:block;max-height:80vh;overflow:auto;margin:-24px}.mat-datepicker-content-touch .mat-calendar{min-width:250px;min-height:312px;max-width:750px;max-height:788px}@media all and (orientation: landscape){.mat-datepicker-content-touch .mat-calendar{width:64vh;height:80vh}}@media all and (orientation: portrait){.mat-datepicker-content-touch .mat-calendar{width:80vw;height:100vw}}\n"]
            }] }
];
/** @nocollapse */
MatDatepickerContent.ctorParameters = () => [
    { type: ElementRef }
];
MatDatepickerContent.propDecorators = {
    _calendar: [{ type: ViewChild, args: [MatCalendar,] }]
};
if (false) {
    /**
     * Reference to the internal calendar component.
     * @type {?}
     */
    MatDatepickerContent.prototype._calendar;
    /**
     * Reference to the datepicker that created the overlay.
     * @type {?}
     */
    MatDatepickerContent.prototype.datepicker;
    /**
     * Whether the datepicker is above or below the input.
     * @type {?}
     */
    MatDatepickerContent.prototype._isAbove;
}
// TODO(mmalerba): We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="matDatepicker"). We can change this to a directive
// if angular adds support for `exportAs: '$implicit'` on directives.
/**
 * Component responsible for managing the datepicker popup/dialog.
 * @template D
 */
export class MatDatepicker {
    /**
     * @param {?} _dialog
     * @param {?} _overlay
     * @param {?} _ngZone
     * @param {?} _viewContainerRef
     * @param {?} scrollStrategy
     * @param {?} _dateAdapter
     * @param {?} _dir
     * @param {?} _document
     */
    constructor(_dialog, _overlay, _ngZone, _viewContainerRef, scrollStrategy, _dateAdapter, _dir, _document) {
        this._dialog = _dialog;
        this._overlay = _overlay;
        this._ngZone = _ngZone;
        this._viewContainerRef = _viewContainerRef;
        this._dateAdapter = _dateAdapter;
        this._dir = _dir;
        this._document = _document;
        /**
         * The view that the calendar should start in.
         */
        this.startView = 'month';
        this._touchUi = false;
        /**
         * Emits selected year in multiyear view.
         * This doesn't imply a change on the selected date.
         */
        this.yearSelected = new EventEmitter();
        /**
         * Emits selected month in year view.
         * This doesn't imply a change on the selected date.
         */
        this.monthSelected = new EventEmitter();
        /**
         * Emits when the datepicker has been opened.
         */
        this.openedStream = new EventEmitter();
        /**
         * Emits when the datepicker has been closed.
         */
        this.closedStream = new EventEmitter();
        this._opened = false;
        /**
         * The id for the datepicker calendar.
         */
        this.id = `mat-datepicker-${datepickerUid++}`;
        this._validSelected = null;
        /**
         * The element that was focused before the datepicker was opened.
         */
        this._focusedElementBeforeOpen = null;
        /**
         * Subscription to value changes in the associated input element.
         */
        this._inputSubscription = Subscription.EMPTY;
        /**
         * Emits when the datepicker is disabled.
         */
        this._disabledChange = new Subject();
        /**
         * Emits new selected date when selected date changes.
         */
        this._selectedChanged = new Subject();
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        this._scrollStrategy = scrollStrategy;
    }
    /**
     * The date to open the calendar to initially.
     * @return {?}
     */
    get startAt() {
        // If an explicit startAt is set we start there, otherwise we start at whatever the currently
        // selected value is.
        return this._startAt || (this._datepickerInput ? this._datepickerInput.value : null);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set startAt(value) {
        this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /**
     * Color palette to use on the datepicker's calendar.
     * @return {?}
     */
    get color() {
        return this._color ||
            (this._datepickerInput ? this._datepickerInput._getThemePalette() : undefined);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        this._color = value;
    }
    /**
     * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
     * than a popup and elements have more padding to allow for bigger touch targets.
     * @return {?}
     */
    get touchUi() { return this._touchUi; }
    /**
     * @param {?} value
     * @return {?}
     */
    set touchUi(value) {
        this._touchUi = coerceBooleanProperty(value);
    }
    /**
     * Whether the datepicker pop-up should be disabled.
     * @return {?}
     */
    get disabled() {
        return this._disabled === undefined && this._datepickerInput ?
            this._datepickerInput.disabled : !!this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        /** @type {?} */
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this._disabledChange.next(newValue);
        }
    }
    /**
     * Whether the calendar is open.
     * @return {?}
     */
    get opened() { return this._opened; }
    /**
     * @param {?} value
     * @return {?}
     */
    set opened(value) { value ? this.open() : this.close(); }
    /**
     * The currently selected date.
     * @return {?}
     */
    get _selected() { return this._validSelected; }
    /**
     * @param {?} value
     * @return {?}
     */
    set _selected(value) { this._validSelected = value; }
    /**
     * The minimum selectable date.
     * @return {?}
     */
    get _minDate() {
        return this._datepickerInput && this._datepickerInput.min;
    }
    /**
     * The maximum selectable date.
     * @return {?}
     */
    get _maxDate() {
        return this._datepickerInput && this._datepickerInput.max;
    }
    /**
     * @return {?}
     */
    get _dateFilter() {
        return this._datepickerInput && this._datepickerInput._dateFilter;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        this._inputSubscription.unsubscribe();
        this._disabledChange.complete();
        if (this._popupRef) {
            this._popupRef.dispose();
            this._popupComponentRef = null;
        }
    }
    /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    select(date) {
        /** @type {?} */
        let oldValue = this._selected;
        this._selected = date;
        if (!this._dateAdapter.sameDate(oldValue, this._selected)) {
            this._selectedChanged.next(date);
        }
    }
    /**
     * Emits the selected year in multiyear view
     * @param {?} normalizedYear
     * @return {?}
     */
    _selectYear(normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    }
    /**
     * Emits selected month in year view
     * @param {?} normalizedMonth
     * @return {?}
     */
    _selectMonth(normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    }
    /**
     * Register an input with this datepicker.
     * @param {?} input The datepicker input to register with this datepicker.
     * @return {?}
     */
    _registerInput(input) {
        if (this._datepickerInput) {
            throw Error('A MatDatepicker can only be associated with a single input.');
        }
        this._datepickerInput = input;
        this._inputSubscription =
            this._datepickerInput._valueChange.subscribe((/**
             * @param {?} value
             * @return {?}
             */
            (value) => this._selected = value));
    }
    /**
     * Open the calendar.
     * @return {?}
     */
    open() {
        if (this._opened || this.disabled) {
            return;
        }
        if (!this._datepickerInput) {
            throw Error('Attempted to open an MatDatepicker with no associated input.');
        }
        if (this._document) {
            this._focusedElementBeforeOpen = this._document.activeElement;
        }
        this.touchUi ? this._openAsDialog() : this._openAsPopup();
        this._opened = true;
        this.openedStream.emit();
    }
    /**
     * Close the calendar.
     * @return {?}
     */
    close() {
        if (!this._opened) {
            return;
        }
        if (this._popupRef && this._popupRef.hasAttached()) {
            this._popupRef.detach();
        }
        if (this._dialogRef) {
            this._dialogRef.close();
            this._dialogRef = null;
        }
        if (this._calendarPortal && this._calendarPortal.isAttached) {
            this._calendarPortal.detach();
        }
        /** @type {?} */
        const completeClose = (/**
         * @return {?}
         */
        () => {
            // The `_opened` could've been reset already if
            // we got two events in quick succession.
            if (this._opened) {
                this._opened = false;
                this.closedStream.emit();
                this._focusedElementBeforeOpen = null;
            }
        });
        if (this._focusedElementBeforeOpen &&
            typeof this._focusedElementBeforeOpen.focus === 'function') {
            // Because IE moves focus asynchronously, we can't count on it being restored before we've
            // marked the datepicker as closed. If the event fires out of sequence and the element that
            // we're refocusing opens the datepicker on focus, the user could be stuck with not being
            // able to close the calendar at all. We work around it by making the logic, that marks
            // the datepicker as closed, async as well.
            this._focusedElementBeforeOpen.focus();
            setTimeout(completeClose);
        }
        else {
            completeClose();
        }
    }
    /**
     * Open the calendar as a dialog.
     * @private
     * @return {?}
     */
    _openAsDialog() {
        // Usually this would be handled by `open` which ensures that we can only have one overlay
        // open at a time, however since we reset the variables in async handlers some overlays
        // may slip through if the user opens and closes multiple times in quick succession (e.g.
        // by holding down the enter key).
        if (this._dialogRef) {
            this._dialogRef.close();
        }
        this._dialogRef = this._dialog.open(MatDatepickerContent, {
            direction: this._dir ? this._dir.value : 'ltr',
            viewContainerRef: this._viewContainerRef,
            panelClass: 'mat-datepicker-dialog',
        });
        this._dialogRef.afterClosed().subscribe((/**
         * @return {?}
         */
        () => this.close()));
        this._dialogRef.componentInstance.datepicker = this;
        this._setColor();
    }
    /**
     * Open the calendar as a popup.
     * @private
     * @return {?}
     */
    _openAsPopup() {
        if (!this._calendarPortal) {
            this._calendarPortal = new ComponentPortal(MatDatepickerContent, this._viewContainerRef);
        }
        if (!this._popupRef) {
            this._createPopup();
        }
        if (!this._popupRef.hasAttached()) {
            this._popupComponentRef = this._popupRef.attach(this._calendarPortal);
            this._popupComponentRef.instance.datepicker = this;
            this._setColor();
            // Update the position once the calendar has rendered.
            this._ngZone.onStable.asObservable().pipe(take(1)).subscribe((/**
             * @return {?}
             */
            () => {
                this._popupRef.updatePosition();
            }));
        }
    }
    /**
     * Create the popup.
     * @private
     * @return {?}
     */
    _createPopup() {
        /** @type {?} */
        const overlayConfig = new OverlayConfig({
            positionStrategy: this._createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: 'mat-overlay-transparent-backdrop',
            direction: this._dir,
            scrollStrategy: this._scrollStrategy(),
            panelClass: 'mat-datepicker-popup',
        });
        this._popupRef = this._overlay.create(overlayConfig);
        this._popupRef.overlayElement.setAttribute('role', 'dialog');
        merge(this._popupRef.backdropClick(), this._popupRef.detachments(), this._popupRef.keydownEvents().pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            // Closing on alt + up is only valid when there's an input associated with the datepicker.
            return event.keyCode === ESCAPE ||
                (this._datepickerInput && event.altKey && event.keyCode === UP_ARROW);
        })))).subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event) {
                event.preventDefault();
            }
            this.close();
        }));
    }
    /**
     * Create the popup PositionStrategy.
     * @private
     * @return {?}
     */
    _createPopupPositionStrategy() {
        return this._overlay.position()
            .flexibleConnectedTo(this._datepickerInput.getConnectedOverlayOrigin())
            .withTransformOriginOn('.mat-datepicker-content')
            .withFlexibleDimensions(false)
            .withViewportMargin(8)
            .withLockedPosition()
            .withPositions([
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top'
            },
            {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom'
            }
        ]);
    }
    /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    _getValidDateOrNull(obj) {
        return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
    }
    /**
     * Passes the current theme color along to the calendar overlay.
     * @private
     * @return {?}
     */
    _setColor() {
        /** @type {?} */
        const color = this.color;
        if (this._popupComponentRef) {
            this._popupComponentRef.instance.color = color;
        }
        if (this._dialogRef) {
            this._dialogRef.componentInstance.color = color;
        }
    }
}
MatDatepicker.decorators = [
    { type: Component, args: [{
                selector: 'mat-datepicker',
                template: '',
                exportAs: 'matDatepicker',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
MatDatepicker.ctorParameters = () => [
    { type: MatDialog },
    { type: Overlay },
    { type: NgZone },
    { type: ViewContainerRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DATEPICKER_SCROLL_STRATEGY,] }] },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
MatDatepicker.propDecorators = {
    calendarHeaderComponent: [{ type: Input }],
    startAt: [{ type: Input }],
    startView: [{ type: Input }],
    color: [{ type: Input }],
    touchUi: [{ type: Input }],
    disabled: [{ type: Input }],
    yearSelected: [{ type: Output }],
    monthSelected: [{ type: Output }],
    panelClass: [{ type: Input }],
    dateClass: [{ type: Input }],
    openedStream: [{ type: Output, args: ['opened',] }],
    closedStream: [{ type: Output, args: ['closed',] }],
    opened: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MatDatepicker.ngAcceptInputType_disabled;
    /** @type {?} */
    MatDatepicker.ngAcceptInputType_touchUi;
    /**
     * @type {?}
     * @private
     */
    MatDatepicker.prototype._scrollStrategy;
    /**
     * An input indicating the type of the custom header component for the calendar, if set.
     * @type {?}
     */
    MatDatepicker.prototype.calendarHeaderComponent;
    /**
     * @type {?}
     * @private
     */
    MatDatepicker.prototype._startAt;
    /**
     * The view that the calendar should start in.
     * @type {?}
     */
    MatDatepicker.prototype.startView;
    /** @type {?} */
    MatDatepicker.prototype._color;
    /**
     * @type {?}
     * @private
     */
    MatDatepicker.prototype._touchUi;
    /**
     * @type {?}
     * @private
     */
    MatDatepicker.prototype._disabled;
    /**
     * Emits selected year in multiyear view.
     * This doesn't imply a change on the selected date.
     * @type {?}
     */
    MatDatepicker.prototype.yearSelected;
    /**
     * Emits selected month in year view.
     * This doesn't imply a change on the selected date.
     * @type {?}
     */
    MatDatepicker.prototype.monthSelected;
    /**
     * Classes to be passed to the date picker panel. Supports the same syntax as `ngClass`.
     * @type {?}
     */
    MatDatepicker.prototype.panelClass;
    /**
     * Function that can be used to add custom CSS classes to dates.
     * @type {?}
     */
    MatDatepicker.prototype.dateClass;
    /**
     * Emits when the datepicker has been opened.
     * @type {?}
     */
    MatDatepicker.prototype.openedStream;
    /**
     * Emits when the datepicker has been closed.
     * @type {?}
     */
    MatDatepicker.prototype.closedStream;
    /**
     * @type {?}
     * @private
     */
    MatDatepicker.prototype._opened;
    /**
     * The id for the datepicker calendar.
     * @type {?}
     */
    MatDatepicker.prototype.id;
    /**
     * @type {?}
     * @private
     */
    MatDatepicker.prototype._validSelected;
    /**
     * A reference to the overlay when the calendar is opened as a popup.
     * @type {?}
     */
    MatDatepicker.prototype._popupRef;
    /**
     * A reference to the dialog when the calendar is opened as a dialog.
     * @type {?}
     * @private
     */
    MatDatepicker.prototype._dialogRef;
    /**
     * A portal containing the calendar for this datepicker.
     * @type {?}
     * @private
     */
    MatDatepicker.prototype._calendarPortal;
    /**
     * Reference to the component instantiated in popup mode.
     * @type {?}
     * @private
     */
    MatDatepicker.prototype._popupComponentRef;
    /**
     * The element that was focused before the datepicker was opened.
     * @type {?}
     * @private
     */
    MatDatepicker.prototype._focusedElementBeforeOpen;
    /**
     * Subscription to value changes in the associated input element.
     * @type {?}
     * @private
     */
    MatDatepicker.prototype._inputSubscription;
    /**
     * The input element this datepicker is associated with.
     * @type {?}
     */
    MatDatepicker.prototype._datepickerInput;
    /**
     * Emits when the datepicker is disabled.
     * @type {?}
     */
    MatDatepicker.prototype._disabledChange;
    /**
     * Emits new selected date when selected date changes.
     * @type {?}
     */
    MatDatepicker.prototype._selectedChanged;
    /**
     * @type {?}
     * @private
     */
    MatDatepicker.prototype._dialog;
    /**
     * @type {?}
     * @private
     */
    MatDatepicker.prototype._overlay;
    /**
     * @type {?}
     * @private
     */
    MatDatepicker.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    MatDatepicker.prototype._viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    MatDatepicker.prototype._dateAdapter;
    /**
     * @type {?}
     * @private
     */
    MatDatepicker.prototype._dir;
    /**
     * @type {?}
     * @private
     */
    MatDatepicker.prototype._document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9kYXRlcGlja2VyL2RhdGVwaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUNMLE9BQU8sRUFDUCxhQUFhLEdBSWQsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUMsZUFBZSxFQUFnQixNQUFNLHFCQUFxQixDQUFDO0FBQ25FLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHTCxXQUFXLEVBQ1gsVUFBVSxHQUVYLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLFNBQVMsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDdkMsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0seUJBQXlCLENB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Ozs7OztJQU85RSxnQ0FBd0I7Ozs7O0lBR3hCLDJCQUFpRDs7Ozs7SUFLakQsdUNBQXdDOzs7OztJQWlCeEMsa0NBQXNCOzs7Ozs7SUFHdEIsbUNBQWlFOzs7Ozs7SUFHakUsd0NBQWtFOzs7Ozs7SUFHbEUsMkNBQXlFOzs7Ozs7SUFHekUsa0RBQTZEOzs7Ozs7SUFHN0QsMkNBQWdEOzs7OztJQUdoRCx5Q0FBd0M7Ozs7O0lBR3hDLHdDQUFrRDs7Ozs7SUFHbEQseUNBQTZDOzs7OztJQUVqQyxnQ0FBMEI7Ozs7O0lBQzFCLGlDQUF5Qjs7Ozs7SUFDekIsZ0NBQXVCOzs7OztJQUN2QiwwQ0FBMkM7Ozs7O0lBRTNDLHFDQUFnRDs7Ozs7SUFDaEQsNkJBQXdDOzs7OztJQUN4QyxrQ0FBb0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0VTQ0FQRSwgVVBfQVJST1d9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICBPdmVybGF5LFxuICBPdmVybGF5Q29uZmlnLFxuICBPdmVybGF5UmVmLFxuICBQb3NpdGlvblN0cmF0ZWd5LFxuICBTY3JvbGxTdHJhdGVneSxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtDb21wb25lbnRQb3J0YWwsIENvbXBvbmVudFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIEluamVjdGlvblRva2VuLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FuQ29sb3IsXG4gIENhbkNvbG9yQ3RvcixcbiAgRGF0ZUFkYXB0ZXIsXG4gIG1peGluQ29sb3IsXG4gIFRoZW1lUGFsZXR0ZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHttZXJnZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCB0YWtlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge01hdENhbGVuZGFyfSBmcm9tICcuL2NhbGVuZGFyJztcbmltcG9ydCB7bWF0RGF0ZXBpY2tlckFuaW1hdGlvbnN9IGZyb20gJy4vZGF0ZXBpY2tlci1hbmltYXRpb25zJztcbmltcG9ydCB7Y3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3J9IGZyb20gJy4vZGF0ZXBpY2tlci1lcnJvcnMnO1xuaW1wb3J0IHtNYXREYXRlcGlja2VySW5wdXR9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnB1dCc7XG5pbXBvcnQge01hdENhbGVuZGFyQ2VsbENzc0NsYXNzZXN9IGZyb20gJy4vY2FsZW5kYXItYm9keSc7XG5cbi8qKiBVc2VkIHRvIGdlbmVyYXRlIGEgdW5pcXVlIElEIGZvciBlYWNoIGRhdGVwaWNrZXIgaW5zdGFuY2UuICovXG5sZXQgZGF0ZXBpY2tlclVpZCA9IDA7XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgaGFuZGxpbmcgd2hpbGUgdGhlIGNhbGVuZGFyIGlzIG9wZW4uICovXG5leHBvcnQgY29uc3QgTUFUX0RBVEVQSUNLRVJfU0NST0xMX1NUUkFURUdZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KCkgPT4gU2Nyb2xsU3RyYXRlZ3k+KCdtYXQtZGF0ZXBpY2tlci1zY3JvbGwtc3RyYXRlZ3knKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBNQVRfREFURVBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xuICByZXR1cm4gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKTtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBNQVRfREFURVBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUiA9IHtcbiAgcHJvdmlkZTogTUFUX0RBVEVQSUNLRVJfU0NST0xMX1NUUkFURUdZLFxuICBkZXBzOiBbT3ZlcmxheV0sXG4gIHVzZUZhY3Rvcnk6IE1BVF9EQVRFUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZLFxufTtcblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNYXREYXRlcGlja2VyQ29udGVudC5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5jbGFzcyBNYXREYXRlcGlja2VyQ29udGVudEJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHsgfVxufVxuY29uc3QgX01hdERhdGVwaWNrZXJDb250ZW50TWl4aW5CYXNlOiBDYW5Db2xvckN0b3IgJiB0eXBlb2YgTWF0RGF0ZXBpY2tlckNvbnRlbnRCYXNlID1cbiAgICBtaXhpbkNvbG9yKE1hdERhdGVwaWNrZXJDb250ZW50QmFzZSk7XG5cbi8qKlxuICogQ29tcG9uZW50IHVzZWQgYXMgdGhlIGNvbnRlbnQgZm9yIHRoZSBkYXRlcGlja2VyIGRpYWxvZyBhbmQgcG9wdXAuIFdlIHVzZSB0aGlzIGluc3RlYWQgb2YgdXNpbmdcbiAqIE1hdENhbGVuZGFyIGRpcmVjdGx5IGFzIHRoZSBjb250ZW50IHNvIHdlIGNhbiBjb250cm9sIHRoZSBpbml0aWFsIGZvY3VzLiBUaGlzIGFsc28gZ2l2ZXMgdXMgYVxuICogcGxhY2UgdG8gcHV0IGFkZGl0aW9uYWwgZmVhdHVyZXMgb2YgdGhlIHBvcHVwIHRoYXQgYXJlIG5vdCBwYXJ0IG9mIHRoZSBjYWxlbmRhciBpdHNlbGYgaW4gdGhlXG4gKiBmdXR1cmUuIChlLmcuIGNvbmZpcm1hdGlvbiBidXR0b25zKS5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWRhdGVwaWNrZXItY29udGVudCcsXG4gIHRlbXBsYXRlVXJsOiAnZGF0ZXBpY2tlci1jb250ZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZGF0ZXBpY2tlci1jb250ZW50LmNzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1kYXRlcGlja2VyLWNvbnRlbnQnLFxuICAgICdbQHRyYW5zZm9ybVBhbmVsXSc6ICdcImVudGVyXCInLFxuICAgICdbY2xhc3MubWF0LWRhdGVwaWNrZXItY29udGVudC10b3VjaF0nOiAnZGF0ZXBpY2tlci50b3VjaFVpJyxcbiAgfSxcbiAgYW5pbWF0aW9uczogW1xuICAgIG1hdERhdGVwaWNrZXJBbmltYXRpb25zLnRyYW5zZm9ybVBhbmVsLFxuICAgIG1hdERhdGVwaWNrZXJBbmltYXRpb25zLmZhZGVJbkNhbGVuZGFyLFxuICBdLFxuICBleHBvcnRBczogJ21hdERhdGVwaWNrZXJDb250ZW50JyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGlucHV0czogWydjb2xvciddLFxufSlcbmV4cG9ydCBjbGFzcyBNYXREYXRlcGlja2VyQ29udGVudDxEPiBleHRlbmRzIF9NYXREYXRlcGlja2VyQ29udGVudE1peGluQmFzZVxuICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIENhbkNvbG9yIHtcblxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBpbnRlcm5hbCBjYWxlbmRhciBjb21wb25lbnQuICovXG4gIEBWaWV3Q2hpbGQoTWF0Q2FsZW5kYXIpIF9jYWxlbmRhcjogTWF0Q2FsZW5kYXI8RD47XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgZGF0ZXBpY2tlciB0aGF0IGNyZWF0ZWQgdGhlIG92ZXJsYXkuICovXG4gIGRhdGVwaWNrZXI6IE1hdERhdGVwaWNrZXI8RD47XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGRhdGVwaWNrZXIgaXMgYWJvdmUgb3IgYmVsb3cgdGhlIGlucHV0LiAqL1xuICBfaXNBYm92ZTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZik7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fY2FsZW5kYXIuZm9jdXNBY3RpdmVDZWxsKCk7XG4gIH1cbn1cblxuXG4vLyBUT0RPKG1tYWxlcmJhKTogV2UgdXNlIGEgY29tcG9uZW50IGluc3RlYWQgb2YgYSBkaXJlY3RpdmUgaGVyZSBzbyB0aGUgdXNlciBjYW4gdXNlIGltcGxpY2l0XG4vLyB0ZW1wbGF0ZSByZWZlcmVuY2UgdmFyaWFibGVzIChlLmcuICNkIHZzICNkPVwibWF0RGF0ZXBpY2tlclwiKS4gV2UgY2FuIGNoYW5nZSB0aGlzIHRvIGEgZGlyZWN0aXZlXG4vLyBpZiBhbmd1bGFyIGFkZHMgc3VwcG9ydCBmb3IgYGV4cG9ydEFzOiAnJGltcGxpY2l0J2Agb24gZGlyZWN0aXZlcy5cbi8qKiBDb21wb25lbnQgcmVzcG9uc2libGUgZm9yIG1hbmFnaW5nIHRoZSBkYXRlcGlja2VyIHBvcHVwL2RpYWxvZy4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1kYXRlcGlja2VyJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBleHBvcnRBczogJ21hdERhdGVwaWNrZXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0RGF0ZXBpY2tlcjxEPiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQ2FuQ29sb3Ige1xuICBwcml2YXRlIF9zY3JvbGxTdHJhdGVneTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3k7XG5cbiAgLyoqIEFuIGlucHV0IGluZGljYXRpbmcgdGhlIHR5cGUgb2YgdGhlIGN1c3RvbSBoZWFkZXIgY29tcG9uZW50IGZvciB0aGUgY2FsZW5kYXIsIGlmIHNldC4gKi9cbiAgQElucHV0KCkgY2FsZW5kYXJIZWFkZXJDb21wb25lbnQ6IENvbXBvbmVudFR5cGU8YW55PjtcblxuICAvKiogVGhlIGRhdGUgdG8gb3BlbiB0aGUgY2FsZW5kYXIgdG8gaW5pdGlhbGx5LiAqL1xuICBASW5wdXQoKVxuICBnZXQgc3RhcnRBdCgpOiBEIHwgbnVsbCB7XG4gICAgLy8gSWYgYW4gZXhwbGljaXQgc3RhcnRBdCBpcyBzZXQgd2Ugc3RhcnQgdGhlcmUsIG90aGVyd2lzZSB3ZSBzdGFydCBhdCB3aGF0ZXZlciB0aGUgY3VycmVudGx5XG4gICAgLy8gc2VsZWN0ZWQgdmFsdWUgaXMuXG4gICAgcmV0dXJuIHRoaXMuX3N0YXJ0QXQgfHwgKHRoaXMuX2RhdGVwaWNrZXJJbnB1dCA/IHRoaXMuX2RhdGVwaWNrZXJJbnB1dC52YWx1ZSA6IG51bGwpO1xuICB9XG4gIHNldCBzdGFydEF0KHZhbHVlOiBEIHwgbnVsbCkge1xuICAgIHRoaXMuX3N0YXJ0QXQgPSB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcbiAgfVxuICBwcml2YXRlIF9zdGFydEF0OiBEIHwgbnVsbDtcblxuICAvKiogVGhlIHZpZXcgdGhhdCB0aGUgY2FsZW5kYXIgc2hvdWxkIHN0YXJ0IGluLiAqL1xuICBASW5wdXQoKSBzdGFydFZpZXc6ICdtb250aCcgfCAneWVhcicgfCAnbXVsdGkteWVhcicgPSAnbW9udGgnO1xuXG4gIC8qKiBDb2xvciBwYWxldHRlIHRvIHVzZSBvbiB0aGUgZGF0ZXBpY2tlcidzIGNhbGVuZGFyLiAqL1xuICBASW5wdXQoKVxuICBnZXQgY29sb3IoKTogVGhlbWVQYWxldHRlIHtcbiAgICByZXR1cm4gdGhpcy5fY29sb3IgfHxcbiAgICAgICAgKHRoaXMuX2RhdGVwaWNrZXJJbnB1dCA/IHRoaXMuX2RhdGVwaWNrZXJJbnB1dC5fZ2V0VGhlbWVQYWxldHRlKCkgOiB1bmRlZmluZWQpO1xuICB9XG4gIHNldCBjb2xvcih2YWx1ZTogVGhlbWVQYWxldHRlKSB7XG4gICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcbiAgfVxuICBfY29sb3I6IFRoZW1lUGFsZXR0ZTtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgY2FsZW5kYXIgVUkgaXMgaW4gdG91Y2ggbW9kZS4gSW4gdG91Y2ggbW9kZSB0aGUgY2FsZW5kYXIgb3BlbnMgaW4gYSBkaWFsb2cgcmF0aGVyXG4gICAqIHRoYW4gYSBwb3B1cCBhbmQgZWxlbWVudHMgaGF2ZSBtb3JlIHBhZGRpbmcgdG8gYWxsb3cgZm9yIGJpZ2dlciB0b3VjaCB0YXJnZXRzLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHRvdWNoVWkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl90b3VjaFVpOyB9XG4gIHNldCB0b3VjaFVpKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fdG91Y2hVaSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfdG91Y2hVaSA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBkYXRlcGlja2VyIHBvcC11cCBzaG91bGQgYmUgZGlzYWJsZWQuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgPT09IHVuZGVmaW5lZCAmJiB0aGlzLl9kYXRlcGlja2VySW5wdXQgP1xuICAgICAgICB0aGlzLl9kYXRlcGlja2VySW5wdXQuZGlzYWJsZWQgOiAhIXRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcblxuICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLl9kaXNhYmxlZENoYW5nZS5uZXh0KG5ld1ZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEVtaXRzIHNlbGVjdGVkIHllYXIgaW4gbXVsdGl5ZWFyIHZpZXcuXG4gICAqIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZS5cbiAgICovXG4gIEBPdXRwdXQoKSByZWFkb25seSB5ZWFyU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxEPiA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcblxuICAvKipcbiAgICogRW1pdHMgc2VsZWN0ZWQgbW9udGggaW4geWVhciB2aWV3LlxuICAgKiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGUuXG4gICAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbW9udGhTZWxlY3RlZDogRXZlbnRFbWl0dGVyPEQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xuXG4gIC8qKiBDbGFzc2VzIHRvIGJlIHBhc3NlZCB0byB0aGUgZGF0ZSBwaWNrZXIgcGFuZWwuIFN1cHBvcnRzIHRoZSBzYW1lIHN5bnRheCBhcyBgbmdDbGFzc2AuICovXG4gIEBJbnB1dCgpIHBhbmVsQ2xhc3M6IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gIC8qKiBGdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGFkZCBjdXN0b20gQ1NTIGNsYXNzZXMgdG8gZGF0ZXMuICovXG4gIEBJbnB1dCgpIGRhdGVDbGFzczogKGRhdGU6IEQpID0+IE1hdENhbGVuZGFyQ2VsbENzc0NsYXNzZXM7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGRhdGVwaWNrZXIgaGFzIGJlZW4gb3BlbmVkLiAqL1xuICBAT3V0cHV0KCdvcGVuZWQnKSBvcGVuZWRTdHJlYW06IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogRW1pdHMgd2hlbiB0aGUgZGF0ZXBpY2tlciBoYXMgYmVlbiBjbG9zZWQuICovXG4gIEBPdXRwdXQoJ2Nsb3NlZCcpIGNsb3NlZFN0cmVhbTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNhbGVuZGFyIGlzIG9wZW4uICovXG4gIEBJbnB1dCgpXG4gIGdldCBvcGVuZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9vcGVuZWQ7IH1cbiAgc2V0IG9wZW5lZCh2YWx1ZTogYm9vbGVhbikgeyB2YWx1ZSA/IHRoaXMub3BlbigpIDogdGhpcy5jbG9zZSgpOyB9XG4gIHByaXZhdGUgX29wZW5lZCA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgaWQgZm9yIHRoZSBkYXRlcGlja2VyIGNhbGVuZGFyLiAqL1xuICBpZDogc3RyaW5nID0gYG1hdC1kYXRlcGlja2VyLSR7ZGF0ZXBpY2tlclVpZCsrfWA7XG5cbiAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZS4gKi9cbiAgZ2V0IF9zZWxlY3RlZCgpOiBEIHwgbnVsbCB7IHJldHVybiB0aGlzLl92YWxpZFNlbGVjdGVkOyB9XG4gIHNldCBfc2VsZWN0ZWQodmFsdWU6IEQgfCBudWxsKSB7IHRoaXMuX3ZhbGlkU2VsZWN0ZWQgPSB2YWx1ZTsgfVxuICBwcml2YXRlIF92YWxpZFNlbGVjdGVkOiBEIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgZ2V0IF9taW5EYXRlKCk6IEQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0ZXBpY2tlcklucHV0ICYmIHRoaXMuX2RhdGVwaWNrZXJJbnB1dC5taW47XG4gIH1cblxuICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICBnZXQgX21heERhdGUoKTogRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9kYXRlcGlja2VySW5wdXQgJiYgdGhpcy5fZGF0ZXBpY2tlcklucHV0Lm1heDtcbiAgfVxuXG4gIGdldCBfZGF0ZUZpbHRlcigpOiAoZGF0ZTogRCB8IG51bGwpID0+IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kYXRlcGlja2VySW5wdXQgJiYgdGhpcy5fZGF0ZXBpY2tlcklucHV0Ll9kYXRlRmlsdGVyO1xuICB9XG5cbiAgLyoqIEEgcmVmZXJlbmNlIHRvIHRoZSBvdmVybGF5IHdoZW4gdGhlIGNhbGVuZGFyIGlzIG9wZW5lZCBhcyBhIHBvcHVwLiAqL1xuICBfcG9wdXBSZWY6IE92ZXJsYXlSZWY7XG5cbiAgLyoqIEEgcmVmZXJlbmNlIHRvIHRoZSBkaWFsb2cgd2hlbiB0aGUgY2FsZW5kYXIgaXMgb3BlbmVkIGFzIGEgZGlhbG9nLiAqL1xuICBwcml2YXRlIF9kaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxNYXREYXRlcGlja2VyQ29udGVudDxEPj4gfCBudWxsO1xuXG4gIC8qKiBBIHBvcnRhbCBjb250YWluaW5nIHRoZSBjYWxlbmRhciBmb3IgdGhpcyBkYXRlcGlja2VyLiAqL1xuICBwcml2YXRlIF9jYWxlbmRhclBvcnRhbDogQ29tcG9uZW50UG9ydGFsPE1hdERhdGVwaWNrZXJDb250ZW50PEQ+PjtcblxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjb21wb25lbnQgaW5zdGFudGlhdGVkIGluIHBvcHVwIG1vZGUuICovXG4gIHByaXZhdGUgX3BvcHVwQ29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8TWF0RGF0ZXBpY2tlckNvbnRlbnQ8RD4+IHwgbnVsbDtcblxuICAvKiogVGhlIGVsZW1lbnQgdGhhdCB3YXMgZm9jdXNlZCBiZWZvcmUgdGhlIGRhdGVwaWNrZXIgd2FzIG9wZW5lZC4gKi9cbiAgcHJpdmF0ZSBfZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBTdWJzY3JpcHRpb24gdG8gdmFsdWUgY2hhbmdlcyBpbiB0aGUgYXNzb2NpYXRlZCBpbnB1dCBlbGVtZW50LiAqL1xuICBwcml2YXRlIF9pbnB1dFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKiogVGhlIGlucHV0IGVsZW1lbnQgdGhpcyBkYXRlcGlja2VyIGlzIGFzc29jaWF0ZWQgd2l0aC4gKi9cbiAgX2RhdGVwaWNrZXJJbnB1dDogTWF0RGF0ZXBpY2tlcklucHV0PEQ+O1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBkYXRlcGlja2VyIGlzIGRpc2FibGVkLiAqL1xuICByZWFkb25seSBfZGlzYWJsZWRDaGFuZ2UgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIC8qKiBFbWl0cyBuZXcgc2VsZWN0ZWQgZGF0ZSB3aGVuIHNlbGVjdGVkIGRhdGUgY2hhbmdlcy4gKi9cbiAgcmVhZG9ubHkgX3NlbGVjdGVkQ2hhbmdlZCA9IG5ldyBTdWJqZWN0PEQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGlhbG9nOiBNYXREaWFsb2csXG4gICAgICAgICAgICAgIHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgICAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICBASW5qZWN0KE1BVF9EQVRFUElDS0VSX1NDUk9MTF9TVFJBVEVHWSkgc2Nyb2xsU3RyYXRlZ3k6IGFueSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55KSB7XG4gICAgaWYgKCF0aGlzLl9kYXRlQWRhcHRlcikge1xuICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ0RhdGVBZGFwdGVyJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kgPSBzY3JvbGxTdHJhdGVneTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgICB0aGlzLl9pbnB1dFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Rpc2FibGVkQ2hhbmdlLmNvbXBsZXRlKCk7XG5cbiAgICBpZiAodGhpcy5fcG9wdXBSZWYpIHtcbiAgICAgIHRoaXMuX3BvcHVwUmVmLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuX3BvcHVwQ29tcG9uZW50UmVmID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKiogU2VsZWN0cyB0aGUgZ2l2ZW4gZGF0ZSAqL1xuICBzZWxlY3QoZGF0ZTogRCk6IHZvaWQge1xuICAgIGxldCBvbGRWYWx1ZSA9IHRoaXMuX3NlbGVjdGVkO1xuICAgIHRoaXMuX3NlbGVjdGVkID0gZGF0ZTtcbiAgICBpZiAoIXRoaXMuX2RhdGVBZGFwdGVyLnNhbWVEYXRlKG9sZFZhbHVlLCB0aGlzLl9zZWxlY3RlZCkpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkQ2hhbmdlZC5uZXh0KGRhdGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBFbWl0cyB0aGUgc2VsZWN0ZWQgeWVhciBpbiBtdWx0aXllYXIgdmlldyAqL1xuICBfc2VsZWN0WWVhcihub3JtYWxpemVkWWVhcjogRCk6IHZvaWQge1xuICAgIHRoaXMueWVhclNlbGVjdGVkLmVtaXQobm9ybWFsaXplZFllYXIpO1xuICB9XG5cbiAgLyoqIEVtaXRzIHNlbGVjdGVkIG1vbnRoIGluIHllYXIgdmlldyAqL1xuICBfc2VsZWN0TW9udGgobm9ybWFsaXplZE1vbnRoOiBEKTogdm9pZCB7XG4gICAgdGhpcy5tb250aFNlbGVjdGVkLmVtaXQobm9ybWFsaXplZE1vbnRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbiBpbnB1dCB3aXRoIHRoaXMgZGF0ZXBpY2tlci5cbiAgICogQHBhcmFtIGlucHV0IFRoZSBkYXRlcGlja2VyIGlucHV0IHRvIHJlZ2lzdGVyIHdpdGggdGhpcyBkYXRlcGlja2VyLlxuICAgKi9cbiAgX3JlZ2lzdGVySW5wdXQoaW5wdXQ6IE1hdERhdGVwaWNrZXJJbnB1dDxEPik6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kYXRlcGlja2VySW5wdXQpIHtcbiAgICAgIHRocm93IEVycm9yKCdBIE1hdERhdGVwaWNrZXIgY2FuIG9ubHkgYmUgYXNzb2NpYXRlZCB3aXRoIGEgc2luZ2xlIGlucHV0LicpO1xuICAgIH1cbiAgICB0aGlzLl9kYXRlcGlja2VySW5wdXQgPSBpbnB1dDtcbiAgICB0aGlzLl9pbnB1dFN1YnNjcmlwdGlvbiA9XG4gICAgICAgIHRoaXMuX2RhdGVwaWNrZXJJbnB1dC5fdmFsdWVDaGFuZ2Uuc3Vic2NyaWJlKCh2YWx1ZTogRCB8IG51bGwpID0+IHRoaXMuX3NlbGVjdGVkID0gdmFsdWUpO1xuICB9XG5cbiAgLyoqIE9wZW4gdGhlIGNhbGVuZGFyLiAqL1xuICBvcGVuKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vcGVuZWQgfHwgdGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuX2RhdGVwaWNrZXJJbnB1dCkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0F0dGVtcHRlZCB0byBvcGVuIGFuIE1hdERhdGVwaWNrZXIgd2l0aCBubyBhc3NvY2lhdGVkIGlucHV0LicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZG9jdW1lbnQpIHtcbiAgICAgIHRoaXMuX2ZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbiA9IHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgdGhpcy50b3VjaFVpID8gdGhpcy5fb3BlbkFzRGlhbG9nKCkgOiB0aGlzLl9vcGVuQXNQb3B1cCgpO1xuICAgIHRoaXMuX29wZW5lZCA9IHRydWU7XG4gICAgdGhpcy5vcGVuZWRTdHJlYW0uZW1pdCgpO1xuICB9XG5cbiAgLyoqIENsb3NlIHRoZSBjYWxlbmRhci4gKi9cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9vcGVuZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3BvcHVwUmVmICYmIHRoaXMuX3BvcHVwUmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgIHRoaXMuX3BvcHVwUmVmLmRldGFjaCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZGlhbG9nUmVmKSB7XG4gICAgICB0aGlzLl9kaWFsb2dSZWYuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2RpYWxvZ1JlZiA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLl9jYWxlbmRhclBvcnRhbCAmJiB0aGlzLl9jYWxlbmRhclBvcnRhbC5pc0F0dGFjaGVkKSB7XG4gICAgICB0aGlzLl9jYWxlbmRhclBvcnRhbC5kZXRhY2goKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wbGV0ZUNsb3NlID0gKCkgPT4ge1xuICAgICAgLy8gVGhlIGBfb3BlbmVkYCBjb3VsZCd2ZSBiZWVuIHJlc2V0IGFscmVhZHkgaWZcbiAgICAgIC8vIHdlIGdvdCB0d28gZXZlbnRzIGluIHF1aWNrIHN1Y2Nlc3Npb24uXG4gICAgICBpZiAodGhpcy5fb3BlbmVkKSB7XG4gICAgICAgIHRoaXMuX29wZW5lZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNsb3NlZFN0cmVhbS5lbWl0KCk7XG4gICAgICAgIHRoaXMuX2ZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbiA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0aGlzLl9mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4gJiZcbiAgICAgIHR5cGVvZiB0aGlzLl9mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4uZm9jdXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEJlY2F1c2UgSUUgbW92ZXMgZm9jdXMgYXN5bmNocm9ub3VzbHksIHdlIGNhbid0IGNvdW50IG9uIGl0IGJlaW5nIHJlc3RvcmVkIGJlZm9yZSB3ZSd2ZVxuICAgICAgLy8gbWFya2VkIHRoZSBkYXRlcGlja2VyIGFzIGNsb3NlZC4gSWYgdGhlIGV2ZW50IGZpcmVzIG91dCBvZiBzZXF1ZW5jZSBhbmQgdGhlIGVsZW1lbnQgdGhhdFxuICAgICAgLy8gd2UncmUgcmVmb2N1c2luZyBvcGVucyB0aGUgZGF0ZXBpY2tlciBvbiBmb2N1cywgdGhlIHVzZXIgY291bGQgYmUgc3R1Y2sgd2l0aCBub3QgYmVpbmdcbiAgICAgIC8vIGFibGUgdG8gY2xvc2UgdGhlIGNhbGVuZGFyIGF0IGFsbC4gV2Ugd29yayBhcm91bmQgaXQgYnkgbWFraW5nIHRoZSBsb2dpYywgdGhhdCBtYXJrc1xuICAgICAgLy8gdGhlIGRhdGVwaWNrZXIgYXMgY2xvc2VkLCBhc3luYyBhcyB3ZWxsLlxuICAgICAgdGhpcy5fZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuLmZvY3VzKCk7XG4gICAgICBzZXRUaW1lb3V0KGNvbXBsZXRlQ2xvc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21wbGV0ZUNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIE9wZW4gdGhlIGNhbGVuZGFyIGFzIGEgZGlhbG9nLiAqL1xuICBwcml2YXRlIF9vcGVuQXNEaWFsb2coKTogdm9pZCB7XG4gICAgLy8gVXN1YWxseSB0aGlzIHdvdWxkIGJlIGhhbmRsZWQgYnkgYG9wZW5gIHdoaWNoIGVuc3VyZXMgdGhhdCB3ZSBjYW4gb25seSBoYXZlIG9uZSBvdmVybGF5XG4gICAgLy8gb3BlbiBhdCBhIHRpbWUsIGhvd2V2ZXIgc2luY2Ugd2UgcmVzZXQgdGhlIHZhcmlhYmxlcyBpbiBhc3luYyBoYW5kbGVycyBzb21lIG92ZXJsYXlzXG4gICAgLy8gbWF5IHNsaXAgdGhyb3VnaCBpZiB0aGUgdXNlciBvcGVucyBhbmQgY2xvc2VzIG11bHRpcGxlIHRpbWVzIGluIHF1aWNrIHN1Y2Nlc3Npb24gKGUuZy5cbiAgICAvLyBieSBob2xkaW5nIGRvd24gdGhlIGVudGVyIGtleSkuXG4gICAgaWYgKHRoaXMuX2RpYWxvZ1JlZikge1xuICAgICAgdGhpcy5fZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fZGlhbG9nUmVmID0gdGhpcy5fZGlhbG9nLm9wZW48TWF0RGF0ZXBpY2tlckNvbnRlbnQ8RD4+KE1hdERhdGVwaWNrZXJDb250ZW50LCB7XG4gICAgICBkaXJlY3Rpb246IHRoaXMuX2RpciA/IHRoaXMuX2Rpci52YWx1ZSA6ICdsdHInLFxuICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy5fdmlld0NvbnRhaW5lclJlZixcbiAgICAgIHBhbmVsQ2xhc3M6ICdtYXQtZGF0ZXBpY2tlci1kaWFsb2cnLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgdGhpcy5fZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmRhdGVwaWNrZXIgPSB0aGlzO1xuICAgIHRoaXMuX3NldENvbG9yKCk7XG4gIH1cblxuICAvKiogT3BlbiB0aGUgY2FsZW5kYXIgYXMgYSBwb3B1cC4gKi9cbiAgcHJpdmF0ZSBfb3BlbkFzUG9wdXAoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9jYWxlbmRhclBvcnRhbCkge1xuICAgICAgdGhpcy5fY2FsZW5kYXJQb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsPE1hdERhdGVwaWNrZXJDb250ZW50PEQ+PihNYXREYXRlcGlja2VyQ29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9wb3B1cFJlZikge1xuICAgICAgdGhpcy5fY3JlYXRlUG9wdXAoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX3BvcHVwUmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgIHRoaXMuX3BvcHVwQ29tcG9uZW50UmVmID0gdGhpcy5fcG9wdXBSZWYuYXR0YWNoKHRoaXMuX2NhbGVuZGFyUG9ydGFsKTtcbiAgICAgIHRoaXMuX3BvcHVwQ29tcG9uZW50UmVmLmluc3RhbmNlLmRhdGVwaWNrZXIgPSB0aGlzO1xuICAgICAgdGhpcy5fc2V0Q29sb3IoKTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSBwb3NpdGlvbiBvbmNlIHRoZSBjYWxlbmRhciBoYXMgcmVuZGVyZWQuXG4gICAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKCkucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl9wb3B1cFJlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIENyZWF0ZSB0aGUgcG9wdXAuICovXG4gIHByaXZhdGUgX2NyZWF0ZVBvcHVwKCk6IHZvaWQge1xuICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLl9jcmVhdGVQb3B1cFBvc2l0aW9uU3RyYXRlZ3koKSxcbiAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgYmFja2Ryb3BDbGFzczogJ21hdC1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wJyxcbiAgICAgIGRpcmVjdGlvbjogdGhpcy5fZGlyLFxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuX3Njcm9sbFN0cmF0ZWd5KCksXG4gICAgICBwYW5lbENsYXNzOiAnbWF0LWRhdGVwaWNrZXItcG9wdXAnLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fcG9wdXBSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZShvdmVybGF5Q29uZmlnKTtcbiAgICB0aGlzLl9wb3B1cFJlZi5vdmVybGF5RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnZGlhbG9nJyk7XG5cbiAgICBtZXJnZShcbiAgICAgIHRoaXMuX3BvcHVwUmVmLmJhY2tkcm9wQ2xpY2soKSxcbiAgICAgIHRoaXMuX3BvcHVwUmVmLmRldGFjaG1lbnRzKCksXG4gICAgICB0aGlzLl9wb3B1cFJlZi5rZXlkb3duRXZlbnRzKCkucGlwZShmaWx0ZXIoZXZlbnQgPT4ge1xuICAgICAgICAvLyBDbG9zaW5nIG9uIGFsdCArIHVwIGlzIG9ubHkgdmFsaWQgd2hlbiB0aGVyZSdzIGFuIGlucHV0IGFzc29jaWF0ZWQgd2l0aCB0aGUgZGF0ZXBpY2tlci5cbiAgICAgICAgcmV0dXJuIGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSB8fFxuICAgICAgICAgICAgICAgKHRoaXMuX2RhdGVwaWNrZXJJbnB1dCAmJiBldmVudC5hbHRLZXkgJiYgZXZlbnQua2V5Q29kZSA9PT0gVVBfQVJST1cpO1xuICAgICAgfSkpXG4gICAgKS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBDcmVhdGUgdGhlIHBvcHVwIFBvc2l0aW9uU3RyYXRlZ3kuICovXG4gIHByaXZhdGUgX2NyZWF0ZVBvcHVwUG9zaXRpb25TdHJhdGVneSgpOiBQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICByZXR1cm4gdGhpcy5fb3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLl9kYXRlcGlja2VySW5wdXQuZ2V0Q29ubmVjdGVkT3ZlcmxheU9yaWdpbigpKVxuICAgICAgLndpdGhUcmFuc2Zvcm1PcmlnaW5PbignLm1hdC1kYXRlcGlja2VyLWNvbnRlbnQnKVxuICAgICAgLndpdGhGbGV4aWJsZURpbWVuc2lvbnMoZmFsc2UpXG4gICAgICAud2l0aFZpZXdwb3J0TWFyZ2luKDgpXG4gICAgICAud2l0aExvY2tlZFBvc2l0aW9uKClcbiAgICAgIC53aXRoUG9zaXRpb25zKFtcbiAgICAgICAge1xuICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgb3ZlcmxheVk6ICd0b3AnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgb3JpZ2luWDogJ2VuZCcsXG4gICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgICAgIG92ZXJsYXlZOiAndG9wJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgb3JpZ2luWDogJ2VuZCcsXG4gICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xuICAgICAgICB9XG4gICAgICBdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIFRoZSBnaXZlbiBvYmplY3QgaWYgaXQgaXMgYm90aCBhIGRhdGUgaW5zdGFuY2UgYW5kIHZhbGlkLCBvdGhlcndpc2UgbnVsbC5cbiAgICovXG4gIHByaXZhdGUgX2dldFZhbGlkRGF0ZU9yTnVsbChvYmo6IGFueSk6IEQgfCBudWxsIHtcbiAgICByZXR1cm4gKHRoaXMuX2RhdGVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiYgdGhpcy5fZGF0ZUFkYXB0ZXIuaXNWYWxpZChvYmopKSA/IG9iaiA6IG51bGw7XG4gIH1cblxuICAvKiogUGFzc2VzIHRoZSBjdXJyZW50IHRoZW1lIGNvbG9yIGFsb25nIHRvIHRoZSBjYWxlbmRhciBvdmVybGF5LiAqL1xuICBwcml2YXRlIF9zZXRDb2xvcigpOiB2b2lkIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMuY29sb3I7XG4gICAgaWYgKHRoaXMuX3BvcHVwQ29tcG9uZW50UmVmKSB7XG4gICAgICB0aGlzLl9wb3B1cENvbXBvbmVudFJlZi5pbnN0YW5jZS5jb2xvciA9IGNvbG9yO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZGlhbG9nUmVmKSB7XG4gICAgICB0aGlzLl9kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuY29sb3IgPSBjb2xvcjtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IGJvb2xlYW4gfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdG91Y2hVaTogYm9vbGVhbiB8IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ7XG59XG4iXX0=