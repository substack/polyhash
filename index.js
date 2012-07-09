var inside = require('point-in-polygon');
var geohash = (function () {
    var gh = require('geohash');
    return {
        encode : gh.encodeGeoHash.bind(gh),
        decode : gh.decodeGeoHash.bind(gh),
        subs : gh.subGeohashes.bind(gh)
    };
})();

var commondir = require('commondir');
function commonHash (hashes) {
    var paths = hashes.map(function (s) {
        return '/' + s.split('').join('/');
    });
    return commondir(paths).split('/').join('');
}

function containment (hash, polygon) {
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
    
    var c = hpoly.filter(function (pt) {
        return inside(pt, polygon);
    }).length;
    return { 0 : 'none', 4 : 'complete' }[c] || 'partial';
}

module.exports = function (points, level) {
    var ch = commonHash(points.map(function (p) {
        return geohash.encode(p[0], p[1]);
    }));
    if (level === undefined) level == 22;
    
    var res = (function divide (hash) {
        var c = containment(hash, points);
        if (hash.length >= level) return c === 'none' ? [] : [ hash ];
        if (c === 'complete') return [ hash ];
        
        return geohash.subs(hash).reduce(function (acc, sh) {
            return acc.concat(divide(sh));
        }, []);
    })(ch);
    return res.length ? res : [ ch ];
};
