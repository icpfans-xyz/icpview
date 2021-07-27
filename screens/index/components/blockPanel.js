/*
 * @Author: your name
 * @Date: 2021-07-20 18:35:30
 * @LastEditTime: 2021-07-27 10:28:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/icpview/screens/index/components/blockPanel.js
 */
// import Link from 'next/link'
// import { useEffect, useState } from 'react'
// import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts'
// import {
// getOnlineMinersCount,
// getOnlineIdentitiesCount
// getEpochsData,
// getBlockRate
// } from '../../../shared/api'
import useTranslation from 'next-translate/useTranslation'
import TooltipText from '../../../shared/components/tooltip'
import Blocks from './blocks'
import BlockRate from './blockRate'

export default function BlockPanel() {
    const { t } = useTranslation('common')

    return (
        <div className="col-12 col-sm-6" style={{ marginTop: 30 }}>
            <h1>{t('blocks')}</h1>
            <div className="card">
                <div className="info_block">
                    <div className="row">
                        <div className="col-12 col-sm-6 bordered-col">
                            <Blocks />
                            <TooltipText
                                className="control-label"
                                data-toggle="tooltip"
                                tooltip={t('totalBlocks')}>
                                {t('totalBlocks')}
                            </TooltipText>
                        </div>

                        <div className="col-12 col-sm-6 bordered-col" >
                            <BlockRate />
                            <TooltipText
                                className="control-label"
                                data-toggle="tooltip"
                                tooltip={t('blockRateTips')}>
                                {t('blockRate')}
                            </TooltipText>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
