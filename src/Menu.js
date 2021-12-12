"use strict";
exports.__esModule = true;
var pixi_js_1 = require("pixi.js");
var Menu = /** @class */ (function () {
    function Menu() {
        var _this = this;
        this.container = new pixi_js_1.Container();
        var offset = 0;
        [
            { label: 'Cards Demo', handler: this.startCardsDemo },
            { label: 'Text Demo', handler: this.startTextDemo },
            { label: 'Fire Demo', handler: this.startFireDemo },
        ].forEach(function (_a) {
            var label = _a.label, handler = _a.handler;
            var buttonSprite = new pixi_js_1.Sprite('img/button.png');
            buttonSprite.position.y = offset;
            buttonSprite.on('click', handler);
            _this.container.addChild(buttonSprite);
            var buttonText = new pixi_js_1.Text('Fire Demo');
            _this.container.addChild(buttonText);
            buttonSprite.position.y = offset + 20;
            buttonSprite.position.x = 50;
            offset += 200;
        });
    }
    Menu.prototype.startFireDemo = function () {
        this.container.destroy();
    };
    Menu.prototype.startCardsDemo = function () {
        this.container.destroy();
    };
    Menu.prototype.startTextDemo = function () {
        this.container.destroy();
    };
    return Menu;
}());
exports["default"] = Menu;
