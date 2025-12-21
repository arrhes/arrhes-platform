import { ToastAction } from "./toastAction.js"
import { ToastClose } from "./toastClose.js"
import { ToastContent } from "./toastContent.js"
import { ToastDescription } from "./toastDescription.js"
import { ToastProvider } from "./toastProvider.js"
import { ToastTitle } from "./toastTitle.js"
import { ToastViewport } from "./toastViewport.js"


export const Toast = {
    Provider: ToastProvider,
    Content: ToastContent,
    Title: ToastTitle,
    Description: ToastDescription,
    Close: ToastClose,
    Action: ToastAction,
    Viewport: ToastViewport,
}
