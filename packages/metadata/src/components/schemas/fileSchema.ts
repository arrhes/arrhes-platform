import * as v from "valibot"

export const fileSchema = v.pipe(
    v.file("Doit être un fichier"),
    v.maxSize(1024 * 1024 * 10, "La taille maximale est de 10 Mo"),
)
