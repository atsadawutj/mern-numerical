const math = require('mathjs')

const f = (x ,expr) => math.evaluate(expr, {x:x})
const f_secant = (x1,x0, expr) => f(x1, expr) * (x1 - x0) / (f(x1, expr) - f(x0, expr))

const secant = (x0, x1, expr) => {
    const es = 0.000001
    const arr = []
    let x_old = f_secant(x1, x0, expr)
    
    let error = 1
    let i = 1
    arr.push({i: i++, x_new: x_old, x_old: '', error: ''})

    while(error > es) {
        let x_new = x_old - f_secant(x_old, x1, expr)
        error = Math.abs((x_new - x_old) / x_new)

        arr.push({i: i++, x_new, x_old, error})
        x1 = x_old
        x_old = x_new
    }
    return arr
}
export default secant