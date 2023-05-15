import type { PropsWithChildren } from 'react'
import { Header } from './header'
import { Footer } from './footer'

export const PageLayout = (props: PropsWithChildren) => {
    return (
        <div>
            <Header />
            {props.children}
            <Footer />
        </div>
    )
}
