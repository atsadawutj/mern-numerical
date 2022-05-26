const math = require('mathjs')

const sumX = (arr, m) => {
    let sum = 0
    const A = math.matrix()
    for(let row = 0; row <= m; row++){
        let col = 0
        for(let i = row; i <= row + m; i++) {
            for(let j = 0; j < arr.length; j++) {
                sum +=  math.pow(arr[j], i)
            }
            A.subset(math.index(row, col), sum)
            sum = 0
            col++;
        }
    }
    return A
}

const sumXY = (x, y, m) => {
    let sum = 0
    const A = math.matrix()
    for(let i = 0; i <= m; i++){
            for(let j = 0; j < x.length; j++) {
                sum +=  math.pow(x[j], i) * y[j]
            }
            A.subset(math.index(i, 0), sum)
            sum = 0
        }
    return A
}

const polynomialRegression = (x, y, m) => {
    const A = sumX(x, m)
    const B = sumXY(x, y, m)

    const result = math.multiply(math.inv(A), B)
    console.log(result)

    return result
}

export default polynomialRegression