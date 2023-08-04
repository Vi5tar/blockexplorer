import { render, screen } from '@testing-library/react'

import alchemy from '@/lib/alchemy'

import Block from './page'

const blockNumber = 6174

jest.mock('alchemy-sdk', () => ({
    ...jest.requireActual('alchemy-sdk'),
    Alchemy: jest.fn(() => ({
        core: {
            getBlock: jest.fn((block) => {
                if (block === blockNumber) {
                    return Promise.resolve({
                        number: blockNumber
                    })
                }
                return Promise.resolve(null)
            })
        }
    }))
}))

describe('Block', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('displays block number', async () => {
        render(await Block({ params: { blockNumber } }))

        expect(screen.getByText(`#${blockNumber}`)).toBeInTheDocument()
    })
    it('fetches block data', async () => {
        render(await Block({ params: { blockNumber } }))

        expect(alchemy.core.getBlock).toHaveBeenCalledTimes(1)
        expect(alchemy.core.getBlock).toHaveBeenCalledWith(blockNumber)
    })
    it('throws NEXT_NOT_FOUND error if block does not exist', async () => {
        expect.assertions(1)
        try {
            render(await Block({ params: { blockNumber: blockNumber + 1 } }))
        } catch (e) {
            expect(e).toEqual(new Error('NEXT_NOT_FOUND'))
        }
    })
})