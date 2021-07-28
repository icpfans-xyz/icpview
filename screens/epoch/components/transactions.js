import Link from 'next/link'
// import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { timeSince, getIcpStringFromE8s, dnaFmt, txTypeFmt } from '../../../shared/utils/utils'
import { RosettaError, RosettaErrorType } from '../../../pages/api/rosetta/RosettaApi'
import useTranslation from 'next-translate/useTranslation'
// import {
//     getEpochTransactions,
//     getEpochTransactionsCount
// } from '../../../shared/api'
import { SkeletonRows } from '../../../shared/components/skeleton'
import TooltipText from '../../../shared/components/tooltip'
import Tooltip from './tooltip'
// import { Tooltip } from 'reactstrap'

const Transactions = ({
    getTransactions,
    pageIndex,
    handelePage,
    pageSize,
    transactionsCount,
    visible,
    limit = 30
}) => {
    const { t } = useTranslation('common')
    const [transactions, setTransactions] = useState([])
    const [rosettaError, setRosettaError] = useState(null)
    const [loading, setLoading] = useState(false)
    // const { data, status } = useQuery('get', getTransactions)
    // console.log(data, status)
    // const [tooltipOpen, setTooltipOpen] = useState(false)
    // const toggle = () => setTooltipOpen(!tooltipOpen)
    // const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async(offset) => {
            setLoading(true)
            const _transactions = await getTransactions(offset, pageSize)
            setLoading(false)
            if (transactions instanceof RosettaError) {
                setRosettaError(transactions)
            } else {
                setTransactions([...transactions, ..._transactions])
                setRosettaError(null)
            }
        }
        const offset = pageIndex !== null ? pageIndex * pageSize : null
        if (offset !== null) fetchData(offset)
    }, [getTransactions, pageIndex, pageSize])
    // const fetchTransactions = (_, epoch, continuationToken = null) =>
    //     getEpochTransactions(epoch, limit, continuationToken)

    function fetchMore() {
        handelePage(1)
    }
    // const { data, fetchMore, canFetchMore, status } = useInfiniteQuery(
    //     epoch > 0 && `${epoch}/transactions`,
    //     [epoch],
    //     fetchTransactions,
    //     {
    //         getFetchMore: (lastGroup) =>
    //             lastGroup && lastGroup.continuationToken
    //                 ? lastGroup.continuationToken
    //                 : false
    //     }
    // )

    // const { data: txsCount } = useQuery(
    //     epoch > 0 && ['epoch/txsCount', epoch],
    //     (_, epoch) => getEpochTransactionsCount(epoch)
    // )
    let errorMessage = ''
    if (rosettaError) {
        switch (rosettaError.errorType) {
        case RosettaErrorType.Timeout:
            errorMessage = 'ERROR: Timed out while getting the transactions.'
            break
        default:
            // NotFound (N/A), NetworkError
            errorMessage = 'ERROR: An error occurred while getting the transactions.'
            break
        }
    }
    return (
        errorMessage
            ? <div>{errorMessage}</div>
            : <div className="table-responsive" style={{ overflow: 'visible' }}>

                <table className="table">
                    <thead>
                        <tr>
                            <th>{t('transactionHash')}</th>
                            <th style={{ width: 100 }}>{t('dateTime')}</th>
                            <th>{t('senderId')}</th>
                            <th>{t('receiverId')}</th>
                            <th>{t('amount')}</th>
                            <th style={{ width: 100 }}>{t('transactionType')}</th>
                        </tr>
                    </thead>
                    <tbody>

                        {transactions.length > 0 && transactions.map(
                            (item) => item && (<tr key={item.hash}>

                                <td style={{ overflow: 'visible' }}>
                                    {/* <TooltipText tooltip={item.hash}>
                                        <div
                                            className="text_block text_block--ellipsis"
                                            style={{ width: 100 }}>
                                            <Link
                                                href="/transaction/[hash]"
                                                as={`/transaction/${item.hash}`}>
                                                <a>{item.hash}</a>

                                            </Link>
                                        </div>
                                    </TooltipText> */}
                                    <Tooltip text={item.hash}>
                                        <div
                                            className="text_block text_block--ellipsis"
                                            style={{ width: 100 }}>
                                            <Link
                                                href="/transaction/[hash]"
                                                as={`/transaction/${item.hash}`}>
                                                <a>{item.hash}</a>

                                            </Link>
                                        </div>
                                    </Tooltip>
                                </td>

                                <td>{timeSince(item.timestamp)}</td>
                                <td style={{ overflow: 'visible' }}>
                                    <Tooltip text={item.account1Address}>
                                        <div
                                            className="text_block text_block--ellipsis"
                                            style={{ width: 120 }}>
                                            <Link
                                                href="/address/[address]"
                                                as={`/address/${item.account1Address}`}>
                                                <a>{item.account1Address}</a>
                                            </Link>
                                        </div>
                                    </Tooltip>
                                </td>
                                <td style={{ overflow: 'visible' }}>
                                    {item.account2Address
                                        ? (
                                            <Tooltip text={item.account2Address}>
                                                <div
                                                    className="text_block text_block--ellipsis"
                                                    style={{ width: 120 }}>
                                                    <Link
                                                        href="/address/[address]"
                                                        as={`/address/${item.account2Address}`}>
                                                        <a>{item.account2Address}</a>
                                                    </Link>
                                                </div>
                                            </Tooltip>
                                        )
                                        : (
                                            <div className="text_block text_block--ellipsis">-</div>
                                        )}
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    {dnaFmt(
                                        (!item.txReceipt || item.txReceipt.success) &&
                                        getIcpStringFromE8s(
                                            !(item.amount * 1) &&
                                                        typeof item.transfer !== 'undefined'
                                                ? item.transfer
                                                : (!item.txReceipt ||
                                                              item.txReceipt.success) &&
                                                              item.amount
                                        ),
                                        ' ICP'
                                    )}
                                </td>
                                <td>
                                    {/* {item.txReceipt && !item.txReceipt.success && (
                                        <WarningTooltip
                                            tooltip={`Smart contract failed: ${item.txReceipt.errorMsg}`}
                                            placement="top"
                                            style={{ marginRight: '5px' }}
                                        />
                                    )} */}
                                    {txTypeFmt(item.type, item.data)}
                                </td>
                            </tr>
                            )
                        )}
                        {!visible || (loading && <SkeletonRows cols={6} />)}
                    </tbody>
                </table>
                <div className="text-center" style={{ display: 'block' }}>
                    <button type="button" className="btn btn-small" onClick={() => fetchMore()}>
                        {t('showMore')} ({pageIndex * 10 + limit} of{' '}
                        {transactionsCount})
                    </button>
                </div>
            </div>
    )
}
export default Transactions
