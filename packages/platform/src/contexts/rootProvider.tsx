import { CircularLoader } from 'components/layouts/circularLoader'
import { Fragment, Suspense } from 'react'
import { DataProvider } from './data/dataProvider.tsx'
import { RouterProvider } from './router/routerProvider.tsx'
import { ToasterProvider } from './toasts/toastProvider.tsx'


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