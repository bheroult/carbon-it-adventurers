import { readFile, writeFile } from './utils/file-manager.js'

const ENTRY_FILE_PATH = './entries.txt'
const OUTPUT_FILE_PATH = './output.txt'

console.log('read file')

readFile(ENTRY_FILE_PATH).then((fileContent) => {
    console.log('content', fileContent)

    return writeFile(OUTPUT_FILE_PATH, fileContent)
})
