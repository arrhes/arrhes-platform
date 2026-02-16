import { publicFactory } from "../../factories/publicFactory.js"
import { sendMagicLinkRoute } from "../../routes/public/sendMagicLink.js"
import { signInRoute } from "../../routes/public/signIn.js"
import { signOutRoute } from "../../routes/public/signOut.js"
import { signUpRoute } from "../../routes/public/signUp.js"

export const publicRoute = publicFactory
    .createApp()
    .route("/", signInRoute)
    .route("/", signUpRoute)
    .route("/", signOutRoute)
    .route("/", sendMagicLinkRoute)
