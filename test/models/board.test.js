import { describe, expect, test } from '@jest/globals'
import Board from '../../app/models/board.js'
import {
    CoordinatesAlreadyOccupiedError,
    CoordinatesOutOfMapError,
} from '../../app/models/errors.js'

describe('board class', () => {
    let board
    let result

    describe('setElementOnMap', () => {
        let elementCoordX
        let elementCoordY
        let value

        beforeEach(() => {
            board = new Board(4, 5)
        })

        describe('with coordinates already occupied', () => {
            beforeEach(() => {
                elementCoordX = 2
                elementCoordY = 3
                value = 'D'

                board.map[elementCoordX][elementCoordY] = 'O'

                result = () => board.setElementOnMap(elementCoordX, elementCoordY, value)
            })

            test('throws error', () => {
                expect(result).toThrowError(CoordinatesAlreadyOccupiedError)
            })

            test("does not change position's value", () => {
                expect(board.map[elementCoordX][elementCoordY]).toEqual('O')
            })
        })

        describe('with coordinates out of map', () => {
            beforeEach(() => {
                elementCoordX = 6
                elementCoordY = 6
                value = 'D'
                result = () => board.setElementOnMap(elementCoordX, elementCoordY, value)
            })

            test('throws error', () => {
                expect(result).toThrow(CoordinatesOutOfMapError)
            })
        })

        describe('with coordinates free', () => {
            beforeEach(() => {
                elementCoordX = 2
                elementCoordY = 3
                value = 'D'
                result = board.setElementOnMap(elementCoordX, elementCoordY, value)
            })

            test('returns undefined', () => {
                expect(result).toBeUndefined
            })

            test('succeeds to set element', () => {
                expect(board.map[elementCoordX][elementCoordY]).toEqual(value)
            })
        })
    })

    describe('registerAdventurer', () => {
        let name
        let positionX
        let positionY
        let direction
        let movements

        beforeEach(() => {
            board = new Board(4, 5)

            positionX = 2
            positionY = 3
            name = 'Indi'
            direction = 'N'
            movements = 'GAAADADAGGAA'

            result = board.registerAdventurer(name, positionX, positionY, direction, movements)
        })

        test('returns undefined', () => {
            expect(result).toBeUndefined
        })

        test('succeeds to set adventurer on map', () => {
            expect(board.map[positionX][positionY]).toEqual(name)
        })

        test('registers adventurer', () => {
            const newAdventurer = board.adventurers[0]
            expect(newAdventurer.name).toEqual(name)
            expect(newAdventurer.positionX).toEqual(positionX)
            expect(newAdventurer.positionY).toEqual(positionY)
            expect(newAdventurer.direction).toEqual(direction)
            expect(newAdventurer.treasures).toEqual(0)
            expect(newAdventurer.movements).toEqual(movements)
        })
    })
})
