import Board from './models/board.js'
import { IncorrectEntriesFormatError } from './app-errors.js'

/*
    Takes output from file reader, clean it and build a new board game
    parameter instructionsFileContent: string
    returns: new Board instance
*/
export default function instructionsParser(instructionsFileContent) {
    const cleanedLines = cleanInstructions(instructionsFileContent)
    const formattedLines = formatLines(cleanedLines)

    const gameBoard = buildBoard(formattedLines)

    readElementsPositions(formattedLines, gameBoard)

    return gameBoard
}

function cleanInstructions(instructionsFileContent) {
    const instructionsWithoutCarriageReturn = instructionsFileContent.split(/\n/)
    const instructionsWithoutEmptyLine = instructionsWithoutCarriageReturn.filter((line) => !!line)

    const commentLineRegExp = new RegExp(/^#/)
    const instructionsWithoutComment = instructionsWithoutEmptyLine.filter((line) => {
        return !commentLineRegExp.test(line)
    })

    return instructionsWithoutComment
}

function formatLines(cleanedLines) {
    return cleanedLines.map((line) => line.split(' - '))
}

function buildBoard(formattedLines) {
    const mapDimensions = formattedLines.filter((instructionLine) => instructionLine[0] === 'C')

    if (mapDimensions.length > 1)
        throw new IncorrectEntriesFormatError('multiple map dimensions provided')

    const mapDimensionX = parseInt(mapDimensions[0][1])
    const mapDimensionY = parseInt(mapDimensions[0][2])
    return new Board(mapDimensionX, mapDimensionY)
}

function readElementsPositions(formattedLines, gameBoard) {
    formattedLines.forEach((line) => {
        let coordX = parseInt(line[1])
        let coordY = parseInt(line[2])

        switch (line[0]) {
            case 'M':
                gameBoard.setElementOnMap(coordX, coordY, line[0])
                break
            case 'T':
                const numberOfTreasures = parseInt(line[3])
                gameBoard.setElementOnMap(coordX, coordY, numberOfTreasures)
                break
            case 'A':
                coordX = parseInt(line[2])
                coordY = parseInt(line[3])
                gameBoard.registerAdventurer(line[1], coordX, coordY, line[4], line[5])
                break
        }
    })
}
