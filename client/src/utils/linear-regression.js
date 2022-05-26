const math = require('mathjs')

const sum = (arr) => {
    let sum = 0
    for(let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum
}

const sumSquare = (arr) => {
    let sum = 0
    for(let i = 0; i < arr.length; i++) {
        sum +=  math.pow(arr[i], 2)
    }
    return sum
}

const sumxy = (arr1, arr2) => {
    let sum = 0
    for(let i = 0; i < arr1.length; i++) {
        sum +=  arr1[i] * arr2[i]
    }
    return sum
}

const linearRegression = (x, y) => {
    const n = x.length
    const sumX = sum(x)
    const sumSquareX = sumSquare(x)
    const sumY = sum(y)
    const sumXY = sumxy(x, y)

    const A =  [[n, sumX], 
                [sumX, sumSquareX]]
    
    const A1 = [[sumY, sumX],
                [sumXY, sumSquareX]]

    const A2 = [[n, sumY],
                [sumX, sumXY]]

    const a0 = math.det(A1) / math.det(A)
    const a1 = math.det(A2) / math.det(A)

    return [ a0, a1 ]
}

export default linearRegression