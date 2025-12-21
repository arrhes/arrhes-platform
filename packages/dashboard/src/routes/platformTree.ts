import { catchRoute } from "#/routes/catchRoute.js"
import { homeRoute } from "#/routes/root/auth/homeRoute.js"
import { organizationLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/organizationLayoutRoute.js"
import { organizationPathRoute } from "#/routes/root/auth/organizations/$idOrganization/organizationPathRoute.js"
import { organizationRoute } from "#/routes/root/auth/organizations/$idOrganization/organizationRoute.js"
import { organizationSettingsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/organizationSettings/organizationSettingsLayoutRoute.js"
import { organizationSettingsRoute } from "#/routes/root/auth/organizations/$idOrganization/organizationSettings/organizationSettingsRoute.js"
import { organizationUsersLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/organizationSettings/organizationUsers/organizationUsersLayoutRoute.js"
import { organizationUsersRoute } from "#/routes/root/auth/organizations/$idOrganization/organizationSettings/organizationUsers/organizationUsersRoute.js"
import { attachmentLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/attachmentLayoutRoute.js"
import { attachmentRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/attachmentRoute.js"
import { attachmentsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/attachments/attachmentsLayoutRoute.js"
import { attachmentsRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/attachments/attachmentsRoute.js"
import { recordRowLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/$idRecordRow/recordRowLayoutRoute.js"
import { recordRowRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/$idRecordRow/recordRowRoute.js"
import { recordLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/recordLayoutRoute.js"
import { recordRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/recordRoute.js"
import { recordsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/records/recordsLayoutRoute.js"
import { recordsRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/records/recordsRoute.js"
import { balanceReportRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/balanceReportRoute.js"
import { balanceSheetReportRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/balanceSheetReportRoute.js"
import { incomeStatementReportRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/incomeStatementReportRoute.js"
import { journalReportRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/journalReportRoute.js"
import { ledgerReportRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/ledgerReportRoute.js"
import { reportsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute.js"
import { reportsRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/reports/reportsRoute.js"
import { yearLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearLayoutRoute.js"
import { yearPathRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearPathRoute.js"
import { yearRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearRoute.js"
import { accountLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountLayoutRoute.js"
import { accountRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountRoute.js"
import { accountsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsLayoutRoute.js"
import { accountsRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsRoute.js"
import { balanceSheetLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetLayoutRoute.js"
import { balanceSheetRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetRoute.js"
import { balanceSheetsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsLayoutRoute.js"
import { balanceSheetsRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsRoute.js"
import { incomeStatementLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementLayoutRoute.js"
import { incomeStatementRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementRoute.js"
import { computationIncomeStatementLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/$idComputationIncomeStatement/computationIncomeStatementLayoutRoute.js"
import { computationIncomeStatementRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/$idComputationIncomeStatement/computationIncomeStatementRoute.js"
import { computationLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationLayoutRoute.js"
import { computationRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationRoute.js"
import { computationsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/computationsLayoutRoute.js"
import { computationsRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/computationsRoute.js"
import { incomeStatementsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsLayoutRoute.js"
import { incomeStatementsRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsRoute.js"
import { journalLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/journalLayoutRoute.js"
import { journalRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/journalRoute.js"
import { journalsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsLayoutRoute.js"
import { journalsRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsRoute.js"
import { recordLabelLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/$idRecordLabel/recordLabelLayoutRoute.js"
import { recordLabelRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/$idRecordLabel/recordLabelRoute.js"
import { recordLabelsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/recordLabelsLayoutRoute.js"
import { recordLabelsRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/recordLabelsRoute.js"
import { yearSettingsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute.js"
import { yearSettingsRoute } from "#/routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsRoute.js"
import { yearsLayoutRoute } from "#/routes/root/auth/organizations/$idOrganization/years/yearsLayoutRoute.js"
import { yearsPathRoute } from "#/routes/root/auth/organizations/$idOrganization/years/yearsPathRoute.js"
import { yearsRoute } from "#/routes/root/auth/organizations/$idOrganization/years/yearsRoute.js"
import { organizationsLayoutRoute } from "#/routes/root/auth/organizations/organizationsLayoutRoute.js"
import { organizationsRoute } from "#/routes/root/auth/organizations/organizationsRoute.js"
import { settingsLayoutRoute } from "#/routes/root/auth/settings/settingsLayoutRoute.js"
import { settingsRoute } from "#/routes/root/auth/settings/settingsRoute.js"
import { supportRoute } from "#/routes/root/auth/support/supportRoute.js"
import { authLayoutRoute } from "#/routes/root/authLayoutRoute.js"
import { signInRoute } from "#/routes/root/public/signInRoute.js"
import { signUpRoute } from "#/routes/root/public/signUpRoute.js"
import { publicLayoutRoute } from "#/routes/root/publicLayoutRoute.js"
import { rootLayoutRoute } from "#/routes/rootLayoutRoute.js"


export const platformTree = rootLayoutRoute.addChildren([
    authLayoutRoute.addChildren([
        homeRoute,
        organizationsLayoutRoute.addChildren([
            organizationsRoute,
            organizationPathRoute.addChildren([
                organizationLayoutRoute.addChildren([
                    organizationRoute,
                    yearsLayoutRoute.addChildren([
                        yearsRoute
                    ]),
                    organizationSettingsLayoutRoute.addChildren([
                        organizationSettingsRoute,
                        organizationUsersLayoutRoute.addChildren([
                            organizationUsersRoute
                        ])
                    ])
                ]),
                yearsPathRoute.addChildren([
                    yearPathRoute.addChildren([
                        yearLayoutRoute.addChildren([
                            yearRoute,
                            recordsLayoutRoute.addChildren([
                                recordsRoute,
                                recordLayoutRoute.addChildren([
                                    recordRoute,
                                    recordRowLayoutRoute.addChildren([
                                        recordRowRoute
                                    ])
                                ])
                            ]),
                            attachmentsLayoutRoute.addChildren([
                                attachmentsRoute,
                                attachmentLayoutRoute.addChildren([
                                    attachmentRoute
                                ])
                            ]),
                            reportsLayoutRoute.addChildren([
                                reportsRoute,
                                journalReportRoute,
                                ledgerReportRoute,
                                balanceReportRoute,
                                balanceSheetReportRoute,
                                incomeStatementReportRoute,
                            ]),
                            yearSettingsLayoutRoute.addChildren([
                                yearSettingsRoute,
                                accountsLayoutRoute.addChildren([
                                    accountsRoute,
                                    accountLayoutRoute.addChildren([
                                        accountRoute
                                    ])
                                ]),
                                journalsLayoutRoute.addChildren([
                                    journalsRoute,
                                    journalLayoutRoute.addChildren([
                                        journalRoute
                                    ])
                                ]),
                                recordLabelsLayoutRoute.addChildren([
                                    recordLabelsRoute,
                                    recordLabelLayoutRoute.addChildren([
                                        recordLabelRoute
                                    ])
                                ]),
                                balanceSheetsLayoutRoute.addChildren([
                                    balanceSheetsRoute,
                                    balanceSheetLayoutRoute.addChildren([
                                        balanceSheetRoute
                                    ])
                                ]),
                                incomeStatementsLayoutRoute.addChildren([
                                    incomeStatementsRoute,
                                    incomeStatementLayoutRoute.addChildren([
                                        incomeStatementRoute,
                                    ]),
                                    computationsLayoutRoute.addChildren([
                                        computationsRoute,
                                        computationLayoutRoute.addChildren([
                                            computationRoute,
                                            computationIncomeStatementLayoutRoute.addChildren([
                                                computationIncomeStatementRoute,
                                            ])
                                        ])
                                    ]),
                                ]),
                            ])
                        ])
                    ])
                ]),
            ])
        ]),
        settingsLayoutRoute.addChildren([
            settingsRoute,
        ]),
        supportRoute,
    ]),
    publicLayoutRoute.addChildren([
        signUpRoute,
        signInRoute,
    ]),
    catchRoute,
])
