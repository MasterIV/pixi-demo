import {Sprite, Point} from "pixi.js";


const frames = 120.0;

export default class CardAnimation {
    sprite: Sprite = null;
    elapsed: number;
    src: Point;
    dst: Point;

    constructor(sprite: Sprite, dst: Point) {
        this.sprite = sprite;
        this.src = sprite.position.clone();
        this.dst = dst;
        this.elapsed = 0.0
    }

    icComplete(): boolean {
        return this.sprite == null;
    }

    update(delta: number) {
        this.elapsed += delta;

        if(this.elapsed >= frames) {
            // complete animation
            this.sprite.position = this.dst;
            this.sprite = null;
        } else {
            // update animation
            const factor = this.elapsed / frames;
            const offsetY = Math.sin(Math.PI * factor) * -150;

            this.sprite.position.set(
                this.src.x + (this.dst.x - this.src.x) * factor,
                this.src.y + (this.dst.y - this.src.y) * factor + offsetY
            )
        }
    }
}
