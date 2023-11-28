export default function gameRunner(board) {
    const numberOfRounds = getBoardRounds(board)

    for (let j = 0; j < numberOfRounds; j++) {
        board.playRound()
    }

    return buildOutputResults(board)
}

function getBoardRounds(board) {
    const numberOfMovementsPerAdventurer = board.adventurers.map(
        (adventurer) => adventurer.movements.length
    )
    return Math.max(...numberOfMovementsPerAdventurer)
}

function buildOutputResults(board) {
    let outputString = `C - ${board.mapDimensionX} - ${board.mapDimensionY}`

    board.mountains.forEach((mountain) => {
        outputString += `\n${mountain.toString()}`
    })
    outputString +=
        '\n# {T comme Trésor} - {Axe horizontal} - {Axe vertical} - {Nb. de trésors restants}'
    board.treasures.forEach((treasure) => {
        outputString += `\n${treasure.toString()}`
    })
    outputString +=
        '\n# {A comme Aventurier} - {Nom de l’aventurier} - {Axe horizontal} - {Axe vertical} - {Orientation} - {Nb. trésors ramassés}'
    board.adventurers.forEach((adventurer) => {
        outputString += `\n${adventurer.toString()}`
    })

    return outputString
}
