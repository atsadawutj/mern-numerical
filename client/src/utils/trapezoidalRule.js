const math = require('mathjs')

const f = (x ,expr) => math.evaluate(expr, {x:x})

export const singleTrapezoidal = (a, b, expr) => {
    let h = b - a
    let result = (1/2) * h * (f(a, expr) + f(b, expr))
    return result
}

export const compositeTrapezoidal = (a, b, expr, n) => {
    let h = (b - a) / n
    let sum = 0
    let c = a
    for(let i = 0; i < n - 1; i++) {
        c += h
        sum += f(c, expr) * 2
    }
    let result = (1/2) * h * (f(a, expr) + f(b, expr) + sum)
    return result
}