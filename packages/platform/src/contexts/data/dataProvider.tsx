import { dataClient } from "#/contexts/data/queryClient.js"
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from "react"


export function DataProvider(props: {
    children: ReactNode
}) {
    return (
        <QueryClientProvider client={dataClient}>
            {props.children}
        </QueryClientProvider>
    )
}
