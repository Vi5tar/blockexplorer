import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Home from './page'
import LatestBlocks from '../components/LatestBlocks'

const lastMinedBlockNumber = 123

jest.mock('alchemy-sdk', () => {
    return {
        Alchemy: jest.fn().mockImplementation(() => {
            return {
                core: {
                    getBlockNumber: jest.fn().mockImplementation(() => {
                        return lastMinedBlockNumber
                    })
                }
            }
        }),
        Network: {
            ETH_MAINNET: 'ETH_MAINNET'
        }
    }
})

jest.mock('../components/LatestBlocks', () => {
    const mock = jest.fn()
    const MockLatestBlocks = (props) => {
        mock(props)
        return <div data-testid='mock-latest-blocks'></div>
    }
    MockLatestBlocks.mock = mock
    return MockLatestBlocks
})

describe('Home', () => {
    it('displays last mined block number', async () => {
        render(await Home())
        expect(screen.getByText(`Last Mined Block: ${lastMinedBlockNumber}`)).toBeInTheDocument()
    })

    it('renders LatestBlocks component', async () => {
        render(await Home())
        expect(LatestBlocks.mock).toHaveBeenCalledWith({lastMinedBlock: lastMinedBlockNumber})
        expect(screen.getByTestId('mock-latest-blocks')).toBeInTheDocument()
    })
})