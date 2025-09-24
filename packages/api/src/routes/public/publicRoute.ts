import { publicFactory } from "#src/factories/publicFactory.js"
import { sendMagicLinkRoute } from "#src/routes/public/sendMagicLink.js"
import { signInRoute } from "#src/routes/public/signIn.js"
import { signOutRoute } from "#src/routes/public/signOut.js"
import { signUpRoute } from "#src/routes/public/signUp.js"


export const publicRoute = publicFactory.createApp()
    .route("/", signInRoute)
    .route("/", signUpRoute)
    .route("/", signOutRoute)
    .route("/", sendMagicLinkRoute)
