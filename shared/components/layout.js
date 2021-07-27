import {
    Container
    // DropdownMenu,
    // DropdownToggle,
    // UncontrolledButtonDropdown
} from 'reactstrap'

import useTranslation from 'next-translate/useTranslation'

import { useState } from 'react'
import { useRouter } from 'next/router'
// import { getCrc32 } from '@dfinity/principal/lib/cjs/utils/getCrc'
// import ReactGA from 'react-ga'
// import Link from 'next/link'
import { isAccountOrTransaction, isAccount } from '../utils/utils'
import Head from 'next/head'
// import { search } from '../api'
// import { useSession } from '../utils/session-context'
// import TopHeader from './topheader'
import LangSelect from './langSelect'

function Layout({ children, title = '', signinLoading = false }) {
    const { t } = useTranslation('common')
    const router = useRouter()

    // const { session, logout } = useSession()
    const [state, setState] = useState({
        value: '',
        disabled: false,
        signinLoading
    })

    const doSearch = async(e) => {
        e.preventDefault()
        setState({ ...state, disabled: true })
        if (isAccountOrTransaction(state.value)) {
            if (isAccount(state.value)) {
                router.push(`/address/${state.value}`)
                return
            } else {
                router.push(`/transaction/${state.value}`)
                return
            }
        } else {
            alert('未查询到任何结果...')
        }
        setState({ ...state, disabled: false })
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            {/* <TopHeader /> */}
            <header className="header" style={{ marginTop: 30 }}>
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                            <div className="header_logo">
                                <a className="" href="/">
                                    <span></span>
                                    <img
                                        src="/static/images/icpview_logo.png"
                                        alt="Idena"
                                        width="168px"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="col">
                            <form action="" className="form_search">
                                <div className="input-group">
                                    <div className="input-addon">
                                        <button
                                            type="submit"
                                            className="btn btn-icon"
                                            onClick={doSearch}>
                                            <i className="icon icon--search" />
                                        </button>
                                    </div>
                                    <input
                                        value={state.value}
                                        type="search"
                                        placeholder={t('searchText')}
                                        className="form-control"
                                        onChange={(e) =>
                                            setState({
                                                ...state,
                                                value: e.target.value
                                            })
                                        }
                                        disabled={state.disabled}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="col-auto">
                            <LangSelect />
                        </div>
                    </div>
                </div>
            </header>
            <main className="main">
                <Container>{children}</Container>
            </main>
        </>
    )
}

export default Layout
