var polyhash = require('../../');
var polygon = [ [ 37.96, -122.45 ], [ 37.95, -122.90 ], [ 38.21, -122.62 ] ];

log(polyhash(polygon));

function log (msg) {
    var div = document.createElement('div');
    var s = typeof msg === 'string' ? msg : JSON.stringify(msg);
    var txt = document.createTextNode(s);
    div.appendChild(txt);
    document.body.appendChild(div);
}
