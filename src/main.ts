import {Application, TextStyle, Text} from "pixi.js";

import Menu from "./Menu";

// Initiate App
let app = new Application({ width: 360, height: 800 });
document.body.appendChild(app.view);

// Scale to fullscreen
const factor = Math.min(
    window.innerWidth / app.screen.width,
    window.innerHeight / app.screen.height
);

app.view.style.height = Math.round(app.screen.height*factor) + 'px';
app.view.style.width = Math.round(app.screen.width*factor) + 'px';


// Initiate menu
let menu = new Menu(app);
app.stage.addChild(menu.container);

// Add frame counter
const style = new TextStyle({ fill: 'white', fontSize: '10px' });
const fpsDisplay = new Text('0', style);
fpsDisplay.position.set(5,5);
app.stage.addChild(fpsDisplay);

let lastUpdate = Math.floor(performance.now()/1000) * 1000;
let frames = 0;

app.ticker.add(() => {
    const now = performance.now();
    frames++;

    if(now - lastUpdate >= 1000) {
        fpsDisplay.text = frames + ' fps';
        lastUpdate = Math.floor(now/1000) * 1000;;
        frames = 0;
    }
});
