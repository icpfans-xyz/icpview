import Link from 'next/link'
import { useState, useEffect } from 'react'
// import { useInfiniteQuery, useQuery } from 'react-query'
// import { useInfiniteQuery, useQuery } from 'react-query'
import { getIcpStringFromE8s, dateTimeFmt } from '../../../shared/utils/utils'
import { getAccountTransactions } from '../../../shared/api'
import { SkeletonRows } from '../../../shared/components/skeleton'
import useTranslation from 'next-translate/useTranslation'
// import { WarningTooltip } from '../../../shared/components/tooltip'
import ReactTooltip from 'react-tooltip'
const LIMIT = 25
const intiState = { count: '-', rows: [], isLoading: false, error: null }
export default function Transactions({ address, visible, setAddressInfo }) {
    const { t } = useTranslation('common')
    const [state, setState] = useState(intiState)
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    // const fetchTransactions = (_, address) => {
    //     const params = {
    //         orderBy: 'blockHeight',
    //         order: 'desc',
    //         pageSize: LIMIT,
    //         page,
    //         accountId: address
    //     }
    //     getAccountTransactions(params)
    // }
    // const { isLoading, error } = state
    function handlePageing() {
        setPage(page + 1)
    }
    async function getData(_page) {
        const params = {
            orderBy: 'blockHeight',
            order: 'desc',
            pageSize: LIMIT,
            page: _page || page,
            accountId: address
        }
        if (_page) {
            setState({
                count: '-',
                rows: [],
                isLoading: true,
                rosettaError: null
            })
        }
        setLoading(true)
        const { status, data } = await getAccountTransactions(params)
        setLoading(false)
        if (status === 200) {
            const { count, rows } = data
            setState((state) => {
                return {
                    count,
                    rows: state.rows && page === 0 ? rows : [...state.rows, ...rows],
                    isLoading: false,
                    rosettaError: null
                }
            })
            setAddressInfo(({ balance }) => {
                return { balance, count }
            })
        } else {
            setState((state) => {
                return {
                    count: state.count,
                    rows: state.rows ? state.rows : [],
                    isLoading: false,
                    rosettaError: null
                }
            })
        }
    }
    useEffect(() => {
        if (address) {
            setPage(0)
            getData(0)
        }
    }, [address])

    useEffect(() => {
        if (address) {
            // console.log(1221333)
            getData()
        }
    }, [page])
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>{t('transactionHash')}</th>
                        <th>{t('senderId')}</th>
                        <th>{t('receiverId')}</th>
                        <th>{t('amount')}</th>
                        <th style={{ width: 100 }}>{t('dateTime')}</th>
                        <th style={{ width: 100 }}>{t('transactionType')}</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {!visible || (!status && <SkeletonRows cols={6} />)} */}
                    {state &&
                        state.rows &&
                        state.rows.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <div
                                        className="text_block text_block--ellipsis"
                                        style={{ width: 80 }}>
                                        <Link
                                            href="/transaction/[id]"
                                            as={`/transaction/${item.id}`}>
                                            <a data-for="main"
                                                data-tip={item.id}
                                                data-iscapture="true">{item.id}</a>
                                        </Link>
                                    </div>
                                </td>
                                <td>
                                    <div className="user-pic">
                                        {/* <img
                                  src={`https://robohash.idena.io/${
                                      item.from && item.from.toLowerCase()
                                  }`}
                                  alt="pic"
                                  width="32"
                              /> */}
                                    </div>
                                    <div
                                        className="text_block text_block--ellipsis"
                                        style={{ width: 100 }}>
                                        {item.senderId && address.toLowerCase() === item.senderId.toLowerCase()
                                            ? (
                                                item.senderId
                                            )
                                            : (
                                                <Link
                                                    href="/address/[address]"
                                                    as={`/address/${item.senderId}`}>
                                                    <a data-for="main"
                                                        data-tip={item.senderId}
                                                        data-iscapture="true">{item.senderId}</a>
                                                </Link>
                                            )}
                                    </div>
                                </td>
                                <td>
                                    {item.receiverId
                                        ? (
                                            <>
                                                <div className="user-pic"></div>
                                                <div
                                                    className="text_block text_block--ellipsis"
                                                    style={{ width: 100 }}>
                                                    {address.toLowerCase() ===
                                                item.receiverId.toLowerCase()
                                                        ? (
                                                            item.receiverId
                                                        )
                                                        : (
                                                            <Link
                                                                href="/address/[address]"
                                                                as={`/address/${item.receiverId}`}>
                                                                <a data-for="main"
                                                                    data-tip={item.receiverId}
                                                                    data-iscapture="true">{item.receiverId}</a>
                                                            </Link>
                                                        )}
                                                </div>
                                            </>
                                        )
                                        : (
                                            <div className="text_block text_block--ellipsis">-</div>
                                        )}
                                </td>
                                <td style={{ textAlign: 'right' }}>{getIcpStringFromE8s(item.amount)} ICP</td>
                                <td>{dateTimeFmt(item.createdDate)}</td>
                                <td>
                                    {item.type}
                                    {/* {item.txReceipt && !item.txReceipt.success && (
                                    <WarningTooltip
                                        tooltip={`Smart contract failed: ${item.txReceipt.errorMsg}`}
                                        placement="top"
                                        style={{ marginRight: '5px' }}
                                    />
                                )}
                                {txTypeFmt(item.type, item.data)} */}
                                </td>
                            </tr>
                        ))}
                    {!visible || (loading && <SkeletonRows cols={6} />)}
                </tbody>
            </table>
            {state.rows.length > 0 && <ReactTooltip
                id="main"
                place="bottom"
                type="dark"
                effect="float"
                multiline={true}
            />}
            <div className="text-center" style={{ display: state.rows && state.rows.length > 0 && (page + 1) * LIMIT < state.count ? 'block' : 'none' }}>
                <button type="button" className="btn btn-small" onClick={() => handlePageing()}>
                    {t('showMore')} ({state.count < LIMIT ? state.count : (page + 1) * LIMIT} of{' '}
                    {state.count})
                </button>
            </div>
        </div>
    )
}
