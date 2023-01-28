class Player {
    constructor(name,icon) {
      this.name = name;
      this.icon = icon
      this.x = 0
      this.y = 0
    }
    startPoint(x,y){
      this.x = x
      this.y = y
    }
  }

function newPlayer(name,icon){
  return new Player(name,icon)
}

export{newPlayer, Player}