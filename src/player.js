import {
  Common
} from './common';



const jumpTypeStop = 0
const jumpTypeJump = 1

const xBaseSpeed = 0.2
const yJumpSpeed = -0.3
const yBaseSpeed = 0.015
const yAddSpeed = 0.000001
const touchSensitivity = 10
const xMoveSpace = 5

const braceStoneTypeNone = 0
const braceStoneTypeTop = 1
const braceStoneTypeBottom = 2
const braceStoneTypeLeft = 3
const braceStoneTypeRight = 4




class Player {
  constructor(name, icon, xMax, yMax, active) {
    this.name = name;
    this.icon = icon
    this.x = xMax / 2
    this.xSpeed = 0
    this.y = yMax / 2
    this.ySpeed = yBaseSpeed
    this.moveType = 0
    this.jumpType = 0
    this.moveTime = this.getMoment()
    this.xMax = xMax
    this.yMax = yMax
    this.width = xMax / 10
    this.height = xMax / 10
    this.xMoveSpace = xMoveSpace
    this.active = active
    this.braceStone = null
    this.braceStoneType = braceStoneTypeNone

    let iconImg = tt.createImage();
    iconImg.src = icon;
    this.iconImg = iconImg
    this.iconImg.onload = () => {};

  }

  startPoint(x, y) {
    this.x = x
    this.y = y
  }

  getMoment() {
    return Common.getMoment()
  }

  braceXY(nx,ny){
    if(!this.braceStone){
      return [nx,ny]
    }
    if(this.braceStoneType === braceStoneTypeTop){
      ny = this.braceStone.y - this.braceStone.ySize/2 - this.height/2
    }else if(this.braceStoneType === braceStoneTypeBottom){
      ny = this.braceStone.y + this.braceStone.ySize/2 + this.height/2
    }else if(this.braceStoneType === braceStoneTypeLeft){
      nx = this.braceStone.x - this.braceStone.xSize/2 - this.width/2
    }

    return [nx,ny]
  }

  addYSpeed(m){
    if(this.braceStoneType !== braceStoneTypeTop && this.braceStoneType !== braceStoneTypeBottom){
      this.ySpeed += (m - this.moveTime) * yAddSpeed
    }
  }

  move() {
    let m = this.getMoment()
    let nx = this.x + this.xSpeed * (m - this.moveTime)
    let ny = this.y + this.ySpeed * (m - this.moveTime)

    this.collisionWithStone(nx, ny)

    let nxy = this.braceXY(nx,ny)
    nx = nxy[0]
    ny = nxy[1]

    this.addYSpeed(m)

    if (nx < this.width) {
      this.x = this.width
    } else if (nx > this.xMax - this.width) {
      this.x = this.xMax - this.width
    } else {
      this.x = nx
    }


    if (ny < this.height) {
      this.y = this.height
    } else if (ny > (this.yMax - this.height * 2)) {
      this.y = this.yMax - this.height * 2
      this.ySpeed = 0
    }else{
      this.y = ny
    }

    this.moveTime = m
    
  };

  changeXSpeed(base){
     this.xSpeed = base * xBaseSpeed
  }


  jump() {
    if (!this.braceStone) {
      //return
    }
    this.ySpeed = yJumpSpeed
    this.y -= 10
  };

  draw(ctx) {
    ctx.drawImage(this.iconImg, 0, 0, this.iconImg.width, this.iconImg.height, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  releaseBrace(){
    //console.log('unbrace', this.braceStoneType)
   
    if(this.braceStoneType === braceStoneTypeTop){
      this.ySpeed = yBaseSpeed
    }
    this.braceStone = null
    this.braceStoneType = braceStoneTypeNone
  }

  brace(stone, braceType){
    console.log('brace', braceType)

    if(this.braceStone !== null && this.braceStone !== stone){
      this.releaseBrace()
    }
    this.braceStone = stone
    this.braceStoneType = braceType
    if(this.braceStoneType === braceStoneTypeTop){
      this.ySpeed = stone.ySpeed
    }else if(this.braceStoneType === braceStoneTypeBottom){
      this.ySpeed = yBaseSpeed
    }
  }

  collisionWithStone(nx, ny) {
    for (const idx in this.active.bullets) {
      this.collisionWithOneStone(nx,ny, this.active.bullets[idx])
    }
  }

  collisionWithOneStone(nx, ny, stone) {
    let inXRange = !(stone.x + stone.xSize / 2 < nx - this.width / 2) && !(stone.x - stone.xSize / 2 > nx + this.width / 2)
    let inYRange = !(stone.y + stone.ySize / 2 < ny - this.height / 2) && !(stone.y - stone.YSize / 2 > ny + this.height / 2)

    // let tyc = stone.y > ny && (stone.y - ny) < (this.height / 2 + stone.ySize / 2) && (ny - (stone.y - this.height / 2 - stone.ySize / 2)) < 0.5
    // let byc = stone.y < ny && (ny - stone.y) < (this.height / 2 + stone.ySize / 2) && (stone.y + this.height / 2 + stone.ySize / 2 - ny < 0.5)
    // let lxc = stone.x > nx && (stone.x - ny) < (this.width / 2 + stone.xSize / 2) && (nx - (stone.x - this.width/2 - stone.xSize/2) < 0.5)


    let tyc = this.y < (stone.y - this.height / 2 - stone.ySize / 2) && ny > (stone.y - this.height / 2 - stone.ySize / 2)
    let byc = false
    let lxc = false
    console.log(this.y, stone.y - this.height / 2 - stone.ySize / 2, ny)


    this.releaseBrace()

    if(inYRange && lxc){
      this.brace(stone, braceStoneTypeLeft)
      return
    }

    if (inXRange && tyc) {
      this.brace(stone, braceStoneTypeTop)
      return
    } 

    if(inXRange && byc){
      this.brace(stone, braceStoneTypeBottom)
      return
    }

   
  }


  static newPlayer(name, icon, xMax, yMax, active) {
    return new Player(name, icon, xMax, yMax, active)
  }
}


export {
  Player
}