import { InvalidDirectionError } from './errors.js'

const VALID_DIRECTIONS = ['N', 'E', 'S', 'O']

export default class Adventurer {
    constructor(name, positionX, positionY, direction, movements) {
        if (!Adventurer.checkDirection(direction)) throw new InvalidDirectionError(direction)

        this.name = name
        this.positionX = positionX
        this.positionY = positionY
        this.direction = direction
        this.treasures = 0
        this.movements = movements
    }

    getNextMovement() {
        return this.movements.shift()
    }

    static checkDirection(direction) {
        return VALID_DIRECTIONS.includes(direction)
    }
}
