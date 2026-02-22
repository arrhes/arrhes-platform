import { dateTimeSchema } from "../components/_index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import { recordModel } from "../models/record.js"
import * as v from "valibot"


export const recordSchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    idYear: v.nonNullable(idSchema),
    idJournal: v.nullable(idSchema),
    idAttachment: v.nullable(idSchema),
    idRecordLabel: v.nullable(idSchema),
    label: v.nonNullable(varcharSchema({ maxLength: 256 })),
    date: v.nonNullable(dateTimeSchema),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof recordModel.$inferSelect>


export const recordSchemaReturn = v.pick(
    recordSchema,
    [
        "id",
        "idOrganization",
        "idYear",
        "idJournal",
        "idAttachment",
        "idRecordLabel",
        "label",
        "date",
        "createdAt",
        "lastUpdatedAt",
        "createdBy",
        "lastUpdatedBy",
    ]
)