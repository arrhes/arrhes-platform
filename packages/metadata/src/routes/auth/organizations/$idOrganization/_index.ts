export { readOneOrganizationRouteDefinition } from "./readOneOrganization.js"


// years
export { createOneYearRouteDefinition } from "./years/createOneYear.js"
export { readAllYearsRouteDefinition } from "./years/readAllYears.js"


// settings
export { deleteOneOrganizationRouteDefinition } from "./organizationSettings/deleteOneOrganization.js"
export { updateOneOrganizationRouteDefinition } from "./organizationSettings/updateOneOrganization.js"

export { createOneOrganizationUserRouteDefinition } from "./organizationSettings/organizationUser/createOneOrganizationUser.js"
export { deleteOneOrganizationUserRouteDefinition } from "./organizationSettings/organizationUser/deleteOneOrganizationUser.js"
export { readAllOrganizationUsersRouteDefinition } from "./organizationSettings/organizationUser/readAllOrganizationUsers.js"
export { readOneOrganizationUserRouteDefinition } from "./organizationSettings/organizationUser/readOneOrganizationUser.js"
export { updateOneOrganizationUserRouteDefinition } from "./organizationSettings/organizationUser/updateOneOrganizationUser.js"


// year
export { readOneYearRouteDefinition } from "./years/$idYear/readOneYear.js"

export { deleteOneAccountRouteDefinition } from "./years/$idYear/yearSettings/accounts/$idAccount/deleteOneAccount.js"
export { readOneAccountRouteDefinition } from "./years/$idYear/yearSettings/accounts/$idAccount/readOneAccount.js"
export { updateOneAccountRouteDefinition } from "./years/$idYear/yearSettings/accounts/$idAccount/updateOneAccount.js"
export { createOneAccountRouteDefinition } from "./years/$idYear/yearSettings/accounts/createOneAccount.js"
export { generateAccountsRouteDefinition } from "./years/$idYear/yearSettings/accounts/generateAccounts.js"
export { readAllAccountsRouteDefinition } from "./years/$idYear/yearSettings/accounts/readAllAccounts.js"

export { deleteOneAttachmentRouteDefinition } from "./years/$idYear/attachments/$idAttachment/deleteOneAttachment.js"
export { generateAttachmentGetSignedUrlRouteDefinition } from "./years/$idYear/attachments/$idAttachment/generateAttachmentGetSignedUrl.js"
export { generateAttachmentPutSignedUrlRouteDefinition } from "./years/$idYear/attachments/$idAttachment/generateAttachmentPutSignedUrl.js"
export { readOneAttachmentRouteDefinition } from "./years/$idYear/attachments/$idAttachment/readOneAttachment.js"
export { updateOneAttachmentRouteDefinition } from "./years/$idYear/attachments/$idAttachment/updateOneAttachment.js"
export { createOneAttachmentRouteDefinition } from "./years/$idYear/attachments/createOneAttachment.js"
export { readAllAttachmentsRouteDefinition } from "./years/$idYear/attachments/readAllAttachments.js"

export { deleteOneBalanceSheetRouteDefinition } from "./years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/deleteOneBalanceSheet.js"
export { generateBalanceSheetDocumentRouteDefinition } from "./years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/generateBalanceSheetDocument.js"
export { readOneBalanceSheetRouteDefinition } from "./years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/readOneBalanceSheet.js"
export { updateOneBalanceSheetRouteDefinition } from "./years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/updateOneBalanceSheet.js"
export { connectAccountsToBalanceSheetsRouteDefinition } from "./years/$idYear/yearSettings/balanceSheets/connectAccountsToBalanceSheets.js"
export { createOneBalanceSheetRouteDefinition } from "./years/$idYear/yearSettings/balanceSheets/createOneBalanceSheet.js"
export { generateBalanceSheetsRouteDefinition } from "./years/$idYear/yearSettings/balanceSheets/generateBalanceSheets.js"
export { readAllBalanceSheetsRouteDefinition } from "./years/$idYear/yearSettings/balanceSheets/readAllBalanceSheets.js"

export { deleteOneComputationRouteDefinition } from "./years/$idYear/yearSettings/computations/$idComputation/deleteOneComputation.js"
export { readOneComputationRouteDefinition } from "./years/$idYear/yearSettings/computations/$idComputation/readOneComputation.js"
export { updateOneComputationRouteDefinition } from "./years/$idYear/yearSettings/computations/$idComputation/updateOneComputation.js"
export { createOneComputationRouteDefinition } from "./years/$idYear/yearSettings/computations/createOneComputation.js"
export { generateComputationsRouteDefinition } from "./years/$idYear/yearSettings/computations/generateComputations.js"
export { readAllComputationsRouteDefinition } from "./years/$idYear/yearSettings/computations/readAllComputations.js"

