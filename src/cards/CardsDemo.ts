import {Application, Container, Sprite, Point, Texture} from "pixi.js";

import CardAnimation from './CardAnimation';

const cardWidth = 64;

export default class CardsDemo {
    elapsed: number = 0.0;

    container: Container = new Container();
    animations: CardAnimation[] = [];

    stackOne: Sprite[] = [];
    stackTwo: Sprite[] = [];

    constructor(app: Application) {
        this.container.position.x = app.screen.width/2 - cardWidth*1.5;
        this.container.position.y = app.screen.height - 10;

        const texture = Texture.from('img/card.png');

        for(let i = 0; i < 144; i++) {
            let card = new Sprite(texture);
            card.anchor.set(0,1);
            card.position.y = -3 * i;

            this.stackOne.push(card);
            this.container.addChild(card);
        }
    }

    next() {
        const card = this.stackOne.pop();
        const dstX = card.position.x > 0 ? 0 : cardWidth*2;

        this.container.removeChild(card);
        this.container.addChild(card);
        this.stackTwo.push(card);

        this.animations.push(new CardAnimation(card, new Point(dstX, -3*this.stackTwo.length)));
    }

    update(delta) {
        this.elapsed += delta;
        this.animations = this.animations.filter(a => !a.icComplete());
        this.animations.forEach(a => a.update(delta));

        if(this.elapsed >= 60) {
            if(this.stackOne.length) {
                this.elapsed = 0;
                this.next();
            } else if(!this.animations.length) {
                // swap stacks
                [this.stackOne, this.stackTwo] = [this.stackTwo, this.stackOne]
            }
        }
    }
}
