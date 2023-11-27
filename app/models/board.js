import Adventurer from './adventurer.js'
import { CoordinatesAlreadyOccupiedError, CoordinatesOutOfMapError } from './errors.js'

export default class Board {
    constructor(mapDimensionX, mapDimensionY) {
        this.map = new Array(mapDimensionX)
        for (let i = 0; i < mapDimensionX; i++) {
            this.map[i] = new Array(mapDimensionY)
        }

        this.mapDimensionX = mapDimensionX
        this.mapDimensionY = mapDimensionY
        this.adventurers = []

        this.elements = []
    }

    setElementOnMap(elementCoordX, elementCoordY, value) {
        const xOutOfMap = elementCoordX >= this.mapDimensionX
        const yOutOfMap = elementCoordY >= this.mapDimensionY
        if (xOutOfMap || yOutOfMap) throw new CoordinatesOutOfMapError()

        const coordinatesCurrentValue = this.map[elementCoordX][elementCoordY]
        if (coordinatesCurrentValue) throw new CoordinatesAlreadyOccupiedError()

        this.map[elementCoordX][elementCoordY] = value

        this.elements.push([elementCoordX, elementCoordY, value])
    }

    registerAdventurer(name, positionX, positionY, direction, movements) {
        this.setElementOnMap(positionX, positionY, name)

        this.adventurers.push(new Adventurer(name, positionX, positionY, direction, movements))
    }
}
