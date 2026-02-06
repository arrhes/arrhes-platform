import { css, cx } from "../../utilities/cn.js"
import { useVirtualizer } from '@tanstack/react-virtual'
import { ComponentProps, ReactElement, useRef } from "react"


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
                    w: "full",
                    h: "full",
                    display: "flex",
                    flexDir: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    overflow: "auto"
                }),
                props.className
            )}
        >
            <div
                className={css({
                    position: "relative",
                    w: "full",
                    h: "fit",
                    display: "flex",
                    flexDir: "column",
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
                            h: "fit",
                            w: "full"
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
