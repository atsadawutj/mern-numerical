const math = require('mathjs')

const f = (x ,expr) => math.evaluate(expr, {x:x})
const f_div = (x, expr) => math.derivative(expr, 'x').evaluate({x: x}) 

const newtonRaphson = (x_old, expr) => {
    const es = 0.000001
    const arr = []
    let error = 1
    let i = 1

    while(error > es) {
        let x_new = x_old - (f(x_old, expr)/f_div(x_old, expr))
        error = math.abs((x_new - x_old) / x_new)
        arr.push({i: i++, x_new, x_old, error})
        x_old = x_new
    }
    return arr
}

export default newtonRaphson