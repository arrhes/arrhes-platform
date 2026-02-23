import { createOneApiKeyRoute } from "../../../../../../routes/auth/organizations/$idOrganization/organizationSettings/apiKey/createOneApiKey.js"
import { deleteOneApiKeyRoute } from "../../../../../../routes/auth/organizations/$idOrganization/organizationSettings/apiKey/deleteOneApiKey.js"
import { readAllApiKeysRoute } from "../../../../../../routes/auth/organizations/$idOrganization/organizationSettings/apiKey/readAllApiKeys.js"

export const apiKeyRoutes = [createOneApiKeyRoute, readAllApiKeysRoute, deleteOneApiKeyRoute]
