"use strict";
//import {Application} from "pixi.js";
exports.__esModule = true;
console.log(Menu);
var app = new Application({ width: 640, height: 360 });
document.body.appendChild(app.view);
var Menu = new Menu();
app.stage.addChild(Menu.container);
