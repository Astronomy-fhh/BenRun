import {
    Global
} from './src/global';
import {
    Player
} from './src/player';
import {
    TouchInput
} from './src/input';


let systemInfo = tt.getSystemInfoSync()
let canvas = tt.createCanvas()
let ctx = canvas.getContext('2d')

let mainGlobal
let mainPlayer

let winWidth = systemInfo.windowWidth
let winHeight = systemInfo.windowHeight




function initGame(userInfo){
    mainPlayer = Player.newPlayer(userInfo.nickName, userInfo.avatarUrl, winWidth, winHeight)
    mainGlobal = Global.newGlobal(winWidth, winHeight, mainPlayer)
}

function startGame(){
    TouchInput.startListening(mainPlayer)
    startFrame()
}

function startFrame() {
    ctx.clearRect(0,0,winWidth,winHeight)
    mainGlobal.frame(ctx)
    mainPlayer.frame(ctx)
    requestAnimationFrame(startFrame);
}





function main() {
    tt.login({
        force: true,
        success(res) {
            console.log(`login 调用成功`);
            tt.getUserInfo({
                success: (res) => {
                    initGame(res.userInfo)
                    startGame()
                },
                fail: (res) => {
                    console.log(res.errMsg)
                },
            });        },
        fail(res) {
            console.log(`login 调用失败`);
        },
    });
}


main()