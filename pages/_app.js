/*
 * @Author: your name
 * @Date: 2021-07-20 18:35:30
 * @LastEditTime: 2021-07-28 00:00:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/icpview/pages/_app.js
 */
import { ReactQueryConfigProvider } from 'react-query'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

import Header from '../shared/components/header'
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
