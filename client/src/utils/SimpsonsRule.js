const math = require('mathjs')

const f = (x ,expr) => math.evaluate(expr, {x:x})

export const singleSimpson = (a, b, expr) => {
    let h = (b - a) / 2
    let c = a + h
    let result = (1/3) * h * (f(a, expr) + f(c, expr) * 4 + f(b, expr))
    return result
}

export const compositeSimpson = (a, b, expr, n) => {
    let h = (b - a) / n
    let sum = 0
    let c = a
    for(let i = 1; i < n; i++) {
        c += h
        sum += (i % 2 !== 0) ? f(c, expr) * 4 : f(c, expr) * 2
    }
    let result = (1/3) * h * (f(a, expr) + f(b, expr) + sum)
    return result
}