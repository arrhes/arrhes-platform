import { accountSchema, accountSchemaReturn } from "./account.js"
import { balanceSheetSchema, balanceSheetSchemaReturn } from "./balanceSheet.js"
import { computationSchema, computationSchemaReturn } from "./computation.js"
import {
    computationIncomeStatementSchema,
    computationIncomeStatementSchemaReturn,
} from "./computationIncomeStatement.js"
import { fileSchema, fileSchemaReturn } from "./file.js"
import { incomeStatementSchema, incomeStatementSchemaReturn } from "./incomeStatement.js"
import { journalSchema, journalSchemaReturn } from "./journal.js"
import { organizationSchema, organizationSchemaReturn } from "./organization.js"
import { organizationUserSchema, organizationUserSchemaReturn } from "./organizationUser.js"
import { recordSchema, recordSchemaReturn } from "./record.js"
import { recordLabelSchema, recordLabelSchemaReturn } from "./recordLabel.js"
import { recordRowSchema, recordRowSchemaReturn } from "./recordRow.js"
import { userSchema, userSchemaReturn } from "./user.js"
import { userSessionSchema, userSessionSchemaReturn } from "./userSession.js"
import { yearSchema, yearSchemaReturn } from "./year.js"

export const schemas = {
    account: accountSchema,
    file: fileSchema,
    balanceSheet: balanceSheetSchema,
    computation: computationSchema,
    computationIncomeStatement: computationIncomeStatementSchema,
    incomeStatement: incomeStatementSchema,
    journal: journalSchema,
    organization: organizationSchema,
    organizationUser: organizationUserSchema,
    record: recordSchema,
    recordLabel: recordLabelSchema,
    recordRow: recordRowSchema,
    user: userSchema,
    userSession: userSessionSchema,
    year: yearSchema,
}

export const returnedSchemas = {
    account: accountSchemaReturn,
    file: fileSchemaReturn,
    balanceSheet: balanceSheetSchemaReturn,
    computation: computationSchemaReturn,
    computationIncomeStatement: computationIncomeStatementSchemaReturn,
    incomeStatement: incomeStatementSchemaReturn,
    journal: journalSchemaReturn,
    organization: organizationSchemaReturn,
    organizationUser: organizationUserSchemaReturn,
    record: recordSchemaReturn,
    recordLabel: recordLabelSchemaReturn,
    recordRow: recordRowSchemaReturn,
    user: userSchemaReturn,
    userSession: userSessionSchemaReturn,
    year: yearSchemaReturn,
}
