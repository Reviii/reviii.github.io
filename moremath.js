function oplus(a, b) {
    return 1/(1/a+1/b);
}
function omin(a, b) {
    return 1/(1/a-1/b);
}
function gcd(a, b) {
    var t = b;
    while (b != 0) {
       t = b; 
       b = a % b; 
       a = t;
    } 
    return a;
}
function lcm(a, b) {
    return Math.abs(a*b)/gcd(a, b);
}
function fracadd([an, ad], [bn, bd]) {
    var cd = lcm(ad, bd);
    var cn = an*cd/ad+bn*cd/bd;
    var cg = gcd(cd, cn);
    return [cn/cg, cd/cg];
}
function fracsub([an, ad], [bn, bd]) {
    var cd = lcm(ad, bd);
    var cn = an*cd/ad-bn*cd/bd;
    var cg = gcd(cd, cn);
    return [cn/cg, cd/cg];
}
function fracmul([an, ad], [bn, bd]) {
    var cd = ad*bd;
    var cn = an*bn;
    var cg = gcd(cd, cn);
    return [cn/cg, cd/cg];
}
function fracdiv([an, ad], [bn, bd]) {
    var cd = ad*bn;
    var cn = an*bd;
    var cg = gcd(cd, cn);
    return [cn/cg, cd/cg];
}
function oplusfrac([an, ad], [bn, bd]) {
    var t = fracadd([ad, an], [bd, bn]);
    return [t[1], t[0]];
}
function ominfrac([an, ad], [bn, bd]) {
    var t = fracsub([ad, an], [bd, bn]);
    return [t[1], t[0]];
}
