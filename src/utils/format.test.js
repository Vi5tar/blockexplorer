import truncateString from './format'

describe('format', () => {
    describe('truncateString', () => {
        it('truncates string to specified length', () => {
            const str = '1234567890'
            const options = { length: 5 }
            const result = truncateString(str, options)
            expect(result.length).toEqual(5)
        })
        it('truncates string to specified length with ellipsis at start', () => {
            const str = '1234567890'
            const options = { length: 5, ellipsis: 'start' }
            const result = truncateString(str, options)
            expect(result).toEqual('...90')
        })
        it('truncates string to specified length with ellipsis at middle', () => {
            const str = '1234567890'
            const options = { length: 5, ellipsis: 'middle' }
            const result = truncateString(str, options)
            expect(result).toEqual('1...0')
        })
        it('truncates string to specified length with ellipsis at end', () => {
            const str = '1234567890'
            const options = { length: 5, ellipsis: 'end' }
            const result = truncateString(str, options)
            expect(result).toEqual('12...')
        })
        it('truncates string to specified length with custom ellipsis', () => {
            const str = '1234567890'
            const options = { length: 5, ellipsis: 'middle', symbol: '###' }
            const result = truncateString(str, options)
            expect(result).toEqual('1###0')
        })
        it('truncates string with default options', () => {
            const str = '1234567891011121314151617181920'
            const result = truncateString(str)
            expect(result).toEqual('123...1920')
        })
    })
})