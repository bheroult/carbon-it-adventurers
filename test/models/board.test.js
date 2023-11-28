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
            expect(newAdventurer.movements).toEqual(movements.split(''))
        })
    })

    describe('clearPosition', () => {
        let positionX
        let positionY

        beforeEach(() => {
            board = new Board(4, 5)
            positionX = 3
            positionY = 1
        })

        describe('with a treasure quantity on position', () => {
            beforeEach(() => {
                board.map[positionX][positionY] = 'Alan - 3'
                board.clearPosition([positionX, positionY])
            })

            test('reset position value with only treasure quantity', () => {
                expect(board.map[positionX][positionY]).toEqual(3)
            })
        })

        describe('with only an adventurer name on position on position', () => {
            beforeEach(() => {
                board.map[positionX][positionY] = 'Alan'
                board.clearPosition([positionX, positionY])
            })
            
            test('reset position value to undefined', () => {
                expect(board.map[positionX][positionY]).toBeUndefined
            })
        })
    })

    describe('playRound', () => {
        beforeEach(() => {
            board = new Board(4, 5)

            board.registerMountain(1, 1)
            board.registerTreasure(2, 2, 2)
        })

        describe('for new position out of map', () => {
            beforeEach(() => {
                board.registerAdventurer('Indiana', 3, 2, 'E', 'A')
                board.playRound()
            })

            test('does not change adventurer position', () => {
                expect(board.adventurers[0].positionX).toBe(3)
                expect(board.adventurers[0].positionY).toBe(2)
                expect(board.map[3][2]).toEqual('Indiana')
            })
        })

        describe('for new position same as old one', () => {
            beforeEach(() => {
                board.registerAdventurer('Indiana', 2, 3, 'E', 'D')
                board.playRound()
            })

            test('does not change adventurer position', () => {
                expect(board.adventurers[0].positionX).toBe(2)
                expect(board.adventurers[0].positionY).toBe(3)
                expect(board.map[2][3]).toEqual('Indiana')
            })
        })

        describe('for new position already occupied', () => {
            beforeEach(() => {
                board.registerAdventurer('Indiana', 2, 1, 'O', 'A')
                board.playRound()
            })

            test('does not change adventurer position', () => {
                expect(board.adventurers[0].positionX).toBe(2)
                expect(board.adventurers[0].positionY).toBe(1)
                expect(board.map[2][1]).toEqual('Indiana')
            })
        })

        describe('for new position with a treasure', () => {
            beforeEach(() => {
                board.registerAdventurer('Indiana', 2, 1, 'S', 'A')
                board.playRound()
            })

            test('changes adventurer position', () => {
                expect(board.adventurers[0].positionX).toBe(2)
                expect(board.adventurers[0].positionY).toBe(2)
            })

            test('update adventurer treasures', () => {
                expect(board.adventurers[0].treasures).toBe(1)
            })

            test('changers board value on position', () => {
                expect(board.map[2][2]).toEqual('Indiana - 1')
            })

            test('clears old position', () => {
                expect(board.map[2][1]).toBeUndefined
            })
        })

        describe('for new position completely free', () => {
            beforeEach(() => {
                board.registerAdventurer('Indiana', 3, 2, 'S', 'A')
                board.playRound()
            })

            test('changes adventurer position', () => {
                expect(board.adventurers[0].positionX).toBe(3)
                expect(board.adventurers[0].positionY).toBe(3)
            })

            test('changers board value on position', () => {
                expect(board.map[3][3]).toEqual('Indiana')
            })

            test('clears old position', () => {
                expect(board.map[3][2]).toBeUndefined
            })
        })
    })
})
