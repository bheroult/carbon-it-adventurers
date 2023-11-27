export class CoordinatesAlreadyOccupiedError extends Error {
    constructor() {
        super('Provided coordinates are already occupied on the map')
    }
}

export class CoordinatesOutOfMapError extends Error {
    constructor() {
        super('Provided coordinates are out of the map')
    }
}

export class InvalidDirectionError extends Error {
    constructor(invalidValue) {
        super(`Invalid direction: ${invalidValue}`)
    }
}
