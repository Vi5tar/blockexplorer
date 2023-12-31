import { render, screen } from '@testing-library/react'

import Home from './page'
import LatestBlocks from '@/components/LatestBlocks'
import LatestTransactions from '@/components/LatestTransactions'

const lastMinedBlockNumber = 123

jest.mock('alchemy-sdk', () => ({
    ...jest.requireActual('alchemy-sdk'),
    Alchemy: jest.fn(() => ({
        core: {
            getBlockNumber: jest.fn(() => {
                return lastMinedBlockNumber
            })
        }
    }))
}))

jest.mock(...component('@/components/LatestBlocks'))
jest.mock(...component('@/components/LatestTransactions'))

describe('Home', () => {
    it('displays last mined block number', async () => {
        render(await Home())
        expect(screen.getByText(`Last Mined Block: ${lastMinedBlockNumber}`)).toBeInTheDocument()
    })

    it('renders LatestBlocks component', async () => {
        render(await Home())
        expect(LatestBlocks.mock).toHaveBeenCalledWith({ lastMinedBlock: lastMinedBlockNumber })
        expect(screen.getByTestId(LatestBlocks.testId)).toBeInTheDocument()
    })

    it('renders LatestTransactions component', async () => {
        render(await Home())
        expect(LatestTransactions.mock).toHaveBeenCalledWith({ lastMinedBlock: lastMinedBlockNumber })
        expect(screen.getByTestId(LatestTransactions.testId)).toBeInTheDocument()
    })
})