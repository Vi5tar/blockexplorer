import { Alchemy, Network } from 'alchemy-sdk';

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
// https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

async function getBlockNumber() {
  return await alchemy.core.getBlockNumber();
}

export default async function Home() {
  const blockNumber = await getBlockNumber();
  
  return (
    <main className='flex justify-center'>Block Number: {blockNumber}</main>
  )
}
