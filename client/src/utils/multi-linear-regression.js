const math = require('mathjs')

const sumX = (arr) => {
    const A = math.matrix()
    A.subset(math.index(0, 0), arr[0].length)
    for(let row = 1; row < arr.length + 1; row++) {
        for(let col = 0; col <= row; col++) {
            let sum = 0
            for(let j = 0; j < arr[0].length; j++) {
                if(col === 0) {
                    sum += arr[row - 1][j]
                } 
                else if(row === col) {
                    sum += arr[row - 1][j] * arr[row - 1][j]
                } else {
                    sum += arr[row - 1][j] * arr[col - 1][j]
                }
            }
            A.subset(math.index(row, col), sum)
            if (row !== col) {
                A.subset(math.index(col, row), sum)  
            }
        } 
    }
    return A
}
const sumXY = (x, y) => {
    const B = math.matrix()
    B.subset(math.index(0, 0), sum(y))
    for(let row = 0; row < x.length + 1 - 1; row++) {
        let sum = 0
        for(let i = 0; i < y.length; i++) {
            sum += x[row][i] * y[i]
        }
        B.subset(math.index(row + 1, 0), sum)
    }
    return B
}

const sum = (arr) => {
    let sum = 0
    for(let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum
}

const multipleLinearRegression = (x, y) => {
    console.log(x)
    console.log(y)
    console.log([[-2, 0, 3, 0, 13],
        [0, 1, 0, -3, 0],
        [2, 3, -2, 0, 0],
        [0, 0, -3, 2, -15]])
    const A = sumX(x)
    const B = sumXY(x, y)
    const result = math.multiply(math.inv(A), B)
    console.log(result)
    return result
}
export default multipleLinearRegression
// A-1 * A * x = A-1 *b
// x = A-1 * b 