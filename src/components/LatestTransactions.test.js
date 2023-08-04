import { render, screen } from '@testing-library/react'

import alchemy from '@/lib/alchemy'

import LatestTransactions from './LatestTransactions'

const lastMinedBlockNumber = 123

jest.mock('alchemy-sdk', () => ({
    ...jest.requireActual('alchemy-sdk'),
    Alchemy: jest.fn(() => ({
        core: {
            getBlockWithTransactions: jest.fn((blockNumber) => {
                const block = {
                    hash: `0x${blockNumber}`,
                    number: blockNumber,
                    timestamp: blockNumber,
                    miner: `0x${blockNumber}`,
                    transactions: Array.from({ length: blockNumber }, (_, i) => ({
                        hash: `0x${i}`,
                        from: `0x${i}`,
                        to: `0x${i}`,
                        value: `10000${i}0000000000000`
                    })),
                    gasUsed: '15000',
                    gasLimit: '30000'
                }
                return Promise.resolve(block)
            })
        }
    }))
}))

describe('LatestTransactions', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('displays last 10 transactions', async () => {
        render(await LatestTransactions({ lastMinedBlock: lastMinedBlockNumber }))

        expect(screen.getByText('Latest Transactions')).toBeInTheDocument()
        for (let i = 0; i < 10; i++) {
            expect(screen.getByText(`0x${i}`)).toBeInTheDocument()
            expect(screen.getByText(`From 0x${i}`)).toBeInTheDocument()
            expect(screen.getByText(`To 0x${i}`)).toBeInTheDocument()
            expect(screen.getByText(`1.0000${i} Eth`)).toBeInTheDocument()
        }
    })
    it('fetches data for last 10 transactions', async () => {
        render(await LatestTransactions({ lastMinedBlock: lastMinedBlockNumber }))

        expect(alchemy.core.getBlockWithTransactions).toHaveBeenCalledTimes(1)
        expect(alchemy.core.getBlockWithTransactions).toHaveBeenCalledWith(lastMinedBlockNumber)
    })
    it('fetches data for transactions from previous blocks if current block has less than 10 transactions', async () => {
        const numberOfTransactions = 5
        alchemy.core.getBlockWithTransactions.mockImplementation((blockNumber) => {
            const block = {
                hash: `0x${blockNumber}`,
                number: blockNumber,
                timestamp: blockNumber,
                miner: `0x${blockNumber}`,
                transactions: Array.from({ length: numberOfTransactions }, (_, i) => ({
                    hash: `0x${blockNumber}${i}`,
                    from: `0x${blockNumber}${i}`,
                    to: `0x${blockNumber}${i}`,
                    value: `10${blockNumber}${i}0000000000000`
                })),
                gasUsed: '15000',
                gasLimit: '30000'
            }
            return Promise.resolve(block)
        })

        render(await LatestTransactions({ lastMinedBlock: lastMinedBlockNumber }))

        const expectedCalls = 10 / numberOfTransactions
        expect(alchemy.core.getBlockWithTransactions).toHaveBeenCalledTimes(expectedCalls)
        for (let i = 0; i < expectedCalls; i++) {
            expect(alchemy.core.getBlockWithTransactions).toHaveBeenCalledWith(lastMinedBlockNumber - i)
        }
    })
})