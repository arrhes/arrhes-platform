
import { Toast } from "../../components/overlays/toast/toast.js"
import { css } from "../../utilities/cn.js"
import { useToast } from "./useToast.js"


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
                            <div className={css({ display: "flex", flexDir: "column", justifyContent: "center", alignItems: "flex-start" })}>
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
