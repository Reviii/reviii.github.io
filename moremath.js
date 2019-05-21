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
fracadd([an, ad], [bn, bd]) {
    var cd = lcm(ad, bd);
    return [an*cd/ad+bn*cd/bd, cd];
}
fracsub([an, ad], [bn, bd]) {
    var cd = lcm(ad, bd);
    return [an*cd/ad-bn*cd/bd, cd];
}
function oplusfrac([an, ad], [bn, bd]) {
    var t = fracadd([ad, an], [bd, bn]);
    return [t[1], t[0]];
}
function ominfrac([an, ad], [bn, bd]) {
    var t = fracsub([ad, an], [bd, bn]);
    return [t[1], t[0]];
}
