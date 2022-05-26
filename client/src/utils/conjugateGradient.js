const math = require('mathjs')

const conjugateGradient = (a, b) => {
    const result = []
    let x_old = new Array(a.length).fill(0)
    let x_new = new Array(a.length).fill(0)
    const es = 0.000001
    let error = 1
    let i = 1
    let r = math.subtract(math.multiply(a, x_old), b)
    let d = math.subtract(0, r)
    let lamda  = math.multiply(math.subtract(0, d), r) / math.multiply(math.multiply(d, a), d)
    //result.push({i: i++, r, d, lamda})

    while(error > es) {
        x_new = math.add(x_old, math.multiply(lamda, d))

        r = math.subtract(math.multiply(a, x_new), b)

        error = math.sqrt(math.multiply(r, r))
 
        let alpha = math.multiply(math.multiply(r, a), d) / math.multiply(math.multiply(d, a), d)

        d = math.add(math.subtract(0, r), math.multiply(alpha, d))

        lamda  = math.multiply(math.subtract(0, d), r) / math.multiply(math.multiply(d, a), d)

        result.push({i: i++, x_new, error, r, d, lamda})
        x_old  = math.clone(x_new)
    }
    return result
}

export default conjugateGradient