import { useVirtualizer } from '@tanstack/react-virtual'
import { ComponentProps, ReactElement, useRef } from "react"
import { cn } from "utilities/cn"


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
            className={cn(
                "w-full h-full flex flex-col justify-start items-start overflow-auto",
                props.className
            )}
        >
            <div
                className="relative w-full h-fit flex flex-col justify-start items-start"
                style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                }}
            >
                {rowVirtualizer.getVirtualItems().map((virtualItem) => (
                    <div
                        key={virtualItem.key}
                        className='absolute top-0 left-0 min-h-fit h-fit w-full'
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
