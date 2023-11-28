import gameRunner from './services/game-runner.js'
import instructionsParser from './services/instructions-parser.js'
import { readFile, writeFile } from './utils/file-manager.js'

const ENTRY_FILE_PATH = './entries.txt'
const OUTPUT_FILE_PATH = './output.txt'

readFile(ENTRY_FILE_PATH).then((fileContent) => {
    const gameBoard = instructionsParser(fileContent)

    console.log('Board built')
    console.log('Running game')

    const gameOutput = gameRunner(gameBoard)

    return writeFile(OUTPUT_FILE_PATH, gameOutput)
})
