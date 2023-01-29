import {
  Common
} from './common';



const jumpTypeStop = 0
const jumpTypeJump = 1

const speed = 0.1
const yJumpSpeed = -2
const yGravitySpeed = 0.00098
const touchSensitivity = 10



class Player {
  constructor(name, icon, xMax, yMax) {
    this.name = name;
    this.icon = icon
    this.x = xMax / 2
    this.xSpeed = 0
    this.y = yMax / 2
    this.ySpeed = yGravitySpeed
    this.moveType = 0
    this.jumpType = 0
    this.moveTime = this.getMoment()
    this.xMax = xMax
    this.yMax = yMax
    this.width = xMax/10
    this.height = xMax/10

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

  move() {
    let m = this.getMoment()
    let nx = this.x + this.xSpeed * (m - this.moveTime)
    if (nx < this.width) {
      this.x = this.width
    } else if (nx > this.xMax - this.width) {
      this.x = this.xMax - this.width
    } else {
      this.x = nx
    }

    let ny = this.y + this.ySpeed * (m - this.moveTime)
    if (ny < this.height) {
      this.y = this.height
    } else if (ny > (this.yMax - this.height * 2)) {
      this.y = this.yMax - this.height * 2
      this.ySpeed = 0
      this.jumpType = jumpTypeStop
    } else {
      this.y = ny
    }

    this.ySpeed += (m - this.moveTime) * 0.01
    this.moveTime = m
  };

  leftMove() {
    this.xSpeed = -speed
  };

  rightMove() {
    this.xSpeed = speed
  };

  stopMove() {
    this.xSpeed = 0
  };

  jump() {
    if (this.jumpType == jumpTypeJump) {
      return
    }
    this.ySpeed += yJumpSpeed
    this.jumpType = jumpTypeJump
  };

  frame(ctx) {
    ctx.drawImage(this.iconImg, 0, 0, this.iconImg.width, this.iconImg.height, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    this.move()
  }

  changeMoveState(startTouchX, startTouchY, endTouchX, endTouchY) {
    if (endTouchX - startTouchX > touchSensitivity) {
      this.rightMove()
    } else if (startTouchX - endTouchX > touchSensitivity) {
      this.leftMove()
    }

    if (startTouchY - endTouchY > touchSensitivity) {
      this.jump()
    }
  };


  static newPlayer(name, icon, xMax, yMax) {
    return new Player(name, icon, xMax, yMax)
  }
}


export {
  Player
}