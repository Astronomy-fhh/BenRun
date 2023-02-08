class Common {
    static getMoment() {
        return Date.now()
    }
    static rangeRand(start,end){
        return Math.random()*(end-start) + start
    }
    static randColor(){
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }
}

export {
    Common
}