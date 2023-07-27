import alchemy from '@/lib/alchemy';

import LatestBlocks from '@/components/LatestBlocks';

export default async function Home() {
  const lastMinedBlockNumber = await alchemy.core.getBlockNumber();
  
  return (
    <main className='flex flex-col h-screen px-4 sm:px-6 lg:px-8'>
      <div>
        Last Mined Block: {lastMinedBlockNumber}
      </div>
      <LatestBlocks lastMinedBlock={lastMinedBlockNumber} />
    </main>
  )
}
