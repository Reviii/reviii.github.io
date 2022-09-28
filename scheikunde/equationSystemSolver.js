function solveEquationSystem(eqs, returnUnsolved=true) {
    let varCounts = []
    for (let i=0;i<eqs[0].length;i++) {
        varCounts[i] = 0;
    }
    for (let i=0;i<eqs.length;i++) {
        let eq = eqs[i];
        for (let j=0;j<eq.length;j++) {
            if (eq[j]!==0) varCounts[j]++;
        }
    }
    varCounts = varCounts.map((count,i)=>{return {count,i}});
    varCounts = varCounts.sort((a,b)=>a.count-b.count);
    let used = [];
    for (let i=0;i<varCounts.length;i++) {
        let v = varCounts[i].i;
        if (v===0) continue; // FIXME: this might interfere with unsolvable equation systems
        let eqI = -1;
        for (let j=0;j<eqs.length;j++) {
            if (eqs[j][v]!==0&&!used[j]) {
                eqI = j;
                break;
            }
        }
        if (eqI===-1) {
            console.log("Equation not found", v);
            continue;
        }
        used[eqI] = true;
        for (let j=0;j<eqs.length;j++) {
            if (j===eqI) continue;
            eqs[j] = substitute(eqs[j], eqs[eqI], v);
            eqs[j].source += " ("+eqs[eqI].source+")"
            if (Number.isNaN(eqs[j][0])) eqs.splice(j,1);
        }
        // TODO: maybe update varCounts?
    }
    for (let i=0;i<eqs.length;i++) {
        let eq = eqs[i];
        let v = -1;
        for (let j=eq.length-1;j>=0;j--) {
            if (eq[j]!==0) {
                v = j
                break;
            }
        }
        if (v===-1) continue;
        for (let j=0;j<eqs.length;j++) {
            if (j===i) continue;
            eqs[j] = substitute(eqs[j], eqs[i], v);
        }
    }
    let solved = [];
    let unsolved = [];
    for (let i=0;i<eqs.length;i++) {
        let eq = eqs[i];
        if (eq[0]===0) {
            unsolved.push(eq);
            break;
        }
        let varCount = 0;
        for (let j=0;j<eq.length;j++) {
            if (eq[j]!==0) varCount++;
        }
        if (varCount===2) {
            solved.push(eq);
        } else {
            unsolved.push(eq);
        }
    }
    if (returnUnsolved) {
        return {solved, unsolved, eqs};
    } else {
        return solved;
    }
}
function substitute(eqA, eqB, v) {
    let g = gcd(eqA[v], eqB[v]);
    let factorA = eqB[v]/g;
    let factorB = eqA[v]/g;
    for (let i=0;i<eqA.length;i++) {
        eqA[i] = eqA[i]*factorA-eqB[i]*factorB;
    }
    g = eqA.reduce((a,b)=>gcd(a,b));
    for (let i=0;i<eqA.length;i++) {
        eqA[i] /= g;
    }
    return eqA;
}
