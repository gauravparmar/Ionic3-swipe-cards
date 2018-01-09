"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var swing_stack_component_1 = require("./swing-stack-component");
var SwingCardComponent = (function () {
    function SwingCardComponent(elmentRef, swingStack) {
        this.elmentRef = elmentRef;
        this.swingStack = swingStack;
        this.prepend = false;
    }
    SwingCardComponent.prototype.ngOnInit = function () {
        this.swingStack.addCard(this, this.prepend);
    };
    SwingCardComponent.prototype.getElementRef = function () {
        return this.elmentRef;
    };
    SwingCardComponent.prototype.getNativeElement = function () {
        return this.elmentRef.nativeElement;
    };
    SwingCardComponent.prototype.getCard = function () {
        return this.swingStack.stack.getCard(this.getNativeElement());
    };
    SwingCardComponent.prototype.destroyCard = function () {
        var _this = this;
        this.swingStack.cards = this.swingStack.cards.filter(function (swingCardComponent) { return swingCardComponent !== _this; });
        var card = this.swingStack.stack.getCard(this.getNativeElement());
        this.swingStack.stack.destroyCard(card);
    };
    return SwingCardComponent;
}());
SwingCardComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: '[swing-card]',
                template: "\n    <ng-content></ng-content>\n  "
            },] },
];
/** @nocollapse */
SwingCardComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: swing_stack_component_1.SwingStackComponent, },
]; };
SwingCardComponent.propDecorators = {
    'prepend': [{ type: core_1.Input },],
};
exports.SwingCardComponent = SwingCardComponent;
//# sourceMappingURL=swing-card-component.js.map