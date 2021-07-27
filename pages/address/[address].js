// import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NavItem, NavLink, TabPane, TabContent } from 'reactstrap'
// import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Layout from '../../shared/components/layout'
// import { getAccountTransactions } from '../../shared/api'
import RosettaApi from '../api/rosetta/RosettaApi'
// import { PageLoading, PageError } from '../../shared/components/loading'
import { getIcpStringFromE8s } from '../../shared/utils/utils'
import Transactions from '../../screens/address/components/transactions'
// import Rewards from '../../screens/address/components/rewards'
// import Penalties from '../../screens/address/components/penalties'
// import BalanceHistory from '../../screens/address/components/balances'
import { useHash, useHashChange } from '../../shared/utils/useHashChange'
import TooltipText from '../../shared/components/tooltip'

const DEFAULT_TAB = '#transactions'
const rosettaApi = new RosettaApi()
// const intiState = { count: '-', rows: null, isLoading: false, error: null }
function Address() {
    const router = useRouter()
    const { address } = router.query

    const { hash, setHash, hashReady } = useHash()
    useHashChange((hash) => setHash(hash))

    const [addressInfo, setAddressInfo] = useState({
        balance: '-',
        count: '-'
    })

    useEffect(() => {
        async function getData() {
            const res = await rosettaApi.getAccountBalance(address)
            setAddressInfo({ balance: getIcpStringFromE8s(res), count: '-' })
        }
        if (address) {
            getData()
        }
    }, [address])
    return (
        <Layout title={`Address ${address}`}>
            <section className="section">
                <div className="section_main__group">
                    <h1 className="section_main__title">账户ID</h1>
                    <h3 className="section_main__subtitle">
                        <span>{address}</span>
                    </h3>
                </div>
            </section>
            {/* {isLoading && <PageLoading />}
            {errorMessage && !isLoading && <PageError />} */}
            <AddressData
                addressInfo={addressInfo}
                // identityInfo={identityInfo}
                // contractInfo={contractInfo}
                // poolInfo={poolInfo}
            />

            <section className="section section_tabs">
                <div className="tabs">
                    <div className="section__header">
                        <div className="row align-items-center justify-content-between">
                            <div className="col">
                                <ul className="nav nav-tabs" role="tablist">
                                    <NavItem>
                                        <NavLink
                                            active={
                                                hashReady && (hash === DEFAULT_TAB || hash === '')
                                            }
                                            href={DEFAULT_TAB}>
                                            <h3>交易</h3>
                                        </NavLink>
                                    </NavItem>

                                </ul>
                            </div>
                        </div>
                    </div>

                    <TabContent activeTab={hashReady ? hash || DEFAULT_TAB : ''}>
                        <TabPane tabId={DEFAULT_TAB}>
                            <div className="card">
                                <Transactions
                                    address={address}
                                    setAddressInfo={setAddressInfo}
                                    visible={hashReady && (hash === DEFAULT_TAB || !hash)}
                                />
                            </div>
                        </TabPane>
                        {/* <TabPane tabId="#rewards">
                            <div className="card">
                                <Rewards
                                    address={address}
                                    visible={hashReady && hash === '#rewards'}
                                />
                            </div>
                        </TabPane>
                        <TabPane tabId="#penalty">
                            <div className="card">
                                <Penalties
                                    address={address}
                                    visible={hashReady && hash === '#penalty'}
                                />
                            </div>
                        </TabPane>
                        <TabPane tabId="#history">
                            <div className="card">
                                <BalanceHistory
                                    address={address}
                                    visible={hashReady && hash === '#history'}
                                />
                            </div>
                        </TabPane> */}
                    </TabContent>
                </div>
            </section>
        </Layout>
    )
}

function AddressData({ addressInfo, identityInfo, contractInfo, poolInfo }) {
    return (
        <>
            <section className="section section_info">
                <div className="row">
                    <div className="col-12 col-sm-12">
                        <h3>详情</h3>
                        <div className="card">
                            <div className="info_block">
                                <div className="row">
                                    <div
                                        className={`col-12 ${
                                            identityInfo ? 'col-sm-4' : 'col-sm-6'
                                        } bordered-col`}>
                                        <h3 className="info_block__accent">
                                            {(addressInfo && `${addressInfo.balance} ICP`) || '-'}
                                        </h3>
                                        <TooltipText
                                            className="control-label"
                                            data-toggle="tooltip"
                                            tooltip="Available balance">
                                            余额
                                        </TooltipText>
                                    </div>
                                    <div
                                        className={`col-12 ${
                                            identityInfo ? 'col-sm-4' : 'col-sm-6'
                                        } bordered-col`}>
                                        <h3 className="info_block__accent">
                                            {(addressInfo && addressInfo.count) || '-'}
                                            次
                                        </h3>
                                        <div className="control-label">交易</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Address
