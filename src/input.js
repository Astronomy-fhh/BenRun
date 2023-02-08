let touchDriveSensitivity = 10
let touchStartX = 0
let touchStartY = 0
let touchEndX = 0
let touchEndY = 0
let jumpSensitivity = 10

class TouchInput {

    static startListening(player) {

        tt.onTouchMove(function (res) {
            let nTouchMoveX = res.changedTouches[0].screenX
            let nTouchMoveY = res.changedTouches[0].screenY
        
            player.changeXSpeed(nTouchMoveX - touchStartX > 0 ? 1 : -1)

            if(nTouchMoveY - touchStartY < -jumpSensitivity){
                player.jump()
            }

            touchStartX = nTouchMoveX
            touchStartY = nTouchMoveY
        })

        tt.onTouchStart(function (res) {
            touchStartX = res.changedTouches[0].screenX
            touchStartY = res.changedTouches[0].screenY
        })

        tt.onTouchEnd(function (res) {
            player.changeXSpeed(0)
        })
    }
}

export {
    TouchInput
}