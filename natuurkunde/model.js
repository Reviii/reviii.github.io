var global = this;
onmessage = function(options) {
    global.options = options.data;
    options = global.options;
    var varInit = options.vars.map(a=>"var "+a+";").join("");
    var code = `var dt = options.dt;
    var dtLog = options.dtLog;
    var nextLog = -dt/2; // small value used to center around timesteps, like Math.round instead of Math.ceil
    var tEnd = options.t;
    var buffLen = Math.ceil(tEnd/dtLog)*8+80;
    let Buffer = global.SharedArrayBuffer || global.ArrayBuffer;
    var buffers = {t: new Buffer(buffLen)};
    var log = {loggedLength: 0, t: new Float64Array(buffers.t)};
    for (var i=0;i<options.vars.length;i++) {
        buffers[options.vars[i]] = new Buffer(buffLen);
        log[options.vars[i]] = new Float64Array(buffers[options.vars[i]]);
    }
    log.t.fill(-1);
    postMessage(buffers);
    ${varInit}
    ${options.init}
    for (var tIndex=0;tIndex<tEnd/dt;tIndex++) {
        let t = tIndex*dt;
        if (t>nextLog) {
            ${options.beforeLog}
            logData({${options.vars.join(", ")}, t}, log);
            ${options.afterLog}
            nextLog+=dtLog;
        }
        ${options.loop}
    }
    ${global.sharedArrayBuffer ? "" : "postMessage(buffers);"}
    function logData(data, log) {
        for (var i in data) {
            log[i][log.loggedLength] = data[i];
        }
        ${global.sharedArrayBuffer ? "" : "if (log.loggedLength%100===0) postMessage(buffers);"}
        log.loggedLength++;
    }`
    postMessage(code);
    Function(code)();
}
