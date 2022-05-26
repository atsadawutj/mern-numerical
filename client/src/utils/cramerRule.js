const math = require('mathjs')

const cramerRule = (a, b) => {
    const result = []
    const detA = math.det(a)
    for(let i = 0; i < a.length; i++) {
        const arr = math.clone(a)
        for(let j = 0; j < a.length; j++) {
            arr[j][i] = b[j]
        }
        console.log(math.det(arr))
        const x = math.det(arr) / detA
        result.push(x)
    }
    return result
}

export default cramerRule