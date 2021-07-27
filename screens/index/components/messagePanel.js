/*
 * @Author: your name
 * @Date: 2021-07-20 18:35:30
 * @LastEditTime: 2021-07-26 14:42:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /icp-dao/Users/chenglei/work/icpview/screens/index/components/MessagePanel.js
 */
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import { getCanisters } from '../../../shared/api'
// import { precise1, dnaFmt } from '../../../shared/utils/utils'
import TooltipText from '../../../shared/components/tooltip'
import MessageCount from './messages-count'
import MessageRate from './messages-rate'

const initialState = {
    nodesCount: '-',
    canisters: '-'
}

export default function MessagePanel() {
    const { t } = useTranslation('common')

    const [state, setState] = useState(initialState)

    useEffect(() => {
        async function getData() {
            const res = await getCanisters()
            setState({
                canisters: res.running_canisters[0][1] + res.stopped_canisters[0][1]
            })
        }
        getData()
    }, [])

    return (
        <div className="col-12 col-sm-6" style={{ marginTop: 30 }}>
            <h1>{t('common:messages')}</h1>
            <div className="card">
                <div className="info_block">
                    <div className="row">
                        <div className="col-12 col-sm-4 bordered-col">
                            <MessageCount />
                            <TooltipText
                                className="control-label"
                                data-toggle="tooltip"
                                tooltip={t('totalMessages')}>
                                {t('totalMessages')}
                            </TooltipText>
                        </div>
                        <div className="col-12 col-sm-4 bordered-col">
                            <MessageRate />
                            <TooltipText
                                tooltip={t('messagesRate')}
                                className="control-label"
                                data-toggle="tooltip">
                                {t('messagesRate')}
                            </TooltipText>
                        </div>
                        <div className="col-12 col-sm-4 bordered-col">
                            <h3 className="info_block__accent">{state.canisters}</h3>
                            <TooltipText
                                className="control-label"
                                data-toggle="tooltip"
                                tooltip={t('canisterCount')}>
                                {t('canisterCount')}
                            </TooltipText>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
