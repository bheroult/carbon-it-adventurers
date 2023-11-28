export default class Treasure {
    constructor(positionX, positionY, remainingTreasures) {
        this.positionX = positionX
        this.positionY = positionY
        this.remainingTreasures = remainingTreasures
    }

    toString() {
        return `T - ${this.positionX} - ${this.positionY} - ${this.remainingTreasures}`
    }
}
