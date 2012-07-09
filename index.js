var geohash = {
    encode : require('geohash').encodeGeoHash
};
var commondir = require('commondir');
function commonHash (hashes) {
    var paths = hashes.map(function (s) {
        return '/' + s.split('').join('/');
    });
    return commondir(paths).split('/').join('');
}

module.exports = function (points, level) {
    var hashes = points.map(function (p) {
        return geohash.encode(p[0], p[1]);
    });
    return commonHash(hashes);
};
