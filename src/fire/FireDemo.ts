import {Application, Container, Sprite} from "pixi.js";

import {Emitter, EmitterConfigV3} from "@pixi/particle-emitter";

export default class FireDemo {
    container: Container = new Container();
    emitter: Emitter;

    constructor(app: Application) {
        const camp = Sprite.from('img/campfire.png');
        camp.anchor.set(.5);
        camp.position.set(app.screen.width / 2, app.screen.height / 2);
        this.container.addChild(camp);

        const config: EmitterConfigV3 = {
            lifetime: {min: .8, max: 1},
            frequency: .08,
            pos: {x: app.screen.width / 2, y: app.screen.height / 2 + 15},
            maxParticles: 10,
            behaviors: []
        };

        config.behaviors.push({
            type: 'textureRandom',
            config: {
                textures: ["img/flame1.png", "img/flame2.png", "img/flame3.png"]
            }
        });

        config.behaviors.push({
            type: "rotationStatic",
            config: { min: 260, max: 290, }
        });

        config.behaviors.push({
            type: 'moveSpeedStatic',
            config: { min: 180, max: 220 }
        });

        config.behaviors.push({
            type: 'alpha',
            config: {
                alpha: {
                    list: [
                        {value: .2, time: 0},
                        {value: 1, time: 0.25},
                        {value: 0, time: 1}]
                },
            }
        });

        config.behaviors.push({
            type: 'scale',
            config: {
                scale: {
                    list: [{value: 1, time: 0}, {value: 1.5, time: 0.15}, {value: .5, time: 1}],
                    isStepped: true
                },
                minMult: .8
            }
        });

        config.behaviors.push({
            type: 'spawnShape',
            config: {
                type: 'rect',
                data: { x: -40, y: 0, w: 80, h: 10,}
            }
        });

        this.emitter = new Emitter(this.container, config);
    }

    update(delta) {
        this.emitter.update(delta / 60);
    }
}
