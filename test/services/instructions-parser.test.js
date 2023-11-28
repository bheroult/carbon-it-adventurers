import { describe, expect, test } from '@jest/globals'

import instructionsParser from '../../app/services/instructions-parser.js'
import Board from '../../app/models/board.js'
import { IncorrectEntriesFormatError } from '../../app/app-errors.js'
import {
    CoordinatesAlreadyOccupiedError,
    CoordinatesOutOfMapError,
} from '../../app/models/errors.js'

describe('instructions parser', () => {
    let instructionsFileContet
    let result

    describe('with multiple map dimensions provided', () => {
        beforeEach(() => {
            instructionsFileContet =
                'C - 3 - 4\n#this is a comment \nM - 1 - 0\n\nM - 2 - 1\nC - 2 - 2\nT - 0 - 3 - 2\nA - Indiana - 1 - 1 - S - AADADA'
            result = () => instructionsParser(instructionsFileContet)
        })

        test('throws error', () => {
            expect(result).toThrowError(IncorrectEntriesFormatError)
        })
    })

    describe('with two elements on same position', () => {
        beforeEach(() => {
            instructionsFileContet =
                'C - 3 - 4\n#this is a comment \nM - 1 - 0\n\nM - 0 - 3\nT - 0 - 3 - 2\nA - Indiana - 1 - 1 - S - AADADA'
            result = () => instructionsParser(instructionsFileContet)
        })

        test('throws error', () => {
            expect(result).toThrowError(CoordinatesAlreadyOccupiedError)
        })
    })

    describe('with element out of map', () => {
        beforeEach(() => {
            instructionsFileContet =
                'C - 3 - 4\n#this is a comment \nM - 6 - 2\n\nM - 2 - 1\nT - 0 - 3 - 2\nA - Indiana - 1 - 1 - S - AADADA'
            result = () => instructionsParser(instructionsFileContet)
        })

        test('throws error', () => {
            expect(result).toThrow(CoordinatesOutOfMapError)
        })
    })

    describe('happy path', () => {
        beforeEach(() => {
            instructionsFileContet =
                'C - 3 - 4\n#this is a comment \nM - 1 - 0\n\nM - 2 - 1\nT - 0 - 3 - 2\nA - Indiana - 1 - 1 - S - AADADA'
            result = instructionsParser(instructionsFileContet)
        })

        test('returns new board game with correct map', () => {
            expect(result).toBeInstanceOf(Board)

            const expectedMap = [
                [undefined, undefined, undefined, 2],
                ['M', 'Indiana', undefined, undefined],
                [undefined, 'M', undefined, undefined],
            ]
            expect(result.map).toEqual(expectedMap)
        })
    })
})
