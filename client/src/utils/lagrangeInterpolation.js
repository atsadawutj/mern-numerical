export const lagrangeLinear = (arr, p1, p2, x) => {
    let x0 = arr[p1 - 1][0]
    let x1 = arr[p2 - 1][0]
    let fx0 = arr[p1 - 1][1]
    let fx1 = arr[p2 - 1][1]

    let a = (fx0 - fx1) / (x0 - x1)
    let b = (x0*fx1 - x1*fx0) / (x0 - x1)
    let l0 = (x1 - x) / (x1 - x0)
    let l1 = (x0 - x) / (x0 - x1)

    let result = l0*fx0 + l1*fx1
    return {result, a, b}
}
export const lagrangeQuadratic = (arr, p1, p2, p3, x) => {
    let x0 = arr[p1 - 1][0]
    let x1 = arr[p2 - 1][0]
    let x2 = arr[p3 - 1][0]

    let fx0 = arr[p1 - 1][1]
    let fx1 = arr[p2 - 1][1]
    let fx2 = arr[p3 - 1][1]

    let l0 = ((x2 - x)*(x1 - x)) / ((x2 - x0)*(x1 - x0))
    let l1 = ((x2 - x)*(x0 - x)) / ((x2 - x1)*(x0 - x1))
    let l2 = ((x1 - x)*(x0 - x)) / ((x1 - x2)*(x0 - x2))

    let result = l0*fx0 + l1*fx1 + l2*fx2
    return {result, l0, l1, l2}
}
export const lagrangePolynomial = (arr, point, x) => {
    let sum = 0
    for(let i of point) {
        let xi = arr[i - 1][0]
        let fxi = arr[i - 1][1]
        let li = 1
        for(let j of point) {
            if(j !== i) {
                let xj = arr[j - 1][0]
                li *= (x - xj) / (xi - xj)
            }
        }
        sum += li * fxi
    }
    return sum
}