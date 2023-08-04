import { render, screen } from '@testing-library/react'

import alchemy from '@/lib/alchemy'
import moment from 'moment'

import LatestBlocks from './LatestBlocks'

const lastMinedBlockNumber = 123

jest.mock('alchemy-sdk', () => ({
    ...jest.requireActual('alchemy-sdk'),
    Alchemy: jest.fn(() => ({
        core: {
            getBlock: jest.fn((blockNumber) => {
                const block = {
                    hash: `0x${blockNumber}`,
                    number: blockNumber,
                    timestamp: blockNumber,
                    miner: `0x${blockNumber}`,
                    transactions: Array.from({ length: blockNumber }),
                    gasUsed: '15000',
                    gasLimit: '30000'
                }
                return Promise.resolve(block)
            })
        }
    }))
}))

describe('LatestBlocks', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('displays last 10 mined blocks', async () => {
        render(await LatestBlocks({ lastMinedBlock: lastMinedBlockNumber }))
        
        expect(screen.getByText('Latest Blocks')).toBeInTheDocument()
        expect(screen.queryAllByText(`${moment.unix(lastMinedBlockNumber).fromNow()}`)).toHaveLength(10)
        expect(screen.queryAllByText('0% Gas Target')).toHaveLength(10)
        for (let i = 0; i < 10; i++) {
            expect(screen.getByText(`${lastMinedBlockNumber - i}`)).toBeInTheDocument()
            expect(screen.getByText(`Miner 0x${lastMinedBlockNumber - i}`)).toBeInTheDocument()
            expect(screen.getByText(`${lastMinedBlockNumber - i} txns`)).toBeInTheDocument()
        }
    })
    it('fetches data for last 10 mined blocks', async () => {
        render(await LatestBlocks({ lastMinedBlock: lastMinedBlockNumber }))
        
        expect(alchemy.core.getBlock).toHaveBeenCalledTimes(10)
        for (let i = 0; i < 10; i++) {
            expect(alchemy.core.getBlock).toHaveBeenCalledWith(lastMinedBlockNumber - i)
        }
    })
})