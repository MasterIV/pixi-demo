import {Container, Sprite, Text, TextMetrics} from "pixi.js";

export default class TextImage {
    container: Container = new Container();

    constructor(elements: any[], spacing: number) {
        let width = 0;
        let height = 0;

        const children = elements.map(e => e.type == 'text' ? new Text(e.text, e.style) : new Sprite(e.texture));

        children.forEach(e => {
            this.container.addChild(e);
            if (e.height > height) height = e.height;

            e.position.x = width;
            width += e.width + spacing;
        });

        children.forEach(e => e.position.y = (height - e.height) / 2);
        this.container.position.x = (width-spacing)/-2;
        this.container.position.y = height/-2;
    }
}