export { deleteOneComputationIncomeStatementRouteDefinition } from "./years/$idYear/yearSettings/computations/$idComputation/computationIncomeStatements/$idComputationIncomeStatement/deleteOneComputationIncomeStatement.js"
export { readOneComputationIncomeStatementRouteDefinition } from "./years/$idYear/yearSettings/computations/$idComputation/computationIncomeStatements/$idComputationIncomeStatement/readOneComputationIncomeStatement.js"
export { updateOneComputationIncomeStatementRouteDefinition } from "./years/$idYear/yearSettings/computations/$idComputation/computationIncomeStatements/$idComputationIncomeStatement/updateOneComputationIncomeStatement.js"
export { createOneComputationIncomeStatementRouteDefinition } from "./years/$idYear/yearSettings/computations/$idComputation/computationIncomeStatements/createOneComputationIncomeStatement.js"
export { readAllComputationIncomeStatementsRouteDefinition } from "./years/$idYear/yearSettings/computations/$idComputation/computationIncomeStatements/readAllComputationIncomeStatements.js"

export { generateDocumentGetSignedUrlRouteDefinition } from "./years/$idYear/reports/documents/$idDocument/generateDocumentGetSignedUrl.js"
export { readOneDocumentRouteDefinition } from "./years/$idYear/reports/documents/$idDocument/readOneDocument.js"
export { readAllDocumentsRouteDefinition } from "./years/$idYear/reports/documents/readAllDocuments.js"

export { deleteOneIncomeStatementRouteDefinition } from "./years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/deleteOneIncomeStatement.js"
export { generateIncomeStatementDocumentRouteDefinition } from "./years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/generateIncomeStatementDocument.js"
export { readOneIncomeStatementRouteDefinition } from "./years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/readOneIncomeStatement.js"
export { updateOneIncomeStatementRouteDefinition } from "./years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/updateOneIncomeStatement.js"
export { connectAccountsToIncomeStatementsRouteDefinition } from "./years/$idYear/yearSettings/incomeStatements/connectAccountsToIncomeStatements.js"
export { createOneIncomeStatementRouteDefinition } from "./years/$idYear/yearSettings/incomeStatements/createOneIncomeStatement.js"
export { generateIncomeStatementsRouteDefinition } from "./years/$idYear/yearSettings/incomeStatements/generateIncomeStatements.js"
export { readAllIncomeStatementsRouteDefinition } from "./years/$idYear/yearSettings/incomeStatements/readAllIncomeStatements.js"

export { deleteOneJournalRouteDefinition } from "./years/$idYear/yearSettings/journals/$idJournal/deleteOneJournal.js"
export { readOneJournalRouteDefinition } from "./years/$idYear/yearSettings/journals/$idJournal/readOneJournal.js"
export { updateOneJournalRouteDefinition } from "./years/$idYear/yearSettings/journals/$idJournal/updateOneJournal.js"
export { createOneJournalRouteDefinition } from "./years/$idYear/yearSettings/journals/createOneJournal.js"
export { generateJournalsRouteDefinition } from "./years/$idYear/yearSettings/journals/generateJournals.js"
export { readAllJournalsRouteDefinition } from "./years/$idYear/yearSettings/journals/readAllJournals.js"

export { computeOneRecordRouteDefinition } from "./years/$idYear/records/$idRecord/computeOneRecord.js"
export { deleteOneRecordRouteDefinition } from "./years/$idYear/records/$idRecord/deleteOneRecord.js"
export { duplicateOneRecordRouteDefinition } from "./years/$idYear/records/$idRecord/duplicateOneRecord.js"
export { readOneRecordRouteDefinition } from "./years/$idYear/records/$idRecord/readOneRecord.js"
export { updateOneRecordRouteDefinition } from "./years/$idYear/records/$idRecord/updateOneRecord.js"
export { createOneRecordRouteDefinition } from "./years/$idYear/records/createOneRecord.js"
export { readAllRecordsRouteDefinition } from "./years/$idYear/records/readAllRecords.js"

export { deleteOneRecordRowRouteDefinition } from "./years/$idYear/records/$idRecord/recordRows/$idRecordRow/deleteOneRecordRow.js"
export { readOneRecordRowRouteDefinition } from "./years/$idYear/records/$idRecord/recordRows/$idRecordRow/readOneRecordRow.js"
export { updateOneRecordRowRouteDefinition } from "./years/$idYear/records/$idRecord/recordRows/$idRecordRow/updateOneRecordRow.js"
export { createOneRecordRowRouteDefinition } from "./years/$idYear/records/$idRecord/recordRows/createOneRecordRow.js"
export { readAllRecordRowsRouteDefinition } from "./years/$idYear/records/$idRecord/recordRows/readAllRecordRows.js"

export { closeYearRouteDefinition } from "./years/$idYear/yearSettings/general/closeYear.js"
export { deleteOneYearRouteDefinition } from "./years/$idYear/yearSettings/general/deleteOneYear.js"
export { openYearRouteDefinition } from "./years/$idYear/yearSettings/general/openYear.js"
export { settleBalanceSheetRouteDefinition } from "./years/$idYear/yearSettings/general/settleBalanceSheet.js"
export { settleIncomeStatementRouteDefinition } from "./years/$idYear/yearSettings/general/settleIncomeStatement.js"
export { updateOneYearRouteDefinition } from "./years/$idYear/yearSettings/general/updateOneYear.js"

