import alchemy from '@/lib/alchemy';

import LatestBlocks from '@/components/LatestBlocks';
import LatestTransactions from '@/components/LatestTransactions';

export default async function Home() {
  const lastMinedBlockNumber = await alchemy.core.getBlockNumber();
  
  return (
    <main className='flex flex-col h-screen px-4 sm:px-6 lg:px-8'>
      <div>
        Last Mined Block: {lastMinedBlockNumber}
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <LatestBlocks lastMinedBlock={lastMinedBlockNumber} />
        <LatestTransactions lastMinedBlock={lastMinedBlockNumber} />
      </div>
    </main>
  )
}
