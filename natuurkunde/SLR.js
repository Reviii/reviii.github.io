function SLR() {
    this.x = 0;
    this.xx = 0;
    this.y = 0;
    this.yy = 0;
    this.xy = 0;
    this.n = 0;
}
SLR.prototype.addPoint = function(x, y) {
    this.x += x;
    this.xx += x*x;
    this.y += y;
    this.yy += y*y;
    this.xy += x*y;
    this.n++;
}
SLR.prototype.removePoint = function(x, y) { // less accurate than just recomputing using addPoint
    this.x -= x;
    this.xx -= x*x;
    this.y -= y;
    this.yy -= y*y;
    this.xy -= x*y;
    this.n--;
}
SLR.prototype.getSlope = function() {
    return (this.n*this.xy-this.x*this.y)/(this.n*this.xx-this.x*this.x)
}
SLR.prototype.getIntersect = function(slope) {
    if (arguments.length<1) slope = this.getSlope();
    return this.y/this.n-slope*this.x/this.n;
}
SLR.prototype.getSlopeErrorSquared = function(slope) {
    if (arguments.length<1) slope = this.getSlope();
    return (this.n*this.yy-this.y*this.y-slope*slope*(this.n*this.xx-this.x*this.x))/((this.n-2)*(this.n*this.xx-this.x*this.x));
}
