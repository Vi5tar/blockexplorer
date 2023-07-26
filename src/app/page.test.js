import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from './page'

jest.mock('alchemy-sdk', () => {
    return {
        Alchemy: jest.fn().mockImplementation(() => {
            return {
                core: {
                    getBlockNumber: jest.fn().mockImplementation(() => {
                        return 123
                    })
                }
            }
        }),
        Network: {
            ETH_MAINNET: 'ETH_MAINNET'
        }
    }
})

describe('Home', () => {
    it('renders a block number', async () => {
        render(await Home())
        expect(screen.getByText('Block Number: 123')).toBeInTheDocument()
    })
})