import { notFound } from 'next/navigation'

import alchemy from '@/lib/alchemy';

export default async function Block({ params }) {
    const blockNumber = parseInt(params.blockNumber)

    const block = await alchemy.core.getBlock(blockNumber)
    if (!block) {
        notFound()
    }

    console.log(block)

    return (
        <main className='flex flex-col h-screen px-4 sm:px-6 lg:px-8'>
            <div className="flex items-center my-2">
                <h1 className="mr-1">
                    Block
                </h1>
                <div className="text-sm leading-normal text-gray-300">
                    {`#${block.number}`}
                </div>
            </div>
            <hr />
        </main>
    )
}