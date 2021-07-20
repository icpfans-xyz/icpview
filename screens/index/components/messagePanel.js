import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import { getNodesCount } from '../../../shared/api'
// import { precise1, dnaFmt } from '../../../shared/utils/utils'
import TooltipText from '../../../shared/components/tooltip'
import MessageCount from './messages-count'
import MessageRate from './messages-rate'

const initialState = {
    nodesCount: '-'
}

export default function MessagePanel() {
    const { t } = useTranslation('common')

    const [state, setState] = useState(initialState)

    useEffect(() => {
        async function getData() {
            const res = await getNodesCount()
            setState({
                nodesCount: res.ic_nodes_count[0][1]
            })
        }
        getData()
    }, [])

    return (
        <div className="col-12 col-sm-6">
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
                            <h3 className="info_block__accent">{state.nodesCount}</h3>
                            <TooltipText
                                className="control-label"
                                data-toggle="tooltip"
                                tooltip={t('nodeCount')}>
                                {t('nodeCount')}
                            </TooltipText>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
