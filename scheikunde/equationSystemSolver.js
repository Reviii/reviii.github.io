function divideByGcd(arr) {
    let d = 0
    for (let i=0;i<arr.length;i++) {
        d = gcd(d, Math.abs(arr[i]))
    }
    if (d<=0) return arr
    for (let i=0;i<arr.length;i++) {
        arr[i] /= d
    }
    return arr
}
// note that extraCondition does not apply to very simple (variable=0) results
function solveEquationSystem(equations, extraCondition=()=>true, returnUnsolved=false) {
    equations.map(divideByGcd)
    console.log(equations)
    let sol = []
    let didSomething = true
    while (didSomething) {
        didSomething = false
        for (let i=0;i<equations.length;i++) {
            let vars = []
            for (let j=0;j<equations[i].length;j++) {
                if (equations[i][j]) vars[vars.length] = j
            }
            if (vars.length==0) {
                equations.splice(i, 1)
                i--
                continue;
            } else if (vars.length===1) {
                for (let j=0;j<equations.length;j++) {
                    if (j!==i) {
                        equations[j][vars[0]] = 0
                    }
                }
                sol[sol.length] = equations.splice(i, 1)[0]
                i--
            } else if (vars.length===2) {
                for (let j=0;j<equations.length;j++) {
                    if (equations[j][vars[1]]&&j!==i) {
                        didSomething = true
                        // make sure everything is divisable
                        for (let k=0;k<equations[j].length;k++) {
                            equations[j][k] *= equations[i][vars[1]]
                        }
                        equations[j][vars[0]] -= equations[j][vars[1]] * equations[i][vars[0]] / equations[i][vars[1]]
                        equations[j][vars[1]] = 0

                        divideByGcd(equations[j])
                    }
                }
                if (extraCondition(equations[i])) {
                    sol[sol.length] = equations.splice(i, 1)[0]
                    i--
                }
                console.log(equations)
            }
        }
    }
    if (returnUnsolved) {
        return {solved: sol, unsolved: equations}
    }
    return sol;
}
