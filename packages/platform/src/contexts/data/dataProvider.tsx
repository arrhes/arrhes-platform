import { QueryClientProvider } from '@tanstack/react-query'
import { dataClient } from 'contexts/data/queryClient'
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
