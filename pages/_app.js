/*
 * @Author: your name
 * @Date: 2021-07-01 11:42:41
 * @LastEditTime: 2021-07-20 00:19:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/idena-explorer/pages/_app.js
 */
/* eslint-disable react/jsx-props-no-spreading */
// pages/_app.js
import '../styles/index.scss'
import { useEffect } from 'react'
import ReactGA from 'react-ga'
import Head from 'next/head'
import { Helmet } from 'react-helmet'
import { ReactQueryConfigProvider } from 'react-query'
// import '../config/i18n'
import { appWithTranslation, useTranslation } from 'next-i18next'
import Combobox from './combobox'
import { AVAILABLE_LANGS, isoLangs } from '../shared/utils/i18n'
// import { SessionProvider } from '../shared/utils/session-context'

const queryConfig = {
    // Global
    refetchAllOnWindowFocus: false,
    cacheTime: 60 * 1000,
    // useQuery
    retry: 1,
    refetchOnMount: true
}

function MyApp ({ Component, pageProps }) {
    const { t } = useTranslation('common')
    // const { i18n } = useTranslation()
    console.log(t('selectLng'))
    // const currentLanguage = isoLangs[i18n.language]
    // console.log(currentLanguage)
    // const router = useRouter()
    // const { locale } = router
    // const { i18n } = useTranslation()
    useEffect(() => {
        ReactGA.initialize('G-0E7G4WVYB9')
        ReactGA.pageview(window.location.pathname + window.location.search)
    }, [])

    // useEffect(() => {
    //     i18n.changeLanguage(locale)
    // }, [locale])
    return (
        <>
            <Helmet
                defaultTitle="ICP View"
                titleTemplate="%s - ICP View"
            />

            <Head>
                <meta charSet="UTF-8" />

                <meta httpEquiv="X-UA-Compatible" content="chrome=1" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"
                />
                <meta
                    name="description"
                    content="Idena Explorer allows you to explore and search the Idena blockchain for addresses, identities, transactions, flips, blocks, invitations, epochs, mining rewards and validation results taking place on Idena (ICP)"
                />

                <meta name="msapplication-TileColor" content="#2456ec" />
                <meta name="theme-color" content="#ffffff" />

                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image" content="./og_image.jpg" />
                <meta property="og:title" content="" />
                <meta property="og:description" content="" />
            </Head>
            <ReactQueryConfigProvider config={queryConfig}>
                <Component {...pageProps} />
            </ReactQueryConfigProvider>
            <footer className="footer">
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-md-7 col-lg-6">
                            <div className="social_list">
                                <a
                                    href="https://twitter.com/icpfansxyz"
                                    rel="nofollow"
                                    target="blank"
                                    className="social_list__item"
                                >
                                    <i className="icon icon--twitter" />
                                </a>
                                <a
                                    href="https://t.me/icpfans"
                                    rel="nofollow"
                                    target="blank"
                                    className="social_list__item"
                                >
                                    <i className="icon icon--telegram" />
                                </a>
                                <a
                                    href="https://github.com/icpfans-xyz"
                                    rel="nofollow"
                                    target="blank"
                                    className="social_list__item"
                                >
                                    <i className="icon icon--github" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center text-center">
                        <div className="col-md-7 col-lg-6">
                            <div className="language row">
                                <Combobox
                                    // title={currentLanguage.nativeName}
                                    itemsList={AVAILABLE_LANGS.map(lng => ({
                                        key: lng,
                                        title: isoLangs[lng].nativeName
                                        // href: `/${lng}${router.pathname}`
                                    }))}
                                    itemsTitle={''}
                                    onItemClick={key => { console.log(key) }}
                                />
                                {/* <a
                                    href="https://translate.idena.io/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="translate-link"
                                >
                                    <img
                                        src="/static/images/icon-translate.svg"
                                        alt="translate"
                                        width="24"
                                    />
                                    <span>{t('Contribute translations')}</span>
                                </a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default appWithTranslation(MyApp)
