import { useVirtualizer } from '@tanstack/react-virtual'
import { ComponentProps, ReactElement, useRef } from "react"
import { css, cx } from "../../utilities/cn.js"


export function Virtualizer<TData extends unknown>(props: {
    data: Array<TData>
    children: (data: TData, index: number) => ReactElement | Array<ReactElement> | null
    childSize?: number
    className?: ComponentProps<'div'>['className']
}) {
    const parentRef = useRef<HTMLDivElement | null>(null)

    const rowVirtualizer = useVirtualizer({
        count: props.data.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => props.childSize ?? 32,
    })

    return (
        <div
            ref={parentRef}
            className={cx(
                css({
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    overflowY: "auto"
                }),
                props.className
            )}
        >
            <div
                className={css({
                    position: "relative",
                    width: "100%",
                    height: "fit",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                })}
                style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                }}
            >
                {rowVirtualizer.getVirtualItems().map((virtualItem) => (
                    <div
                        key={virtualItem.key}
                        className={css({
                            position: "absolute",
                            top: "0",
                            left: "0",
                            minH: "fit",
                            height: "fit",
                            width: "100%"
                        })}
                        style={{
                            height: `${virtualItem.size}px`,
                            transform: `translateY(${virtualItem.start}px)`,
                        }}
                    >
                        {props.children(props.data[virtualItem.index], virtualItem.index)}
                    </div>
                ))}
            </div>
        </div>
    )
}
