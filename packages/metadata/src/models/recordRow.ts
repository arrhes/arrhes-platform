import { dateTimeColumn } from "#src/components/models/dateTimeColumn.js"
import { idColumn } from "#src/components/models/idColumn.js"
import { relations } from "drizzle-orm"
import { AnyPgColumn, boolean, numeric, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { accountModel } from "./account.js"
import { organizationModel } from "./organization.js"
import { recordModel } from "./record.js"
import { userModel } from "./user.js"
import { yearModel } from "./year.js"


// Model
export const recordRowModel = pgTable(
    "table_record_row",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization").references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
        idYear: idColumn("id_year").references(() => yearModel.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
        idRecord: idColumn("id_record").references(() => recordModel.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
        idAccount: idColumn("id_account").references(() => accountModel.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
        computedCode: text("computed_code"),
        isComputed: boolean("is_computed").notNull(),
        label: varchar("label", { length: 256 }),
        debit: numeric("debit", { scale: 2 }).notNull(),
        credit: numeric("credit", { scale: 2 }).notNull(),
        createdAt: dateTimeColumn("created_at").notNull(),
        lastUpdatedAt: dateTimeColumn("last_updated_at"),
        createdBy: idColumn("created_by").references((): AnyPgColumn => userModel.id, { onDelete: "set null", onUpdate: "cascade" }),
        lastUpdatedBy: idColumn("last_updated_by").references((): AnyPgColumn => userModel.id, { onDelete: "set null", onUpdate: "cascade" }),
    }
)

// Relations
export const recordRowRelations = relations(recordRowModel, ({ one }) => ({
    record: one(recordModel, {
        fields: [recordRowModel.idRecord],
        references: [recordModel.id],
    }),
    account: one(accountModel, {
        fields: [recordRowModel.idAccount],
        references: [accountModel.id],
    })
}))