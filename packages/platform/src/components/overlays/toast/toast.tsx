import { ToastAction } from "./toastAction"
import { ToastClose } from "./toastClose"
import { ToastContent } from "./toastContent"
import { ToastDescription } from "./toastDescription"
import { ToastProvider } from "./toastProvider"
import { ToastTitle } from "./toastTitle"
import { ToastViewport } from "./toastViewport"


export const Toast = {
    Provider: ToastProvider,
    Content: ToastContent,
    Title: ToastTitle,
    Description: ToastDescription,
    Close: ToastClose,
    Action: ToastAction,
    Viewport: ToastViewport,
}
