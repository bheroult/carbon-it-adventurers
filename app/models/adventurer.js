import { InvalidDirectionError } from './errors.js'

const VALID_DIRECTIONS = ['N', 'E', 'S', 'O']
const VALID_MOVEMENTS = ['A', 'D', 'G']

export default class Adventurer {
    constructor(name, positionX, positionY, direction, movements) {
        if (!Adventurer.checkDirection(direction)) throw new InvalidDirectionError(direction)

        this.name = name
        this.positionX = positionX
        this.positionY = positionY
        this.direction = direction
        this.treasures = 0
        this.movements = movements.split('')
    }

    static checkDirection(direction) {
        return VALID_DIRECTIONS.includes(direction)
    }

    static checkMovement(movement) {
        return VALID_MOVEMENTS.includes(movement)
    }

    computeNextPositionForNextMovement() {
        const nextMovement = this.movements.shift()

        if (!Adventurer.checkMovement(nextMovement)) return [this.positionX, this.positionY]

        switch (nextMovement) {
            case 'D':
            case 'G':
                this.updateDirection(nextMovement)
                return [this.positionX, this.positionY]
            case 'A':
                return this.computeNewCoordinates()
        }
    }

    updateDirection(movement) {
        const movementIsRight = movement === 'D'
        const movementIsLeft = movement === 'G'

        const indexOfInitialDirection = VALID_DIRECTIONS.indexOf(this.direction)
        if (this.direction === 'O' && movementIsRight) {
            this.direction = 'N'
        } else if (this.direction === 'N' && movementIsLeft) {
            this.direction = 'O'
        } else if (movementIsLeft) {
            this.direction = VALID_DIRECTIONS[indexOfInitialDirection - 1]
        } else {
            this.direction = VALID_DIRECTIONS[indexOfInitialDirection + 1]
        }
    }

    computeNewCoordinates() {
        switch (this.direction) {
            case 'N':
                return [this.positionX, this.positionY - 1]
            case 'S':
                return [this.positionX, this.positionY + 1]
            case 'E':
                return [this.positionX + 1, this.positionY]
            case 'O':
                return [this.positionX - 1, this.positionY]
        }
    }

    updatePosition([positionX, positionY]) {
        this.positionX = positionX
        this.positionY = positionY
    }

    toString() {
        return `A - ${this.name} - ${this.positionX} - ${this.positionY} - ${this.direction} - ${this.treasures}`
    }
}
