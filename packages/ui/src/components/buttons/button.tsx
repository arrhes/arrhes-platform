import {
    type ComponentProps,
    createContext,
    forwardRef,
    type MouseEvent,
    type ReactNode,
    useContext,
    useState,
} from "react"
import { css, cx } from "../../utilities/cn.ts"
import { sleep } from "../../utilities/sleep.ts"

/**
 * Context for passing loading state from Button to ButtonContent
 */
const ButtonLoadingContext = createContext<boolean>(false)

/**
 * Hook to access the loading state from a parent Button
 * Returns false if not within a Button context
 */
export function useButtonLoading() {
    return useContext(ButtonLoadingContext)
}

type ButtonProps = Omit<ComponentProps<"button">, "children" | "disabled"> & {
    hasLoader?: boolean
    children: ReactNode
    title?: string
    isDisabled?: boolean
}

/**
 * Button component - a neutral container for clickable elements
 * Handles click events, loading state, and disabled state
 * Use composition with ButtonContent for styled button content
 *
 * @example
 * <Button onClick={handleClick} hasLoader>
 *   <ButtonContent variant="primary" text="Submit" />
 * </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
    const [isLoading, setIsLoading] = useState(false)

    async function handleClick(e: MouseEvent<HTMLButtonElement>) {
        if (props.onClick === undefined) return
        if (!props.hasLoader) {
            props.onClick(e)
            return
        }

        setIsLoading(true)
        await Promise.all([sleep(100), props.onClick(e)])
        setIsLoading(false)
    }

    const { hasLoader, className, isDisabled, title, children, ...buttonProps } = props

    return (
        <ButtonLoadingContext.Provider value={isLoading}>
            <button
                {...buttonProps}
                ref={ref}
                className={cx(
                    css({
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        cursor: "pointer",
                        width: "fit-content",
                        maxWidth: "100%",
                        height: "fit-content",
                        maxHeight: "fit-content",
                        bg: "transparent",
                        border: "none",
                        padding: "0",
                        _disabled: { cursor: "not-allowed" },
                    }),
                    className,
                )}
                onClick={handleClick}
                type={props.type ?? "button"}
                disabled={props.isDisabled || isLoading}
                title={title}
            >
                {children}
            </button>
        </ButtonLoadingContext.Provider>
    )
})
