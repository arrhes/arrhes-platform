import * as accountModel from "./account.js"
import * as balanceSheetModel from "./balanceSheet.js"
import * as computationModel from "./computation.js"
import * as computationIncomeStatementModel from "./computationIncomeStatement.js"
import * as documentModel from "./document.js"
import * as fileModel from "./file.js"
import * as incomeStatementModel from "./incomeStatement.js"
import * as journalModel from "./journal.js"
import * as organizationModel from "./organization.js"
import * as organizationUserModel from "./organizationUser.js"
import * as recordModel from "./record.js"
import * as recordLabelModel from "./recordLabel.js"
import * as recordRowModel from "./recordRow.js"
import * as userModel from "./user.js"
import * as userSessionModel from "./userSession.js"
import * as yearModel from "./year.js"

export const models = {
    account: accountModel.accountModel,
    file: fileModel.fileModel,
    balanceSheet: balanceSheetModel.balanceSheetModel,
    computation: computationModel.computationModel,
    computationIncomeStatement: computationIncomeStatementModel.computationIncomeStatementModel,
    document: documentModel.documentModel,
    incomeStatement: incomeStatementModel.incomeStatementModel,
    journal: journalModel.journalModel,
    organization: organizationModel.organizationModel,
    organizationUser: organizationUserModel.organizationUserModel,
    record: recordModel.recordModel,
    recordLabel: recordLabelModel.recordLabelModel,
    recordRow: recordRowModel.recordRowModel,
    user: userModel.userModel,
    userSession: userSessionModel.userSessionModel,
    year: yearModel.yearModel,
}

export const modelSchemas = {
    ...accountModel,
    ...fileModel,
    ...balanceSheetModel,
    ...computationModel,
    ...computationIncomeStatementModel,
    ...documentModel,
    ...incomeStatementModel,
    ...journalModel,
    ...organizationModel,
    ...organizationUserModel,
    ...recordModel,
    ...recordLabelModel,
    ...recordRowModel,
    ...userModel,
    ...userSessionModel,
    ...yearModel,
}
