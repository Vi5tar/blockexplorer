const truncateString = (str, options) => {
    const totalLength = options && options.length || 10
    const ellipsis = options && options.ellipsis || 'middle'
    const symbol = options && options.symbol || '...'
    const length = totalLength - symbol.length

    if (str.length <= totalLength) {
        return str
    }

    switch (ellipsis) {
        case 'start':
            return `${symbol}${str.slice(-length)}`
        case 'middle':
            return `${str.slice(0, Math.floor(length / 2))}${symbol}${str.slice(-Math.ceil(length / 2))}`
        case 'end':
            return `${str.slice(0, length)}${symbol}`
    }
}

export default truncateString