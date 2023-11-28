import fs from 'fs'

export async function readFile(path) {
    console.log('Reading file', path)
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, output) => {
            if (err) {
                reject(new Error('Could not read file', err))
            }
            resolve(output.toString())
        })
    })
}

export async function writeFile(path, input) {
    console.log('Writing file', path)
    if (!input) {
        throw new Error('Cannot write file with empty input')
    }

    fs.writeFile(path, input, (err) => {
        if (err) {
            throw new Error('Could not write file', err)
        }
        console.log('File updated')
    })
}
