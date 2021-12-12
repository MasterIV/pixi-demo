import {Application, Container, Loader, TextStyle} from "pixi.js";
import config from './config';
import TextImage from './TextImage';

const frames = 120;

export default class TextDemo {
    elapsed: number = frames;
    container: Container = new Container();
    element: TextImage;


    constructor(app: Application) {
        this.container.position.x = app.screen.width / 2;
        this.container.position.y = app.screen.height / 2;
    }

    static load(callback: any) {
        const loader = new Loader();

        config
            .filter(e => e.type === 'image')
            .forEach(e => loader.add(e.url, e.url));

        loader.load((loader, resources) => {
            config
                .filter(e => e.type === 'image')
                .forEach(e => e.texture = resources[e.url].texture);
            callback();
        });
    }

    update(delta) {
        this.elapsed += delta;

        if(this.elapsed > frames) {
            if(this.element) this.element.container.destroy();
            this.element = new TextImage(this.randomConfig(), 10);
            this.container.addChild(this.element.container);
            this.elapsed = 0;
        }
    }

    private randomConfig() {
        const result = [];

        for(let i=0;i < 3;i++) {
            let ele = config[Math.floor(Math.random()*config.length)];

            if(ele.type == 'text') {
                ele.style = new TextStyle({
                    fontSize: Math.round(10+Math.random()*30),
                    fill: 'white',
                });
            }

            result.push(ele);
        }

        return result;
    }
}
