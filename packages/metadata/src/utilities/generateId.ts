import { customAlphabet } from 'nanoid'


export function generateId() {
    const raw = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 16)()
    return [raw.slice(0, 4), raw.slice(4, 8), raw.slice(8, 12), raw.slice(12, 16)]
}
