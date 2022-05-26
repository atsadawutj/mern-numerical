const math = require('mathjs')

const jacobi = (a, b) => {
    const result = []
    const es = 0.000001
    let iteration = 1
    let x_new = []
    const n = a.length
    let x_old = new Array(n).fill(0);
    const temp = []

    for(let i = 0; i < n; i++) {
        let k = b[i]
        for(let j = 0; j < n; j++){
            if(i !== j) {
                k = k - a[i][j]*x_old[j]
            }
        }
        temp[i] = k / a[i][i]
    }
    x_old = math.clone(temp)
    result.push({i: iteration++ , x_new: x_old})

    let inloop = true
    while(inloop) {
        for(let i = 0; i < n; i++) {
            let k = b[i]
            for(let j = 0; j < n; j++){
                if(i !== j) {
                    k = k - a[i][j]*x_old[j] 
                }
            }
            temp[i] = k / a[i][i]
        }
        x_new = math.clone(temp)
        const error = []
        for(let i = 0; i < n; i++) {
            error[i] = math.abs((x_new[i] - x_old[i]) / x_new[i])
        }
        result.push({i: iteration++, x_new, error})
        for(let i = 0; i < n; i++) {
            if(es > error[i]) {
                inloop = false
            } else {
                inloop = true
                break
            }
        }
        x_old = math.clone(x_new)
    }
    return result
}

export default jacobi