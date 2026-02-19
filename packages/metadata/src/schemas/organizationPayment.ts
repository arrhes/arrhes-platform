import * as v from "valibot"
import { dateTimeSchema, integerSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import { organizationPaymentStatus } from "../components/values/organizationPaymentStatus.js"
import type { organizationPaymentModel } from "../models/organizationPayment.js"

export const organizationPaymentSchema = v.object({
    id: v.nonNullable(idSchema),
    idOrganization: v.nonNullable(idSchema),
    status: v.nonNullable(v.picklist(organizationPaymentStatus)),
    molliePaymentId: v.nullable(v.string()),
    mollieSubscriptionId: v.nullable(v.string()),
    sequenceType: v.nullable(varcharSchema({ maxLength: 16 })),
    amountInCents: v.nonNullable(integerSchema),
    currency: v.nonNullable(varcharSchema({ maxLength: 3 })),
    description: v.nullable(v.string()),
    periodStart: v.nullable(dateTimeSchema),
    periodEnd: v.nullable(dateTimeSchema),
    paidAt: v.nullable(dateTimeSchema),
    createdAt: v.nonNullable(dateTimeSchema),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof organizationPaymentModel.$inferSelect>

export const organizationPaymentSchemaReturn = v.pick(organizationPaymentSchema, [
    "id",
    "idOrganization",
    "status",
    "molliePaymentId",
    "sequenceType",
    "amountInCents",
    "currency",
    "description",
    "periodStart",
    "periodEnd",
    "paidAt",
    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
