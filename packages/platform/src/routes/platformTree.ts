import { catchRoute } from 'routes/catchRoute'
import { homeRoute } from 'routes/root/auth/homeRoute'
import { organizationLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/organizationLayoutRoute'
import { organizationPathRoute } from 'routes/root/auth/organizations/$idOrganization/organizationPathRoute'
import { organizationRoute } from 'routes/root/auth/organizations/$idOrganization/organizationRoute'
import { organizationSettingsLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/organizationSettings/organizationSettingsLayoutRoute'
import { organizationSettingsRoute } from 'routes/root/auth/organizations/$idOrganization/organizationSettings/organizationSettingsRoute'
import { organizationUsersLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/organizationSettings/organizationUsers/organizationUsersLayoutRoute'
import { organizationUsersRoute } from 'routes/root/auth/organizations/$idOrganization/organizationSettings/organizationUsers/organizationUsersRoute'
import { attachmentLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/attachmentLayoutRoute'
import { attachmentRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/attachments/$idAttachment/attachmentRoute'
import { attachmentsLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/attachments/attachmentsLayoutRoute'
import { attachmentsRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/attachments/attachmentsRoute'
import { recordRowLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/$idRecordRow/recordRowLayoutRoute'
import { recordRowRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/$idRecordRow/recordRowRoute'
import { recordLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/recordLayoutRoute'
import { recordRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/records/$idRecord/recordRoute'
import { recordsLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/records/recordsLayoutRoute'
import { recordsRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/records/recordsRoute'
import { balanceReportRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/reports/balanceReportRoute'
import { balanceSheetReportRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/reports/balanceSheetReportRoute'
import { incomeStatementReportRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/reports/incomeStatementReportRoute'
import { journalReportRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/reports/journalReportRoute'
import { ledgerReportRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/reports/ledgerReportRoute'
import { reportsLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/reports/reportsLayoutRoute'
import { reportsRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/reports/reportsRoute'
import { yearLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearLayoutRoute'
import { yearPathRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearPathRoute'
import { yearRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearRoute'
import { accountLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountLayoutRoute'
import { accountRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountRoute'
import { accountsLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsLayoutRoute'
import { accountsRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/accounts/accountsRoute'
import { balanceSheetLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetLayoutRoute'
import { balanceSheetRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetRoute'
import { balanceSheetsLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsLayoutRoute'
import { balanceSheetsRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/balanceSheetsRoute'
import { incomeStatementLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementLayoutRoute'
import { incomeStatementRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementRoute'
import { computationIncomeStatementLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/$idComputationIncomeStatement/computationIncomeStatementLayoutRoute'
import { computationIncomeStatementRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/$idComputationIncomeStatement/computationIncomeStatementRoute'
import { computationLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationLayoutRoute'
import { computationRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationRoute'
import { computationsLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/computationsLayoutRoute'
import { computationsRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/computationsRoute'
import { incomeStatementsLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsLayoutRoute'
import { incomeStatementsRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/incomeStatementsRoute'
import { journalLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/journalLayoutRoute'
import { journalRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/journalRoute'
import { journalsLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsLayoutRoute'
import { journalsRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsRoute'
import { yearSettingsLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsLayoutRoute'
import { yearSettingsRoute } from 'routes/root/auth/organizations/$idOrganization/years/$idYear/yearSettings/yearSettingsRoute'
import { yearsLayoutRoute } from 'routes/root/auth/organizations/$idOrganization/years/yearsLayoutRoute'
import { yearsPathRoute } from 'routes/root/auth/organizations/$idOrganization/years/yearsPathRoute'
import { yearsRoute } from 'routes/root/auth/organizations/$idOrganization/years/yearsRoute'
import { organizationsLayoutRoute } from 'routes/root/auth/organizations/organizationsLayoutRoute'
import { organizationsRoute } from 'routes/root/auth/organizations/organizationsRoute'
import { settingsLayoutRoute } from 'routes/root/auth/settings/settingsLayoutRoute'
import { settingsRoute } from 'routes/root/auth/settings/settingsRoute'
import { supportRoute } from 'routes/root/auth/support/supportRoute'
import { authLayoutRoute } from 'routes/root/authLayoutRoute'
import { signInRoute } from 'routes/root/public/signInRoute'
import { signUpRoute } from 'routes/root/public/signUpRoute'
import { publicLayoutRoute } from 'routes/root/publicLayoutRoute'
import { rootLayoutRoute } from './rootLayoutRoute'


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
