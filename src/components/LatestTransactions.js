import alchemy from '@/lib/alchemy'
import { Utils } from 'alchemy-sdk'
import moment from 'moment'
import truncateString from '@/utils/format'

async function fetchLastTenTxs(lastMinedBlock) {
    let fetchBlockNumber = lastMinedBlock
    const txs = []
    while (txs.length < 10) {
        const txsFromBlock = await alchemy.core.getBlockWithTransactions(fetchBlockNumber).then(async (block) => {
            return block.transactions.slice(0, 10 - txs.length).map((tx) => {
                tx.timestamp = block.timestamp
                return tx
            })
        })
        txs.push(...txsFromBlock)
        fetchBlockNumber--
    }
    return txs
}

export default async function LatestTransactions({ lastMinedBlock }) {
    const lastTenTxs = await fetchLastTenTxs(lastMinedBlock)

    return (
        <div className="bg-white rounded shadow ring-1 ring-white ring-opacity-5">
            <div className="p-2 sm:p-3 lg:p-4">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Latest Transactions</h1>
            </div>
            <hr className="w-full" />
            <div className="flow-root p-2 sm:p-3 lg:p-4">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <tbody className="bg-white divide-y divide-gray-200">
                                {lastTenTxs.map((tx) => (
                                    <tr key={tx.hash}>
                                        <td className="w-1/3 px-3 py-5 text-sm whitespace-nowrap">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                </svg>
                                                <div>
                                                    <div className="font-medium text-gray-900">{truncateString(tx.hash, {length: 18, ellipsis: 'end'})}</div>
                                                    <div className="mt-1 text-gray-500">{moment.unix(tx.timestamp).fromNow()}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="w-1/3 px-3 py-5 text-sm text-gray-500 whitespace-nowrap">
                                            <div className="text-gray-900">{`From ${truncateString(tx.from, {length: 19})}`}</div>
                                            <div className="mt-1 text-gray-500">{`To ${truncateString(tx.to, {length: 19})}`}</div>
                                        </td>
                                        <td className="w-1/3 px-3 py-5 text-sm text-gray-500 whitespace-nowrap">
                                            <div className="text-right">{`${parseFloat(Utils.formatEther(tx.value)).toFixed(5)} Eth`}</div>
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