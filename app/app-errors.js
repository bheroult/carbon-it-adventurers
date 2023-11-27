export class IncorrectEntriesFormatError extends Error {
    constructor(reason) {
        const message = `Your entries have an incorrect format for the following detected reason : ${reason}`
        super(message)
    }
}
