export default class Mountain {
    constructor(positionX, positionY) {
        this.positionX = positionX
        this.positionY = positionY
    }

    toString() {
        return `M - ${this.positionX} - ${this.positionY}`
    }
}
