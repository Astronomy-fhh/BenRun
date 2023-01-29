
let touchDriveSensitivity = 10
let touchStartX = 0
let touchStartY = 0
let touchEndX = 0
let touchEndY = 0

class TouchInput {
    
    static startListening(player) {
        tt.onTouchStart(function (res) {
            touchStartX = res.changedTouches[0].screenX
            touchStartY = res.changedTouches[0].screenY
        })

        tt.onTouchEnd(function (res) {
            touchEndX = res.changedTouches[0].screenX
            touchEndY = res.changedTouches[0].screenY
            if (touchEndX - touchStartX > touchDriveSensitivity) {
                player.rightMove()
            } else if (touchStartX - touchEndX > touchDriveSensitivity) {
                player.leftMove()
            }
    
            if (touchStartY - touchEndY > touchDriveSensitivity) {
                player.jump()
            }        
        })
    }

}

export {
    TouchInput
}