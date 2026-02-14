
import { Toast } from "../../components/overlays/toast/toast.js"
import { useToast } from "./useToast.js"


export function ToasterProvider() {
    const { toasts, dismiss } = useToast()

    return (
        <Toast.Viewport>
            {
                toasts.map(function (toast) {
                    return (
                        <Toast.Item
                            key={toast.id}
                            toast={toast}
                            onDismiss={dismiss}
                        />
                    )
                })
            }
        </Toast.Viewport>
    )
}
