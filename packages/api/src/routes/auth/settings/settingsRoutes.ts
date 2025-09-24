import { activateUserRoute } from "#src/routes/auth/settings/activateUser.js"
import { readUserSessionRoute } from "#src/routes/auth/settings/readUserSession.js"
import { updateUserRoute } from "#src/routes/auth/settings/updateUser.js"
import { updateUserEmailRoute } from "#src/routes/auth/settings/updateUserEmail.js"
import { updateUserPasswordRoute } from "#src/routes/auth/settings/updateUserPassword.js"
import { validateUserEmailRoute } from "#src/routes/auth/settings/validateUserEmail.js"


export const settingsRoutes = [
    activateUserRoute,
    readUserSessionRoute,
    updateUserRoute,
    updateUserEmailRoute,
    updateUserPasswordRoute,
    validateUserEmailRoute,
]    
