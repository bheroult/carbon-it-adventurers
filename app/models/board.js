import Adventurer from './adventurer.js'
import { CoordinatesAlreadyOccupiedError, CoordinatesOutOfMapError } from './errors.js'
import Mountain from './mountain.js'
import Treasure from './treasure.js'

export default class Board {
    constructor(mapDimensionX, mapDimensionY) {
        this.map = new Array(mapDimensionX)
        for (let i = 0; i < mapDimensionX; i++) {
            this.map[i] = new Array(mapDimensionY)
        }

        this.mapDimensionX = mapDimensionX
        this.mapDimensionY = mapDimensionY
        this.adventurers = []
        this.mountains = []
        this.treasures = []
    }

    setElementOnMap(elementCoordX, elementCoordY, value) {
        if (this.isOutOfMap([elementCoordX, elementCoordY])) throw new CoordinatesOutOfMapError()

        const coordinatesCurrentValue = this.map[elementCoordX][elementCoordY]
        if (coordinatesCurrentValue) throw new CoordinatesAlreadyOccupiedError()

        this.map[elementCoordX][elementCoordY] = value
    }

    isOutOfMap([positionX, positionY]) {
        const xOutOfMap = positionX >= this.mapDimensionX || positionX < 0
        const yOutOfMap = positionY >= this.mapDimensionY || positionY < 0
        return xOutOfMap || yOutOfMap
    }

    registerAdventurer(name, positionX, positionY, direction, movements) {
        this.setElementOnMap(positionX, positionY, name)

        this.adventurers.push(new Adventurer(name, positionX, positionY, direction, movements))
    }

    registerTreasure(positionX, positionY, numberOfTreasures) {
        this.setElementOnMap(positionX, positionY, numberOfTreasures)

        this.treasures.push(new Treasure(positionX, positionY, numberOfTreasures))
    }

    registerMountain(positionX, positionY) {
        this.setElementOnMap(positionX, positionY, 'M')

        this.mountains.push(new Mountain(positionX, positionY))
    }

    playRound() {
        this.adventurers.forEach((adventurer) => {
            const oldPosition = [adventurer.positionX, adventurer.positionY]
            const newPosition = adventurer.computeNextPositionForNextMovement()

            const xOutOfMap = newPosition[0] >= this.mapDimensionX || newPosition[0] < 0
            const yOutOfMap = newPosition[1] >= this.mapDimensionY|| newPosition[1] < 0
            if (this.isOutOfMap(newPosition)) return

            const positionCurrentValue = this.map[newPosition[0]][newPosition[1]]
            const positionIsFree = !positionCurrentValue
            const positionDoesNotChange =
                positionCurrentValue &&
                typeof positionCurrentValue === 'string' &&
                positionCurrentValue.includes(adventurer.name)
            const positionCannotBeOccupied =
                positionCurrentValue === 'A' || positionCurrentValue === 'M'

            if (positionDoesNotChange || positionCannotBeOccupied) {
                return
            }
            this.handleAdventurerTakingPosition(adventurer, positionIsFree, positionCurrentValue, newPosition, oldPosition)
        })
    }

    handleAdventurerTakingPosition(adventurer, positionIsFree, positionCurrentValue, newPosition, oldPosition) {
        if (!positionIsFree) {
            const nbOfTreasures = parseInt(positionCurrentValue)
            const hasTreasure = nbOfTreasures > 0
            if (hasTreasure) {
                adventurer.treasures++
                this.map[newPosition[0]][newPosition[1]] = `${adventurer.name} - ${
                    nbOfTreasures - 1
                }`
                const matchingTreasure = this.getTreasureForCoordinates(newPosition)
                matchingTreasure.remainingTreasures = nbOfTreasures - 1
            } else {
                this.map[newPosition[0]][newPosition[1]] =
                    `${adventurer.name} - ${nbOfTreasures}`
            }
        } else {
            this.map[newPosition[0]][newPosition[1]] = adventurer.name
        }
        adventurer.updatePosition(newPosition)
        this.clearPosition(oldPosition)
    }

    getTreasureForCoordinates([positionX, positionY]) {
        return this.treasures.find(
            (treasure) => treasure.positionX === positionX && treasure.positionY === positionY
        )
    }

    clearPosition([positionX, positionY]) {
        const positionValue = this.map[positionX][positionY]
        const treasureQuantity = positionValue.split(' - ')[1]
        if (!treasureQuantity) {
            this.map[positionX][positionY] = undefined
        }
        this.map[positionX][positionY] = parseInt(treasureQuantity)
    }
}
