import { Alchemy, Network } from 'alchemy-sdk'

const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
}

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
// https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface

// NOTE: Using a global variable here to avoid re-initializing
// 
// idk that it really matters for the alchemy client but this seems pretty awesome for prisma client and the like
//
// https://stackoverflow.com/a/75273986
// https://vercel.com/guides/nextjs-prisma-postgres#step-4.-install-and-generate-prisma-client
let alchemy

if (process.env.NODE_ENV === 'production') {
    alchemy = new Alchemy(settings)
} else {
    if (!global.alchemy) {
        global.alchemy = new Alchemy(settings)
    }
    alchemy = global.alchemy
}

export default alchemy