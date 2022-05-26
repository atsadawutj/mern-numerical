const math = require('mathjs')

const gaussSeidel = (a, b) => {
    const result = []
    const es = 0.00001
    let iteration = 1
    let x_new = []
    const n = a.length
    let x_old = new Array(n).fill(0);

    for(let i = 0; i < n; i++) {
        let k = b[i]
        for(let j = 0; j < n; j++){
            if(i !== j) {
                k = k - a[i][j]*x_old[j]
            }
            x_old[i] = k / a[i][i]
        }
    }
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
            x_new[i] = k / a[i][i]
        }
        const error = []
        for(let i = 0; i < n; i++) {
            error[i] = math.abs((x_new[i] - x_old[i]) / x_new[i])
        }
        result.push({i: iteration++, x_new, error})
        for(let i = 0; i < n; i++) {
            if(error[i] > es) {
                inloop = true
                break
            } else {
                inloop = false
            }
        }
        x_old = math.clone(x_new)
    }
    return result
}

export default gaussSeidel