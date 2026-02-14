import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { AnyPgColumn, integer, pgTable, text, unique, varchar } from "drizzle-orm/pg-core"
import { organizationModel } from "./organization.js"
import { userModel } from "./user.js"
import { yearModel } from "./year.js"


// Model
export const attachmentModel = pgTable(
    "table_attachment",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization").references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
        idYear: idColumn("id_year").references(() => yearModel.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
        reference: varchar("reference", { length: 256 }).notNull(),
        label: varchar("label", { length: 256 }),
        date: dateTimeColumn("date").notNull(),
        storageKey: text("storage_key"),
        type: text("type"),
        size: integer("size"),
        createdAt: dateTimeColumn("created_at").notNull(),
        lastUpdatedAt: dateTimeColumn("last_updated_at"),
        createdBy: idColumn("created_by").references((): AnyPgColumn => userModel.id, { onDelete: "set null", onUpdate: "cascade" }),
        lastUpdatedBy: idColumn("last_updated_by").references((): AnyPgColumn => userModel.id, { onDelete: "set null", onUpdate: "cascade" }),
    },
    (t) => ([
        unique().on(t.idOrganization, t.idYear, t.reference)
    ])
)
