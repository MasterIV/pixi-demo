import {Application, Text, TextStyle, Container, Sprite, Texture} from "pixi.js";

import FireDemo from './fire/FireDemo';
import CardsDemo from './cards/CardsDemo';
import TextDemo from './text/TextDemo';

interface Scene {
    container: Container;
    update(delta: number);
}

export default class Menu {
    app: Application;
    container: Container;

    constructor(app: Application) {
        this.app = app;

        this.container = new Container();
        this.container.position.x = app.screen.width / 2 - 150;
        this.container.position.y = 200;

        const texture = Texture.from('img/button.png');
        const style = new TextStyle({fill: 'white'});

        let offset = 30;

        [
            {label: 'Cards Demo', handler: this.startCardsDemo.bind(this)},
            {label: 'Text Demo', handler: this.startTextDemo.bind(this)},
            {label: 'Fire Demo', handler: this.startFireDemo.bind(this)},
        ].forEach(({label, handler}) => {
            const buttonSprite = new Sprite(texture);
            buttonSprite.position.y = offset;

            buttonSprite.interactive = true;
            buttonSprite.buttonMode = true;
            buttonSprite.on('pointerup', handler);

            const buttonText = new Text(label, style);
            buttonText.position.x = 50;
            buttonText.position.y = offset + 23;

            this.container.addChild(buttonSprite);
            this.container.addChild(buttonText);

            offset += 100;
        });
    }

    showDemo(demo: Scene) {
        this.container.destroy();
        this.app.stage.addChild(demo.container);
        this.app.ticker.add(demo.update.bind(demo));
    }

    startFireDemo() {
        this.showDemo(new FireDemo(this.app));
    }

    startCardsDemo() {
        this.showDemo(new CardsDemo(this.app));
    }

    startTextDemo() {
        TextDemo.load(() => this.showDemo(new TextDemo(this.app)));
    }
}
