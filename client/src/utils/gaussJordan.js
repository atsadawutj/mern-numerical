const gaussJordan = (a) => {
    const result = []
    for (let i = 0; i < a.length - 1; i++) {
        for (let j = i + 1; j < a.length; j++) {
            //a[1][0] / a[0][0]
            //a[2][0] / a[0][0]
            //a[2][1] / a[1][1]
            let m = a[j][i] / a[i][i];
            //a[1][0] = a[1][0]  - (m * a[0][0])
            //a[1][1] = a[1][1]  - (m * a[0][1])
    
            //a[2][0] = a[2][0]  - (m * a[0][0])
            //a[2][1] = a[2][1]  - (m * a[0][1])
            for (let k = 0; k < a[0].length; k++) {
              a[j][k] = a[j][k] - m * a[i][k];
            }
        }
    }
    
    for (let i = a.length - 1; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            //a[1][2] / a[2][2]
            //a[0][2] / a[2][2]
            //a[0][1] / a[1][1]
            let m = a[j][i] / a[i][i];
            //a[1][0] = a[1][0]  - (m * a[2][0])
            //a[1][1] = a[1][1]  - (m * a[2][1])
    
            //a[0][0] = a[0][0]  - (m * a[2][0])
            //a[0][1] = a[0][1]  - (m * a[2][1])
            for (let k = 0; k < a[0].length; k++) {
              a[j][k] = a[j][k] - (m * a[i][k]);
            }
        }
    }
    console.log(a)
    for(let i=0; i < a.length; i++){
        result.push(a[i][a[0].length - 1] / a[i][i])
    }
    return result
}

export default gaussJordan