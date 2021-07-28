import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import {
    getCoingeckoData,
    getCoinMarketData
} from '../../../shared/api'
import { usdFmt, precise2 } from '../../../shared/utils/utils'
import TooltipText from '../../../shared/components/tooltip'

function Card({ name, value, tooltip = '', change = '', href = '', blank = false }) {
    const changeValue = Math.abs(Math.round(change * 10) / 10)
    return (
        <TooltipText tooltip={tooltip}>
            <div className="item">
                <div className="content">
                    {/* <span>{name}</span> */}
                    <div
                        // style={{
                        //     color: 'white',
                        //     fontSize: '0.987rem'
                        // }}
                    >
                        <span style={{
                            color: '#53565c',
                            marginBottom: '0.75rem',
                            fontSize: '1.25rem',
                            fontWeight: 500
                        }}>{value}</span>
                        {change && (
                            <span>
                                <span style={{ color: '#e8eaed90', padding: '2px' }}> ❘ </span>
                                <span style={{ color: `${change > 0 ? '#27d980' : '#ff6666'}` }}>
                                    <span style={{ verticalAlign: 'middle', fontSize: '6px' }}>
                                        {`${change > 0 ? '▲' : '▼'}  `}
                                    </span>
                                    {`${changeValue}%`}
                                </span>
                            </span>
                        )}
                    </div>
                    {href && (
                        <a
                            href={href}
                            target={blank ? '_blank' : ''}
                            rel={blank ? 'noreferrer' : ''}>
                            {' '}
                        </a>
                    )}
                </div>
            </div>
        </TooltipText>
    )
}

export default function MarketPanel() {
    const { t } = useTranslation('common')

    const [marketData, setMarketData] = useState({
        price: 0,
        priceChange: 0,
        marketCap: 0
    })
    useEffect(() => {
        async function getData() {
            const res = await Promise.all([getCoingeckoData(), getCoinMarketData()])
            const icp = res[0]['internet-computer']
            const icp2 = res[1].market_data
            setMarketData({
                price: icp && icp.usd,
                priceChange: icp && icp.usd_24h_change,
                marketCap: icp && icp.usd_market_cap,
                totalSupply: icp2 && icp2.total_supply,
                circulatingSupply: icp2 && icp2.circulating_supply
            })
        }
        getData()
    }, [])

    return (
        <div className="col-12 col-sm-12">
            <h1>{t('market')}</h1>
            <div className="card">
                <div className="info_block">
                    <div className="row">
                        <div className="col-12 col-sm-3 bordered-col">
                            <Card
                                name="ICP 价格"
                                value={usdFmt(precise2(marketData.price))}
                                change={marketData.priceChange}
                                tooltip={t('icpPrice')}
                                href="https://www.coingecko.com/en/search_redirect?id=internet-computer&type=coin"
                                blank
                            />
                            <TooltipText
                                className="control-label"
                                data-toggle="tooltip"
                                tooltip={`${t('24Hprice')} https://coingecko.com`}>
                                <a href="https://idena.today" target="_blank">
                                    {t('icpPrice')}
                                </a>
                            </TooltipText>
                        </div>
                        <div className="col-12 col-sm-3 bordered-col">
                            <Card
                                name="ICP 市值"
                                value={usdFmt(Math.round(marketData.marketCap))}
                                tooltip={t('icpMarket')}
                                href="https://www.coingecko.com/en/search_redirect?id=internet-computer&type=coin"
                                blank
                            />
                            <TooltipText
                                tooltip={`${t('marketMore')} https://www.coingecko.com/en/search_redirect?id=internet-computer&type=coin"`}
                                className="control-label"
                                data-toggle="tooltip">
                                <a href="https://www.coingecko.com/en/search_redirect?id=internet-computer&type=coin" target="_blank">
                                    {t('icpMarket')}
                                </a>
                            </TooltipText>
                        </div>
                        <div className="col-12 col-sm-3 bordered-col">
                            <Card
                                name="ICP 发行量"
                                value={usdFmt(Math.round(marketData.totalSupply), '')}
                                tooltip={t('icpTotalSupply')}
                                href="https://www.coingecko.com/en/search_redirect?id=internet-computer&type=coin"
                            />
                            <TooltipText
                                className="control-label"
                                data-toggle="tooltip"
                                tooltip="https://www.coingecko.com/en/search_redirect?id=internet-computer&type=coin">
                                <a href="https://www.coingecko.com/en/search_redirect?id=internet-computer&type=coin" target="_blank">
                                    {t('icpTotalSupply')}
                                </a>
                            </TooltipText>
                        </div>

                        <div className="col-12 col-sm-3 bordered-col">
                            <Card
                                name="ICP 流通量"
                                value={usdFmt(Math.round(marketData.circulatingSupply), '')}
                                tooltip={t('icpCirculatingSupply')}
                                href="https://www.coingecko.com/en/search_redirect?id=internet-computer&type=coin"
                            />
                            <TooltipText
                                className="control-label"
                                data-toggle="tooltip"
                                tooltip="https://www.coingecko.com/en/search_redirect?id=internet-computer&type=coin">
                                <a href="https://www.coingecko.com/en/search_redirect?id=internet-computer&type=coin" target="_blank">
                                    {t('icpCirculatingSupply')}
                                </a>
                            </TooltipText>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
