import { Fragment, Suspense } from 'react'
import { CircularLoader } from '../components/layouts/circularLoader.js'
import { DataProvider } from "./data/dataProvider.js"
import { RouterProvider } from "./router/routerProvider.js"
import { ToasterProvider } from "./toasts/toastProvider.js"


export function RootProvider() {
    return (
        <Fragment>
            <ToasterProvider />
            <DataProvider>
                <Suspense
                    fallback={
                        <CircularLoader
                            text="Platform loading..."
                        />
                    }
                >
                    <RouterProvider />
                </Suspense>
            </DataProvider>
        </Fragment>
    )
}