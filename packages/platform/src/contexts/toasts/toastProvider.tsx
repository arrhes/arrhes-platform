
import { Toast } from "components/overlays/toast/toast"
import { useToast } from "./useToast"


export function ToasterProvider() {
    const { toasts } = useToast()

    return (
        <Toast.Provider>
            {
                toasts.map(function ({ id, title, description, action, ...props }) {
                    return (
                        <Toast.Content
                            {...props}
                            key={id}
                        >
                            <div className="flex flex-col justify-center items-start">
                                {
                                    (title === undefined)
                                        ? null
                                        : (
                                            <Toast.Title>
                                                {title}
                                            </Toast.Title>
                                        )
                                }
                                {
                                    (description === undefined)
                                        ? null
                                        : (
                                            <Toast.Description>
                                                {description}
                                            </Toast.Description>
                                        )
                                }
                            </div>
                            {action}
                            <Toast.Close />
                        </Toast.Content>
                    )
                })
            }
            <Toast.Viewport />
        </Toast.Provider>
    )
}
