const gaussElimination = (a) => {
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
            for (let k = 0; k < a.length + 1; k++) {
                a[j][k] = a[j][k] - m * a[i][k];
            }
        }
    }
    const x = []
    x[a.length - 1] = a[a.length - 1][a.length]/a[a.length - 1][a.length - 1]

    for(let i = a.length - 2; i > - 1; i--) {
        x[i] = a[i][a.length]
        for (let j = i + 1; j < a.length; j++){
            x[i] = x[i] - a[i][j]*x[j]
        }

        x[i] = x[i]/a[i][i]
    }
    return x
}

export default gaussElimination