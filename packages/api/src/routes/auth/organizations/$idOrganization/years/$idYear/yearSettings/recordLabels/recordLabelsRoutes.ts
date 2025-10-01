import { $idRecordLabelRoutes } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/$idRecordLabel/$idRecordLabelRoutes.js"
import { createOneRecordLabelRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/createOneRecordLabel.js"
import { readAllRecordLabelsRoute } from "#/routes/auth/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/readAllRecordLabels.js"


export const recordLabelsRoutes = [
    createOneRecordLabelRoute,
    readAllRecordLabelsRoute,

    ...$idRecordLabelRoutes,
]