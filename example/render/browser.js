var polyhash = require('../../');
var geohash = (function () {
    var gh = require('geohash');
    return {
        encode : gh.encodeGeoHash.bind(gh),
        decode : gh.decodeGeoHash.bind(gh)
    };
})();

var polygon = [ [ 37.96, -122.45 ], [ 37.95, -122.90 ], [ 38.21, -122.62 ] ];
polyhash(polygon, 5).forEach(plot);

polygon.forEach(function (pt) {
    var xy = toScreen(pt[0], pt[1]);
    var div = document.createElement('div');
    div.className = 'point';
    div.style.left = xy[0] - 3;
    div.style.top = xy[1] - 3;
    document.body.appendChild(div);
});

function plot (hash) {
    var decoded = geohash.decode(hash);
    var ex = {
        w : decoded.longitude[0],
        s : decoded.latitude[0],
        e : decoded.longitude[1],
        n : decoded.latitude[1],
    };
    var nw = toScreen(ex.n, ex.w);
    var se = toScreen(ex.s, ex.e);
    
    var div = document.createElement('div');
    div.className = 'hash';
    div.style.left = nw[0];
    div.style.top = nw[1];
    
    div.style.width = se[0] - nw[0];
    div.style.height = nw[1] - se[1];
    
    document.body.appendChild(div);
}

function toScreen (lat, lon) {
    var min = { lat : 37.5, lon : -123.5 };
    var max = { lat : 39.0, lon : -122.0 };
    var y = (lat - min.lat) / (max.lat - min.lat);
    var x = (lon - min.lon) / (max.lon - min.lon);
    return [ window.innerWidth * x, window.innerHeight * y ];
}
