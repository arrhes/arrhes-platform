import { deleteOneRecordLabelRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/$idRecordLabel/deleteOneRecordLabel.js"
import { readOneRecordLabelRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/$idRecordLabel/readOneRecordLabel.js"
import { updateOneRecordLabelRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/$idRecordLabel/updateOneRecordLabel.js"


export const $idRecordLabelRoutes = [
    deleteOneRecordLabelRoute,
    readOneRecordLabelRoute,
    updateOneRecordLabelRoute,
]