const math = require('mathjs')

const f = (expr ,x) => math.evaluate(expr, {x:x})
const f_div = (expr ,x) => math.derivative(expr, 'x').evaluate({x: x})

export const firstBackwardH = (expr ,x, h) => {
    const result = (f(expr, x) - f(expr, x-h)) / h
    const exact = f_div(expr, x)
    const error = ((exact - result) / exact) * 100
    return {result, error}
}
export const secondBackwardH = (expr ,x, h) => {
    const result = (f(expr, x) + (-2*f(expr, x-h)) + f(expr, x-h-h)) / math.pow(h, 2)
    const exact = f_div(expr, x)
    const error = ((exact - result) / exact) * 100
    return {result, error}
}
export const firstBackwardH2 = (expr ,x, h) => {
    const result = ((3*f(expr, x)) + (-4*f(expr, x-h)) + f(expr, x-h-h)) / (2 * h)
    const exact = f_div(expr, x)
    const error = ((exact - result) / exact) * 100
    return {result, error}
}
export const secondBackwardH2 = (expr ,x, h) => {
    const result = ((2*f(expr, x)) + (-5*f(expr, x-h)) + (4*f(expr, x-h-h)) + (-1*f(expr, x-h-h-h))) / math.pow(h, 2)
    const exact = f_div(expr, x)
    const error = ((exact - result) / exact) * 100
    return {result, error}
}