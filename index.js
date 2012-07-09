var inside = require('point-in-polygon');
var geohash = (function () {
    var gh = require('geohash');
    return {
        encode : gh.encodeGeoHash.bind(gh),
        decode : gh.decodeGeoHash.bind(gh)
    };
})();
var commondir = require('commondir');
function commonHash (hashes) {
    var paths = hashes.map(function (s) {
        return '/' + s.split('').join('/');
    });
    return commondir(paths).split('/').join('');
}
var extents = require('./lib/extents');

function completelyContained (hash, polygon) {
    var decoded = geohash.decode(hash);
    var hext = {
        w : decoded.longitude[0],
        s : decoded.latitude[0],
        e : decoded.longitude[1],
        n : decoded.latitude[1],
    };
    var hpoly = [
        [ hext.s, hext.w ],
        [ hext.s, hext.e ],
        [ hext.n, hext.e ],
        [ hext.n, hext.w ],
    ];
    return hpoly.every(function (pt) {
        return inside(pt, polygon);
    });
}

module.exports = function (points, level) {
    var ch = commonHash(points.map(function (p) {
        return geohash.encode(p[0], p[1]);
    }));
    return completelyContained(ch, points);
};
