const math = require('mathjs')

const f = (expr ,x) => math.evaluate(expr, {x:x})
const f_div = (expr ,x) => math.derivative(expr, 'x').evaluate({x: x})

const firstforwardH = (expr ,x, h) => {
    const result = (f(expr, x+h) - f(expr, x)) / h
    const exact = f_div(expr, x)
    const error = ((exact - result) / exact) * 100
    return {result, error}
}
const secondforwardH = (expr ,x, h) => {
    const result = (f(expr, x+h+h) + (-2*f(expr, x+h)) + f(expr, x)) / math.pow(h, 2)
    const exact = f_div(expr, x)
    const error = ((exact - result) / exact) * 100
    return {result, error}
}
const firstforwardH2 = (expr ,x, h) => {
    const result = ((-1*f(expr, x+h+h)) + (4*f(expr, x+h)) + (-3*f(expr, x))) / (2 * h)
    const exact = f_div(expr, x)
    const error = ((exact - result) / exact) * 100
    return {result, error}
}
const secondforwardH2 = (expr ,x, h) => {
    const result = ((-1*f(expr, x+h+h+h)) + (4*f(expr, x+h+h)) + (-5*f(expr, x+h)) + (2*f(expr, x))) / math.pow(h, 2)
    const exact = f_div(expr, x)
    const error = ((exact - result) / exact) * 100
    return {result, error}
}

export {firstforwardH, secondforwardH, firstforwardH2, secondforwardH2}