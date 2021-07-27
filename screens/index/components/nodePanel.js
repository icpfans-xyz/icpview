import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import {
    getNodesCount,
    getCpuCores,
    getMemoryTotal,
    getSubNetTotal,
    getBoundaryNodesTotal,
    getNodeProvidersTotal
} from '../../../shared/api'
import { getIcpStringFromE10s } from '../../../shared/utils/utils'
import TooltipText from '../../../shared/components/tooltip'

export default function MarketPanel() {
    const { t } = useTranslation('common')

    const [state, setState] = useState({
        nodeCount: '-',
        cpuCores: '-',
        memoryTotal: '-',
        subNetsTotal: '-',
        boundaryNodes: '-',
        nodeProviders: '-'
    })
    useEffect(() => {
        async function getData() {
            const res = await Promise.all([
                getNodesCount(),
                getCpuCores(),
                getMemoryTotal(),
                getSubNetTotal(),
                getBoundaryNodesTotal(),
                getNodeProvidersTotal()
            ])
            console.log(res)
            setState({
                nodeCount: res[0].ic_nodes_count[0][1],
                cpuCores: res[1].ic_cpu_cores[0][1],
                memoryTotal: getIcpStringFromE10s(res[2].ic_memory_total[0][1]),
                subNetsTotal: res[3].ic_subnet_total[1],
                boundaryNodes: res[4].boundary_nodes_count[1],
                nodeProviders: res[5].node_providers[0].node_providers
            })
        }
        getData()
    }, [])

    return (
        <div className="col-12 col-sm-12" style={{ marginTop: 30 }}>
            <h1>{t('nodeStatus')}</h1>
            <div className="card">
                <div className="info_block">
                    <div className="row">
                        <div className="col-12 col-sm-2 bordered-col">
                            <h3 className="info_block__accent">{state.nodeCount}</h3>
                            <TooltipText
                                className="control-label"
                                data-toggle="tooltip"
                                tooltip={t('nodeCount')}>
                                {t('nodeCount')}
                            </TooltipText>
                        </div>
                        <div className="col-12 col-sm-2 bordered-col">
                            <h3 className="info_block__accent">{state.cpuCores}</h3>
                            <TooltipText
                                tooltip={t('cpuCores')}
                                className="control-label"
                                data-toggle="tooltip">
                                {t('cpuCores')}
                            </TooltipText>
                        </div>
                        <div className="col-12 col-sm-2 bordered-col">
                            <h3 className="info_block__accent">{state.memoryTotal} TB</h3>
                            <TooltipText
                                className="control-label"
                                data-toggle="tooltip"
                                tooltip={t('memoryTotal')}>
                                {t('memoryTotal')}
                            </TooltipText>
                        </div>

                        <div className="col-12 col-sm-2 bordered-col">
                            <h3 className="info_block__accent">{state.subNetsTotal}</h3>
                            <TooltipText
                                className="control-label"
                                data-toggle="tooltip"
                                tooltip={t('subNetsTotal')}>
                                {t('subNetsTotal')}
                            </TooltipText>
                        </div>

                        <div className="col-12 col-sm-2 bordered-col">
                            <h3 className="info_block__accent">{state.boundaryNodes}</h3>
                            <TooltipText
                                className="control-label"
                                data-toggle="tooltip"
                                tooltip={t('boundaryNodes')}>
                                {t('boundaryNodes')}
                            </TooltipText>
                        </div>

                        <div className="col-12 col-sm-2 bordered-col">
                            <h3 className="info_block__accent">{state.nodeProviders}</h3>
                            <TooltipText
                                className="control-label"
                                data-toggle="tooltip"
                                tooltip={t('nodeProviders')}>
                                {t('nodeProviders')}
                            </TooltipText>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
