# API Documentation

Arrhes is a French double-entry accounting application. The API is built with [Hono](https://hono.dev/) and uses a flat, body-based routing model: all routes are **POST** endpoints, and entity IDs / scoping are passed in the request body (not URL parameters).

## Conventions

- **All routes use the POST method.**
- **Request body:** JSON. Validated with [Valibot](https://valibot.dev/) schemas.
- **Response body:** JSON.
- **Authentication:** Cookie-based sessions. Auth routes require the `arrhes_id_user_session` cookie set during sign-in.
- **Errors:** Returned as `{ "message": "<French error message>" }` with the appropriate HTTP status code.
- **IDs:** NanoID-style string identifiers.
- **Dates:** ISO 8601 strings.
- **Amounts:** `debit` and `credit` are numeric strings (e.g. `"100.00"`).

## Route categories

| # | Category | Prefix | Routes | Auth required |
|---|----------|--------|--------|---------------|
| 1 | [Authentication](#1-authentication) | `/public` | 4 | No |
| 2 | [Webhooks](#2-webhooks) | `/public` | 1 | No |
| 3 | [User settings](#3-user-settings) | `/auth` | 6 | Yes |
| 4 | [Support](#4-support) | `/auth` | 1 | Yes |
| 5 | [Organizations](#5-organizations) | `/auth` | 4 | Yes |
| 6 | [Organization settings](#6-organization-settings) | `/auth` | 2 | Yes (admin) |
| 7 | [API keys](#7-api-keys) | `/auth` | 3 | Yes (premium) |
| 8 | [Subscription & payments](#8-subscription--payments) | `/auth` | 4 | Yes (admin) |
| 9 | [Organization users](#9-organization-users) | `/auth` | 5 | Yes |
| 10 | [Years](#10-years) | `/auth` | 3 | Yes |
| 11 | [Year settings](#11-year-settings) | `/auth` | 6 | Yes |
| 12 | [Accounts](#12-accounts) | `/auth` | 6 | Yes |
| 13 | [Journals](#13-journals) | `/auth` | 6 | Yes |
| 14 | [Balance sheets](#14-balance-sheets) | `/auth` | 7 | Yes |
| 15 | [Income statements](#15-income-statements) | `/auth` | 7 | Yes |
| 16 | [Record labels](#16-record-labels) | `/auth` | 5 | Yes |
| 17 | [Computations](#17-computations) | `/auth` | 6 | Yes |
| 18 | [Computation income statements](#18-computation-income-statements) | `/auth` | 5 | Yes |
| 19 | [Records](#19-records) | `/auth` | 8 | Yes |
| 20 | [Record rows](#20-record-rows) | `/auth` | 6 | Yes |
| 21 | [Files](#21-files) | `/auth` | 7 | Yes |
| 22 | [Folders](#22-folders) | `/auth` | 5 | Yes |
| 23 | [Reports & documents](#23-reports--documents) | `/auth` | 5 | Yes |

**Total: 112 routes**

---

## 1. Authentication

### `POST /public/sign-up`
Create a new user account.

| Body field | Type | Required |
|------------|------|----------|
| `email` | string | yes |
| `password` | string | yes |
| `passwordCheck` | string | yes |

**Returns:** `{}`  
**Errors:** `400` — passwords don't match, validation error.

### `POST /public/sign-in`
Sign in with email and password. Sets `arrhes_id_user_session` and `arrhes_is_auth` cookies.

| Body field | Type | Required |
|------------|------|----------|
| `email` | string | yes |
| `password` | string | yes |

**Returns:** `{}`  
**Errors:** `400` — invalid credentials.

### `POST /public/sign-out`
Sign out and invalidate the current session.

| Body field | Type | Required |
|------------|------|----------|
| *(none)* | — | — |

**Returns:** `{}`

### `POST /public/send-magic-link`
Send a magic link for passwordless sign-in.

| Body field | Type | Required |
|------------|------|----------|
| `email` | string | yes |

**Returns:** `{}`

---

## 2. Webhooks

### `POST /public/mollie-webhook`
Receives payment status updates from Mollie. Not intended for direct use.

| Body field | Type | Required |
|------------|------|----------|
| `id` | string | yes |

**Returns:** `{}`

---

## 3. User settings

### `POST /auth/read-user-session`
Read the current user session and user data.

| Body field | Type | Required |
|------------|------|----------|
| *(none)* | — | — |

**Returns:** `{ ...userSession, user: { id, email, alias, ... } }`

### `POST /auth/update-user`
Update the current user's profile.

| Body field | Type | Required |
|------------|------|----------|
| `alias` | string \| null | no |

**Returns:** `user`

### `POST /auth/update-user-email`
Change the current user's email address. Requires current password.

| Body field | Type | Required |
|------------|------|----------|
| `currentPassword` | string | yes |
| `emailToValidate` | string | yes |

**Returns:** `user`

### `POST /auth/update-user-password`
Change the current user's password.

| Body field | Type | Required |
|------------|------|----------|
| `currentPassword` | string | yes |
| `newPassword` | string | yes |
| `newPasswordCheck` | string | yes |

**Returns:** `user`  
**Errors:** `400` — passwords don't match, wrong current password.

### `POST /auth/activate-user`
Activate a user account via email token.

| Body field | Type | Required |
|------------|------|----------|
| `emailToken` | string | yes |

**Returns:** `user`

### `POST /auth/validate-user-email`
Validate a new email address via email token.

| Body field | Type | Required |
|------------|------|----------|
| `emailToken` | string | yes |

**Returns:** `user`

---

## 4. Support

### `POST /auth/send-support-message`
Send a support ticket.

| Body field | Type | Required |
|------------|------|----------|
| `category` | string \| null | no |
| `message` | string | yes |

**Returns:** `{}`

---

## 5. Organizations

### `POST /auth/get-all-my-organization`
List all organizations the current user belongs to.

| Body field | Type | Required |
|------------|------|----------|
| *(none)* | — | — |

**Returns:** `Array<{ ...organizationUser, organization }>`

### `POST /auth/add-new-organization`
Create a new organization.

| Body field | Type | Required |
|------------|------|----------|
| `scope` | string | yes |
| `name` | string | yes |
| `siren` | string | no |
| `email` | string | no |

**Returns:** `organization`

### `POST /auth/activate-organization-membership`
Activate an organization membership invitation.

| Body field | Type | Required |
|------------|------|----------|
| `idOrganizationUser` | string | yes |

**Returns:** `{}`

### `POST /auth/read-one-organization`
Read a single organization's details.

| Body field | Type | Required |
|------------|------|----------|
| `idOrganization` | string | yes |

**Returns:** `organization`

---

## 6. Organization settings

Requires the user to be an **admin** of the organization.

### `POST /auth/update-one-organization`
Update an organization's details.

| Body field | Type | Required |
|------------|------|----------|
| `idOrganization` | string | yes |
| `siren` | string | no |
| `name` | string | no |
| `email` | string | no |

**Returns:** `organization`  
**Errors:** `401` — not an admin.

### `POST /auth/delete-one-organization`
Delete an organization.

| Body field | Type | Required |
|------------|------|----------|
| `idOrganization` | string | yes |

**Returns:** `{}`  
**Errors:** `401` — not an admin.

---

## 7. API keys

Requires a premium subscription.

### `POST /auth/read-all-api-keys`

| Body field | Type | Required |
|------------|------|----------|
| `idOrganization` | string | yes |

**Returns:** `Array<apiKey>`

### `POST /auth/create-one-api-key`

| Body field | Type | Required |
|------------|------|----------|
| `idOrganization` | string | yes |
| `name` | string | yes |

**Returns:** `{ ...apiKey, rawKey: string }`  
The `rawKey` is only returned at creation time.

### `POST /auth/delete-one-api-key`

| Body field | Type | Required |
|------------|------|----------|
| `idApiKey` | string | yes |
| `idOrganization` | string | yes |

**Returns:** `{}`

---

## 8. Subscription & payments

### `POST /auth/read-organization-subscription`
Read the subscription status.

| Body field | Type | Required |
|------------|------|----------|
| `idOrganization` | string | yes |

**Returns:** `{ isPremium, subcriptionEndingAt, mollieSubscriptionId, status, subscriptionStatus }`

### `POST /auth/create-first-payment`
Initiate the first payment to activate the subscription. Returns a Mollie checkout URL.

| Body field | Type | Required |
|------------|------|----------|
| `idOrganization` | string | yes |

**Returns:** `{ checkoutUrl: string }`  
**Errors:** `401` — not an admin. `400` — missing organization info.

### `POST /auth/cancel-subscription`
Cancel the current subscription. Access continues until the end of the current period.

| Body field | Type | Required |
|------------|------|----------|
| `idOrganization` | string | yes |

**Returns:** `{}`  
**Errors:** `401` — not an admin. `400` — no active subscription.

### `POST /auth/read-all-organization-payments`
List all payment records for the organization.

| Body field | Type | Required |
|------------|------|----------|
| `idOrganization` | string | yes |

**Returns:** `Array<organizationPayment>`  
**Errors:** `401` — not an admin.

---

## 9. Organization users

### `POST /auth/read-all-organization-users`

| Body field | Type | Required |
|------------|------|----------|
| `idOrganization` | string | yes |

**Returns:** `Array<{ ...organizationUser, user: { id, email, alias } }>`

### `POST /auth/read-one-organization-user`

| Body field | Type | Required |
|------------|------|----------|
| `idOrganizationUser` | string | yes |
| `idOrganization` | string | yes |

**Returns:** `{ ...organizationUser, user: { id, email, alias } }`

### `POST /auth/create-one-organization-user`
Invite a user to the organization.

| Body field | Type | Required |
|------------|------|----------|
| `idOrganization` | string | yes |
| `isAdmin` | boolean | yes |
| `user` | `{ email: string }` | yes |

**Returns:** `organizationUser`

### `POST /auth/update-one-organization-user`

| Body field | Type | Required |
|------------|------|----------|
| `idOrganizationUser` | string | yes |
| `idOrganization` | string | yes |
| `isAdmin` | boolean | no |

**Returns:** `organizationUser`

### `POST /auth/delete-one-organization-user`

| Body field | Type | Required |
|------------|------|----------|
| `idOrganizationUser` | string | yes |
| `idOrganization` | string | yes |

**Returns:** `{}`

---

## 10. Years

### `POST /auth/read-all-years`

| Body field | Type | Required |
|------------|------|----------|
| `idOrganization` | string | yes |

**Returns:** `Array<year>`

### `POST /auth/create-one-year`

| Body field | Type | Required |
|------------|------|----------|
| `idOrganization` | string | yes |
| `idYearPrevious` | string | no |
| `label` | string | no |
| `startingAt` | string | yes |
| `endingAt` | string | yes |

**Returns:** `year`

### `POST /auth/read-one-year`

| Body field | Type | Required |
|------------|------|----------|
| `idYear` | string | yes |
| `idOrganization` | string | yes |

**Returns:** `year`

---

## 11. Year settings

### `POST /auth/update-one-year`

| Body field | Type | Required |
|------------|------|----------|
| `idYear` | string | yes |
| `idOrganization` | string | yes |
| `idYearPrevious` | string | no |
| `label` | string | no |
| `startingAt` | string | no |
| `endingAt` | string | no |

**Returns:** `year`

### `POST /auth/delete-one-year`

| Body field | Type | Required |
|------------|------|----------|
| `idYear` | string | yes |
| `idOrganization` | string | yes |

**Returns:** `{}`

### `POST /auth/close-year`
Close an accounting year (prevents further edits).

| Body field | Type | Required |
|------------|------|----------|
| `idYear` | string | yes |
| `idOrganization` | string | yes |

**Returns:** `year`

### `POST /auth/open-year`
Create opening entries from the previous year's closing balances.

| Body field | Type | Required |
|------------|------|----------|
| `idYear` | string | yes |
| `idOrganization` | string | yes |
| `idJournalOpening` | string | yes |

**Returns:** `{}`

### `POST /auth/settle-balance-sheet`
Create closing entries for balance sheet accounts.

| Body field | Type | Required |
|------------|------|----------|
| `idYear` | string | yes |
| `idOrganization` | string | yes |
| `idJournalClosing` | string | yes |

**Returns:** `{}`

### `POST /auth/settle-income-statement`
Create closing entries for income statement accounts and transfer the result to profit or loss.

| Body field | Type | Required |
|------------|------|----------|
| `idYear` | string | yes |
| `idOrganization` | string | yes |
| `idJournalClosing` | string | yes |
| `idAccountProfit` | string | yes |
| `idAccountLoss` | string | yes |

**Returns:** `{}`

---

## 12. Accounts

All routes require `idOrganization` and `idYear`.

### `POST /auth/read-all-accounts`

**Returns:** `Array<account>`

### `POST /auth/read-one-account`

| Body field | Type | Required |
|------------|------|----------|
| `idAccount` | string | yes |

**Returns:** `account`

### `POST /auth/create-one-account`

| Body field | Type | Required |
|------------|------|----------|
| `idAccountParent` | string | yes |
| `number` | string | yes |
| `label` | string | yes |
| `type` | string | yes |
| `isClass` | boolean | yes |
| `isSelectable` | boolean | yes |
| `idBalanceSheetAsset` | string | no |
| `balanceSheetAssetColumn` | string | no |
| `balanceSheetAssetFlow` | string | no |
| `idBalanceSheetLiability` | string | no |
| `balanceSheetLiabilityColumn` | string | no |
| `balanceSheetLiabilityFlow` | string | no |
| `idIncomeStatement` | string | no |

**Returns:** `account`

### `POST /auth/update-one-account`

Same fields as create, plus `idAccount`. All fields except IDs are optional.

**Returns:** `account`

### `POST /auth/delete-one-account`

| Body field | Type | Required |
|------------|------|----------|
| `idAccount` | string | yes |

**Returns:** `{}`

### `POST /auth/generate-accounts`
Generate the default French chart of accounts (PCG).

| Body field | Type | Required |
|------------|------|----------|
| `isMinimalSystem` | boolean \| null | no |
| `isReplicatingAccounts` | boolean \| null | no |

**Returns:** `Array<account>`

---

## 13. Journals

All routes require `idOrganization` and `idYear`.

### `POST /auth/read-all-journals`
**Returns:** `Array<journal>`

### `POST /auth/read-one-journal`
| Body field | Type | Required |
|------------|------|----------|
| `idJournal` | string | yes |

**Returns:** `journal`

### `POST /auth/create-one-journal`
| Body field | Type | Required |
|------------|------|----------|
| `code` | string | yes |
| `label` | string | yes |

**Returns:** `journal`

### `POST /auth/update-one-journal`
| Body field | Type | Required |
|------------|------|----------|
| `idJournal` | string | yes |
| `code` | string | no |
| `label` | string | no |

**Returns:** `journal`

### `POST /auth/delete-one-journal`
| Body field | Type | Required |
|------------|------|----------|
| `idJournal` | string | yes |

**Returns:** `{}`

### `POST /auth/generate-journals`
Generate the default set of journals.

**Returns:** `Array<journal>`

---

## 14. Balance sheets

All routes require `idOrganization` and `idYear`.

### `POST /auth/read-all-balance-sheets`
**Returns:** `Array<balanceSheet>`

### `POST /auth/read-one-balance-sheet`
| Body field | Type | Required |
|------------|------|----------|
| `idBalanceSheet` | string | yes |

**Returns:** `balanceSheet`

### `POST /auth/create-one-balance-sheet`
| Body field | Type | Required |
|------------|------|----------|
| `idBalanceSheetParent` | string | yes |
| `isComputed` | boolean | yes |
| `side` | string | yes |
| `number` | string | yes |
| `label` | string | yes |

**Returns:** `balanceSheet`

### `POST /auth/update-one-balance-sheet`
| Body field | Type | Required |
|------------|------|----------|
| `idBalanceSheet` | string | yes |
| `idBalanceSheetParent` | string | no |
| `isComputed` | boolean | no |
| `side` | string | no |
| `number` | string | no |
| `label` | string | no |

**Returns:** `balanceSheet`

### `POST /auth/delete-one-balance-sheet`
| Body field | Type | Required |
|------------|------|----------|
| `idBalanceSheet` | string | yes |

**Returns:** `{}`

### `POST /auth/generate-balance-sheets`
Generate the default French balance sheet structure.

**Returns:** `Array<balanceSheet>`

### `POST /auth/connect-accounts-to-balance-sheets`
Automatically link accounts to their corresponding balance sheet lines.

**Returns:** `{}`

---

## 15. Income statements

All routes require `idOrganization` and `idYear`.

### `POST /auth/read-all-income-statements`
**Returns:** `Array<incomeStatement>`

### `POST /auth/read-one-income-statement`
| Body field | Type | Required |
|------------|------|----------|
| `idIncomeStatement` | string | yes |

**Returns:** `incomeStatement`

### `POST /auth/create-one-income-statement`
| Body field | Type | Required |
|------------|------|----------|
| `idIncomeStatementParent` | string | yes |
| `isComputed` | boolean | yes |
| `number` | string | yes |
| `label` | string | yes |

**Returns:** `incomeStatement`

### `POST /auth/update-one-income-statement`
| Body field | Type | Required |
|------------|------|----------|
| `idIncomeStatement` | string | yes |
| `idIncomeStatementParent` | string | no |
| `isComputed` | boolean | no |
| `number` | string | no |
| `label` | string | no |

**Returns:** `incomeStatement`

### `POST /auth/delete-one-income-statement`
| Body field | Type | Required |
|------------|------|----------|
| `idIncomeStatement` | string | yes |

**Returns:** `incomeStatement`

### `POST /auth/generate-income-statements`
Generate the default French income statement structure.

**Returns:** `Array<incomeStatement>`

### `POST /auth/connect-accounts-to-income-statements`
Automatically link accounts to their corresponding income statement lines.

**Returns:** `{}`

---

## 16. Record labels

All routes require `idOrganization` and `idYear`.

### `POST /auth/read-all-record-labels`
**Returns:** `Array<recordLabel>`

### `POST /auth/read-one-record-label`
| Body field | Type | Required |
|------------|------|----------|
| `idRecordLabel` | string | yes |

**Returns:** `recordLabel`

### `POST /auth/create-one-record-label`
| Body field | Type | Required |
|------------|------|----------|
| `label` | string | yes |

**Returns:** `recordLabel`

### `POST /auth/update-one-record-label`
| Body field | Type | Required |
|------------|------|----------|
| `idRecordLabel` | string | yes |
| `label` | string | no |

**Returns:** `recordLabel`

### `POST /auth/delete-one-record-label`
| Body field | Type | Required |
|------------|------|----------|
| `idRecordLabel` | string | yes |

**Returns:** `{}`

---

## 17. Computations

Computations are custom formulas that combine income statement lines to produce derived values (e.g. EBITDA). All routes require `idOrganization` and `idYear`.

### `POST /auth/read-all-computations`
**Returns:** `Array<computation>`

### `POST /auth/read-one-computation`
| Body field | Type | Required |
|------------|------|----------|
| `idComputation` | string | yes |

**Returns:** `computation`

### `POST /auth/create-one-computation`
| Body field | Type | Required |
|------------|------|----------|
| `index` | number | yes |
| `number` | string | yes |
| `label` | string | yes |

**Returns:** `computation`

### `POST /auth/update-one-computation`
| Body field | Type | Required |
|------------|------|----------|
| `idComputation` | string | yes |
| `index` | number | no |
| `number` | string | no |
| `label` | string | no |

**Returns:** `computation`

### `POST /auth/delete-one-computation`
| Body field | Type | Required |
|------------|------|----------|
| `idComputation` | string | yes |

**Returns:** `{}`

### `POST /auth/generate-computations`
Generate the default set of computations based on existing income statements.

**Returns:** `Array<computation>`

---

## 18. Computation income statements

Links between computations and income statement lines. Each link defines whether the income statement line is added or subtracted. All routes require `idOrganization` and `idYear`.

### `POST /auth/read-all-computation-income-statements`
| Body field | Type | Required |
|------------|------|----------|
| `idComputation` | string | no |
| `idIncomeStatement` | string | no |

**Returns:** `Array<computationIncomeStatement>`

### `POST /auth/read-one-computation-income-statement`
| Body field | Type | Required |
|------------|------|----------|
| `idComputationIncomeStatement` | string | yes |

**Returns:** `computationIncomeStatement`

### `POST /auth/create-one-computation-income-statement`
| Body field | Type | Required |
|------------|------|----------|
| `idComputation` | string | yes |
| `idIncomeStatement` | string | yes |
| `index` | number | yes |
| `operation` | string | yes |

**Returns:** `computationIncomeStatement`

### `POST /auth/update-one-computation-income-statement`
| Body field | Type | Required |
|------------|------|----------|
| `idComputationIncomeStatement` | string | yes |
| `idComputation` | string | no |
| `idIncomeStatement` | string | no |
| `index` | number | no |
| `operation` | string | no |

**Returns:** `computationIncomeStatement`

### `POST /auth/delete-one-computation-income-statement`
| Body field | Type | Required |
|------------|------|----------|
| `idComputationIncomeStatement` | string | yes |

**Returns:** `{}`

---

## 19. Records

A record is an accounting entry (ecriture comptable). All routes require `idOrganization` and `idYear`.

### `POST /auth/read-all-records`
**Returns:** `Array<record>`

### `POST /auth/read-one-record`
| Body field | Type | Required |
|------------|------|----------|
| `idRecord` | string | yes |

**Returns:** `record`

### `POST /auth/create-one-record`
| Body field | Type | Required |
|------------|------|----------|
| `label` | string | yes |
| `date` | string | yes |
| `idJournal` | string | no |
| `idRecordLabel` | string | no |
| `idFile` | string | no |

**Returns:** `record`

### `POST /auth/create-one-record-from-template`
Create a record with pre-filled rows in a single transaction.

| Body field | Type | Required |
|------------|------|----------|
| `label` | string | yes |
| `date` | string | yes |
| `idJournal` | string | no |
| `idRecordLabel` | string | no |
| `idFile` | string | no |
| `rows` | Array | yes |

Each row: `{ idAccount, isComputedForJournalReport, isComputedForLedgerReport, isComputedForBalanceReport, isComputedForBalanceSheetReport, isComputedForIncomeStatementReport, label?, debit?, credit? }`

**Returns:** `record`

### `POST /auth/update-one-record`
| Body field | Type | Required |
|------------|------|----------|
| `idRecord` | string | yes |
| `label` | string | no |
| `date` | string | no |
| `idJournal` | string | no |
| `idRecordLabel` | string | no |
| `idFile` | string | no |

**Returns:** `record`

### `POST /auth/delete-one-record`
| Body field | Type | Required |
|------------|------|----------|
| `idRecord` | string | yes |

**Returns:** `{}`

### `POST /auth/duplicate-one-record`
Duplicate a record and all its rows.

| Body field | Type | Required |
|------------|------|----------|
| `idRecord` | string | yes |

**Returns:** `record`

### `POST /auth/compute-one-record`
Recompute all reporting flags for a record's rows.

| Body field | Type | Required |
|------------|------|----------|
| `idRecord` | string | yes |

**Returns:** `record`

---

## 20. Record rows

A record row is a single line in an accounting entry (one debit or credit). All routes require `idOrganization` and `idYear`.

### `POST /auth/read-all-record-rows`
| Body field | Type | Required |
|------------|------|----------|
| `idRecord` | string | no |

**Returns:** `Array<recordRow>`

### `POST /auth/read-one-record-row`
| Body field | Type | Required |
|------------|------|----------|
| `idRecordRow` | string | yes |

**Returns:** `recordRow`

### `POST /auth/create-one-record-row`
| Body field | Type | Required |
|------------|------|----------|
| `idRecord` | string | yes |
| `idAccount` | string | yes |
| `isComputedForJournalReport` | boolean | yes |
| `isComputedForLedgerReport` | boolean | yes |
| `isComputedForBalanceReport` | boolean | yes |
| `isComputedForBalanceSheetReport` | boolean | yes |
| `isComputedForIncomeStatementReport` | boolean | yes |
| `label` | string | no |
| `debit` | string | no |
| `credit` | string | no |

**Returns:** `recordRow`

### `POST /auth/update-one-record-row`
| Body field | Type | Required |
|------------|------|----------|
| `idRecordRow` | string | yes |
| `idRecord` | string | no |
| `idAccount` | string | no |
| `isComputedForJournalReport` | boolean | no |
| `isComputedForLedgerReport` | boolean | no |
| `isComputedForBalanceReport` | boolean | no |
| `isComputedForBalanceSheetReport` | boolean | no |
| `isComputedForIncomeStatementReport` | boolean | no |
| `label` | string | no |
| `debit` | string | no |
| `credit` | string | no |

**Returns:** `recordRow`

### `POST /auth/update-many-record-rows`
Bulk-update all rows of a record.

| Body field | Type | Required |
|------------|------|----------|
| `idRecord` | string | yes |
| `isComputedForJournalReport` | boolean | no |
| `isComputedForLedgerReport` | boolean | no |
| `isComputedForBalanceReport` | boolean | no |
| `isComputedForBalanceSheetReport` | boolean | no |
| `isComputedForIncomeStatementReport` | boolean | no |
| `label` | string | no |

**Returns:** `Array<recordRow>`

### `POST /auth/delete-one-record-row`
| Body field | Type | Required |
|------------|------|----------|
| `idRecordRow` | string | yes |

**Returns:** `{}`

---

## 21. Files

Files are attached to accounting years and optionally placed in folders. Storage uses S3-compatible signed URLs. All routes require `idOrganization` and `idYear`.

### `POST /auth/read-all-files`
**Returns:** `Array<file>`

### `POST /auth/read-one-file`
| Body field | Type | Required |
|------------|------|----------|
| `idFile` | string | yes |

**Returns:** `file`

### `POST /auth/create-one-file`
| Body field | Type | Required |
|------------|------|----------|
| `reference` | string | yes |
| `name` | string | no |
| `idFolder` | string | no |

**Returns:** `file`

### `POST /auth/update-one-file`
| Body field | Type | Required |
|------------|------|----------|
| `idFile` | string | yes |
| `reference` | string | no |
| `name` | string | no |
| `idFolder` | string | no |

**Returns:** `file`

### `POST /auth/delete-one-file`
| Body field | Type | Required |
|------------|------|----------|
| `idFile` | string | yes |

**Returns:** `{}`

### `POST /auth/generate-file-put-signed-url`
Generate a signed URL to upload a file to storage. Maximum file size: 10 MB.

| Body field | Type | Required |
|------------|------|----------|
| `idFile` | string | yes |
| `type` | string | yes |
| `size` | number | yes |

**Returns:** `{ file, url: string }`  
**Errors:** `400` — file too large, storage limit exceeded.

### `POST /auth/generate-file-get-signed-url`
Generate a signed URL to download a file from storage.

| Body field | Type | Required |
|------------|------|----------|
| `idFile` | string | yes |

**Returns:** `{ url: string }`

---

## 22. Folders

Folders organize files within a year. All routes require `idOrganization` and `idYear`.

### `POST /auth/read-all-folders`
**Returns:** `Array<folder>`

### `POST /auth/read-one-folder`
| Body field | Type | Required |
|------------|------|----------|
| `idFolder` | string | yes |

**Returns:** `folder`

### `POST /auth/create-one-folder`
| Body field | Type | Required |
|------------|------|----------|
| `name` | string | yes |
| `idFolderParent` | string | no |

**Returns:** `folder`

### `POST /auth/update-one-folder`
| Body field | Type | Required |
|------------|------|----------|
| `idFolder` | string | yes |
| `name` | string | no |
| `idFolderParent` | string | no |

**Returns:** `folder`

### `POST /auth/delete-one-folder`
| Body field | Type | Required |
|------------|------|----------|
| `idFolder` | string | yes |

**Returns:** `{}`

---

## 23. Reports & documents

Generated PDF reports for balance sheets and income statements. All routes require `idOrganization` and `idYear`.

### `POST /auth/read-all-documents`
**Returns:** `Array<document>`

### `POST /auth/read-one-document`
| Body field | Type | Required |
|------------|------|----------|
| `idDocument` | string | yes |

**Returns:** `document`

### `POST /auth/generate-balance-sheet-report-document`
Generate a PDF balance sheet report.

**Returns:** `document`

### `POST /auth/generate-income-statement-report-document`
Generate a PDF income statement report.

**Returns:** `document`

### `POST /auth/generate-document-get-signed-url`
Generate a signed URL to download a generated document.

| Body field | Type | Required |
|------------|------|----------|
| `idDocument` | string | yes |

**Returns:** `{ url: string }`

---

## Error responses

All errors follow this format:

```json
{
  "message": "Error description in French"
}
```

| Status code | Meaning |
|-------------|---------|
| `400` | Bad request — validation error, business rule violation |
| `401` | Unauthorized — missing/invalid session, insufficient permissions |
| `404` | Not found — endpoint does not exist |
| `500` | Internal server error |

Common French error messages:

| Message | Meaning |
|---------|---------|
| `"Identifiants incorrects"` | Wrong email or password |
| `"Les mots de passe ne correspondent pas"` | New passwords don't match |
| `"Les mots de passe renseignés sont différents"` | Sign-up passwords don't match |
| `"Mot de passe incorrect"` | Wrong current password |
| `"Vous n'êtes pas administrateur de l'organisation"` | Admin access required |
| `"Informations de l'organisation manquantes"` | Missing organization details |
| `"Aucun abonnement actif à annuler"` | No active subscription |
| `"Fichier trop volumineux"` | File exceeds 10 MB limit |
| `"Limite de stockage atteinte"` | Organization storage limit reached |
| `"Données invalides"` | Request body validation failed |
