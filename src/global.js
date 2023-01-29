
import {
    Common
} from './common';

const scoreMultiBase = 0.01

class Global {
    constructor(winWidth, winHeight, player) {
        this.startTime = Common.getMoment()
        this.winWidth = winWidth
        this.winHeight = winHeight
        this.score = 0
        this.scoreMultiBase = scoreMultiBase
        this.player = player
    }

    frame(ctx){
        this.updateScore()
        ctx.fillStyle = '#000000'
        ctx.font = `${parseInt(this.winWidth/30)}px Arial`
        ctx.fillText(`得分:${parseInt(this.score)} | 玩家位置:x:${parseInt(this.player.x)} y:${parseInt(this.player.y)}`, 50,100)    
    }

    updateScore(){
        let now = Common.getMoment()
        this.score = (now - this.startTime)*this.scoreMultiBase
    }

    static newGlobal(winWidth, winHeight, player) {
        return new Global(winWidth, winHeight, player)
    }
}

export {
    Global
}