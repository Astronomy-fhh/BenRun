import {
    Common
} from './common';

const fromInScene = -1
const inScene = 0
const outScene = 1

const baseBulletNum = 1


class Active {
    constructor(x, y) {
        this.bulletNum = baseBulletNum
        this.scene = new Scene(x, y)
        this.bullets = new Array()
    }

    start() {
        this.initBullet()
    }

    move(){
        for (const key in this.bullets) {
            this.bullets[key].move()
        }
    }

    draw(ctx){
        for (const key in this.bullets) {
            this.bullets[key].draw(ctx)
        }
    }

    initBullet() {
        for (let i = 0; i < this.bulletNum; i++) {
            this.bullets[i] = Stone.newStone(i, this.scene)
        }
    }

    static newActive(x, y) {
        return new Active(x, y)
    }
}

class Scene {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class ActiveObj {

    constructor(id, xSize, ySize, startX, startY, xSpeed, ySpeed, scene) {
        this.id = id
        this.satrtX = startX
        this.startY = startY
        this.x = startX
        this.y = startY
        this.xSpeed = xSpeed
        this.ySpeed = ySpeed
        this.moveMoment = Common.getMoment()
        this.xSize = xSize
        this.ySize = ySize
        this.scene = scene
        this.isInScene = fromInScene
    }


    draw(ctx){

    }


    move() {
        let nm = Common.getMoment()
        this.x += (nm - this.moveMoment) * this.xSpeed
        this.y += (nm - this.moveMoment) * this.ySpeed
        this.moveMoment = nm
        this.checkIn()
        this.checkOut()
    }

    checkIn() {
        if (this.isInScene == fromInScene && this.x > 0 && this.x < this.scene.x && this.y > 0 && this.y < this.scene.y) {
            this.isInScene = 0
        }
    }

    checkOut() {
        if (this.isInScene == inScene && (this.x < 0 || this.x > this.scene.x || this.y < 0 || this.y > this.scene.y)) {
            this.isInScene = outScene
            this.outDo()
        }
    }

    outDo() {
        this.x = this.satrtX
        this.y = this.startY
        this.isInScene = fromInScene
    }

    collision() {}
    draw(ctx) {}
}


class Stone extends ActiveObj {
    constructor(id, xSize, ySize, startX, startY, xSpeed, ySpeed, scene, color) {
        super(id, xSize, ySize, startX, startY, xSpeed, ySpeed, scene)
        this.color = color
        this.upPlayer = 0
    }


    draw(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x - this.xSize / 2, this.y - this.ySize / 2, this.xSize, this.ySize)
    }

    

    static newStone(id, scene) {
        let xSize = Common.rangeRand(80,80)
        let ySize = xSize
        let x = Common.rangeRand(xSize,scene.x-xSize)
        let y = Common.rangeRand(scene.y,scene.y - 100)
        let xSpeed = 0
        let ySpeed = -Common.rangeRand(0.1, 0.2)
        let color = Common.randColor()

        return new Stone(id, xSize,ySize,200,500,xSpeed,0, scene, color)
    }
}


export {
    Active
}