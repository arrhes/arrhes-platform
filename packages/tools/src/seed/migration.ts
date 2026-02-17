import { dbClient } from "../dbClient.js"

async function migration() {
    try {
        await dbClient.transaction(async (_tx) => {})
    } catch (error) {
        console.log(error)
    }
}

await migration()
process.exit()
