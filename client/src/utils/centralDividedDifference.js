const math = require('mathjs')

const f = (expr ,x) => math.evaluate(expr, {x:x})
const f_div = (expr ,x) => math.derivative(expr, 'x').evaluate({x: x})

export const firstCentralH2 = (expr ,x, h) => {
    const result = (f(expr, x+h) - f(expr, x-h)) / (2*h)
    const exact = f_div(expr, x)
    const error = ((exact - result) / exact) * 100
    return {result, error}
}
export const secondCentralH2 = (expr ,x, h) => {
    const result = (f(expr, x+h) + (-2*f(expr, x)) + f(expr, x-h)) / math.pow(h, 2)
    const exact = f_div(expr, x)
    const error = ((exact - result) / exact) * 100
    return {result, error}
}
export const firstCentralH4 = (expr ,x, h) => {
    const result = ((-1*f(expr, x+h+h)) + (8*f(expr, x+h)) + (-8*f(expr, x-h)) + (f(expr, x-h-h))) / (12*h)
    const exact = f_div(expr, x)
    const error = ((exact - result) / exact) * 100
    return {result, error}
}
export const secondCentralH4 = (expr ,x, h) => {
    const result = ((-1*f(expr, x+h+h)) + (16*f(expr, x+h)) + (-30*f(expr, x)) + (16*f(expr, x-h)) + (-1*f(expr, x-h-h))) / (12*(math.pow(h,2)))
    const exact = f_div(expr, x)
    const error = ((exact - result) / exact) * 100
    return {result, error}
}