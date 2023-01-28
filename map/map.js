class Map {
    constructor() {
        this.x = 0;
    }
    move() {
        this.x += 0.1
    }

}

function newMap() {
    return new Map()
}

export{newMap, Map}