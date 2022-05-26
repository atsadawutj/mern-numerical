const math = require("mathjs");

const bisection = (expr, xl, xr) => {
    const f = (x) => math.evaluate(expr, x);
    xl = parseFloat(xl);
    xr = parseFloat(xr);
    const ES = 0.000001;
    let err = 1;
    let answer = [];

    if (f({ x: xl }) * f({ x: xr }) > 0) {
        return false;
    }

    let i = 1;
    let xm_old = (xl + xr) / 2;
    let fxm_old = f({ x: xm_old })

    if (f({ x: xm_old }) * f({ x: xr }) < 0) {
        xl = xm_old;
    } else {
        xr = xm_old;
    }
    answer.push({ i: i++, xm: xm_old, fxm: fxm_old, xl, xr });

    while (err > ES && i < 1000) {
        let xm = (xl + xr) / 2;
        let fxm = f({ x: xm });
        if (f({ x: xm }) * f({ x: xr }) < 0) {
            xl = xm;
        } else {
            xr = xm;
        }
        err = math.abs((xm - xm_old) / xm);
        answer.push({ i, xm, fxm, xl, xr });
        xm_old = xm;
        i++;
    }
    return answer;
};
module.exports = bisection;
