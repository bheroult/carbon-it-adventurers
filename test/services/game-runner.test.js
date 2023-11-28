import { describe, expect, it, jest } from '@jest/globals'
import Board from '../../app/models/board.js'
import gameRunner from '../../app/services/game-runner.js'

describe('gameRunner', () => {
    let board
    let result

    const playRoundMock = jest.spyOn(Board.prototype, 'playRound')

    describe('happy path', () => {
        beforeEach(() => {
            board = new Board(3, 4)
            board.registerMountain(2, 3)
            board.registerTreasure(0, 0)
            board.registerAdventurer('Felix', 0, 1, 'E', 'ADDA')
            board.registerAdventurer('Mike', 1, 0, 'N', 'DAAGGG')

            result = gameRunner(board)
        })

        it('should call 6 times the playRound function', () => {
            expect(playRoundMock).toBeCalledTimes(6)
        })

        it('should return correct output', () => {
            const expectedResult =
                'C - 3 - 4\nM - 2 - 3\n# {T comme Trésor} - {Axe horizontal} - {Axe vertical} - {Nb. de trésors restants}\nT - 0 - 0 - undefined\n# {A comme Aventurier} - {Nom de l’aventurier} - {Axe horizontal} - {Axe vertical} - {Orientation} - {Nb. trésors ramassés}\nA - Felix - 0 - 1 - O - 0\nA - Mike - 2 - 0 - S - 0'
            expect(result).toEqual(expectedResult)
        })
    })
})
