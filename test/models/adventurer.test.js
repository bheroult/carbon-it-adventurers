import { describe, expect, test } from '@jest/globals'
import Adventurer from '../../app/models/adventurer.js'

describe('adventurer class', () => {
    let adventurer
    let result

    beforeEach(() => {
        adventurer = new Adventurer('Alain', 2, 2, 'N', 'ADGA')
    })

    describe('computeNextPositionForNextMovement', () => {
        describe('for invalid movement', () => {
            beforeEach(() => {
                adventurer.movements = ['X']
                result = adventurer.computeNextPositionForNextMovement()
            })

            test('returns current position', () => {
                expect(result).toEqual([2, 2])
            })

            test('does not update direction', () => {
                expect(adventurer.direction).toEqual('N')
            })
        })

        describe('for right movement', () => {
            beforeEach(() => {
                adventurer.movements = ['D']
                result = adventurer.computeNextPositionForNextMovement()
            })

            test('returns current position', () => {
                expect(result).toEqual([2, 2])
            })

            test('updates direction', () => {
                expect(adventurer.direction).toEqual('E')
            })
        })

        describe('for left movement', () => {
            beforeEach(() => {
                adventurer.movements = ['G']
                result = adventurer.computeNextPositionForNextMovement()
            })

            test('returns current position', () => {
                expect(result).toEqual([2, 2])
            })

            test('updates direction', () => {
                expect(adventurer.direction).toEqual('O')
            })
        })

        describe('for forward movement', () => {
            beforeEach(() => {
                adventurer.movements = ['A']
                result = adventurer.computeNextPositionForNextMovement()
            })

            test('returns current position', () => {
                expect(result).toEqual([2, 1])
            })

            test('does not update direction', () => {
                expect(adventurer.direction).toEqual('N')
            })
        })
    })

    describe('updateDirection', () => {
        let movement
        describe('when direction is west and going right', () => {
            beforeEach(() => {
                adventurer.direction = 'O'
                movement = 'D'
                adventurer.updateDirection(movement)
            })

            test('returns north', () => {
                expect(adventurer.direction).toEqual('N')
            })
        })

        describe('when direction is north and goign left', () => {
            beforeEach(() => {
                adventurer.direction = 'N'
                movement = 'G'
                adventurer.updateDirection(movement)
            })

            test('returns west', () => {
                expect(adventurer.direction).toEqual('O')
            })
        })

        describe('when direction is south and goign left', () => {
            beforeEach(() => {
                adventurer.direction = 'S'
                movement = 'G'
                adventurer.updateDirection(movement)
            })

            test('returns east', () => {
                expect(adventurer.direction).toEqual('E')
            })
        })

        describe('when direction is north and goign right', () => {
            beforeEach(() => {
                adventurer.direction = 'N'
                movement = 'D'
                adventurer.updateDirection(movement)
            })

            test('returns east', () => {
                expect(adventurer.direction).toEqual('E')
            })
        })
    })

    describe('computeNewCoordinates', () => {
        describe('for north direction', () => {
            beforeEach(() => {
                adventurer.direction = 'N'
                result = adventurer.computeNewCoordinates()
            })

            test('provides correct new coordinates', () => {
                expect(result).toEqual([2, 1])
            })
        })

        describe('for south direction', () => {
            beforeEach(() => {
                adventurer.direction = 'S'
                result = adventurer.computeNewCoordinates()
            })

            test('provides correct new coordinates', () => {
                expect(result).toEqual([2, 3])
            })
        })

        describe('for east direction', () => {
            beforeEach(() => {
                adventurer.direction = 'E'
                result = adventurer.computeNewCoordinates()
            })

            test('provides correct new coordinates', () => {
                expect(result).toEqual([3, 2])
            })
        })

        describe('for west direction', () => {
            beforeEach(() => {
                adventurer.direction = 'O'
                result = adventurer.computeNewCoordinates()
            })

            test('provides correct new coordinates', () => {
                expect(result).toEqual([1, 2])
            })
        })
    })
})
