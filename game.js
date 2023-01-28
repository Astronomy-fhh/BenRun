import {
    newMap,
    Map
} from './map/map';
import {
    newPlayer,
    Player
} from './player/player';


let systemInfo = tt.getSystemInfoSync()
let canvas = tt.createCanvas()
let ctx = canvas.getContext('2d')

let foreverCanvas = tt.createCanvas()
let foreverCtx = foreverCanvas.getContext('2d')

let mainMap
let mainPlayer

let width = systemInfo.windowWidth
let height = systemInfo.windowHeight

let playerWidth = width/20
let playerHeight = playerWidth * 2

let playerIcon

function gameloop() {

    ctx.clearRect(0,0,width,height)
    mainMap.move()

    ctx.fillStyle = '#000000'
    ctx.font = `${parseInt(systemInfo.windowWidth / 50)}px Arial`
    ctx.fillText(`地图偏移x:${parseInt(mainMap.x)} | 玩家位置:x:${mainPlayer.x} y:${mainPlayer.y}`, 110, 30)

    ctx.fillStyle = '#78399A'
    ctx.fillRect(mainPlayer.x - playerWidth/2 ,mainPlayer.y,playerWidth, 100)

    if (playerIcon){
        ctx.drawImage(playerIcon, 0, 0, playerIcon.width, playerIcon.height, 50, 0, 50, 50);
    }else{
        playerIcon = tt.createImage();
        playerIcon.src = mainPlayer.icon;
        playerIcon.onload = () => {
            ctx.drawImage(playerIcon, 0, 0, playerIcon.width, playerIcon.height, 50, 0, 50, 50);
        };
    }
   

    requestAnimationFrame(gameloop);
}

function startLoop(){
    gameloop()
}

function startGame(userInfo){
    mainMap = newMap();
    mainPlayer = newPlayer(userInfo.nickName, userInfo.avatarUrl)
    mainPlayer.startPoint(width/2, height/2)

    startLoop()
}

function main() {
    tt.login({
        force: true,
        success(res) {
            console.log(`login 调用成功`);
            tt.getUserInfo({
                success: (res) => {
                    console.log(res.userInfo)
                    startGame(res.userInfo)
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