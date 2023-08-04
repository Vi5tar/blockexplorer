import alchemy from '@/lib/alchemy'
import moment from 'moment'
import truncateString from '@/utils/format'

export default async function LatestBlocks({ lastMinedBlock }) {
    const calculatePercentFromGasTarget = (block) => {
        const gasUsed = parseInt(block.gasUsed)
        const gasLimit = parseInt(block.gasLimit)
        const percentGasUsed = (gasUsed / gasLimit) * 100
        const targetPercentage = 50
        const percentFromTarget = (((percentGasUsed / targetPercentage) - 1) * 100).toFixed()
        return percentFromTarget
    }
    
    const fetchBlocksData = Array.from({ length: 10 }, (_, i) => {
        return alchemy.core.getBlock(lastMinedBlock - i).then((block) => {
            block.percentFromTarget = calculatePercentFromGasTarget(block)
            return block
        })
    })

    const blocks = await Promise.all(fetchBlocksData)

    return (
        <div className="bg-white rounded shadow ring-1 ring-white ring-opacity-5">
            <div className="p-2 sm:p-3 lg:p-4">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Latest Blocks</h1>
            </div>
            <hr className="w-full" />
            <div className="flow-root p-2 sm:p-3 lg:p-4">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <tbody className="bg-white divide-y divide-gray-200">
                                {blocks.map((block) => (
                                    <tr key={block.hash}>
                                        <td className="w-1/3 px-3 py-5 text-sm whitespace-nowrap">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                                                </svg>
                                                <div>
                                                    <div className="font-medium text-gray-900">{block.number}</div>
                                                    <div className="mt-1 text-gray-500">{moment.unix(block.timestamp).fromNow()}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="w-1/3 px-3 py-5 text-sm text-gray-500 whitespace-nowrap">
                                            <div className="text-gray-900">{`Miner ${truncateString(block.miner, {length: 18})}`}</div>
                                            <div className="mt-1 text-gray-500">{`${block.transactions.length} txns`}</div>
                                        </td>
                                        <td className="w-1/3 px-3 py-5 text-sm text-gray-500 whitespace-nowrap">
                                            <div className={`${block.percentFromTarget > 0 ? "text-green-500" : "text-red-500"} text-right`}>{`${block.percentFromTarget}% Gas Target`}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}