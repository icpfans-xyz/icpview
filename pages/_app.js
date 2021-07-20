import { ReactQueryConfigProvider } from 'react-query'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

import Header from '../shared/components/Header'
import Footer from '../shared/components/footer'
import '../styles/index.scss'

const queryConfig = {
    // Global
    refetchAllOnWindowFocus: false,
    cacheTime: 60 * 1000,
    // useQuery
    retry: 1,
    refetchOnMount: true
}

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter()

    // add GA
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return (
        <ReactQueryConfigProvider config={queryConfig}>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </ReactQueryConfigProvider>
    )
}

export default MyApp
