var geohash = {
    encode : require('geohash').encodeGeoHash
};

module.exports = function (points, level) {
    return points.map(function (p) {
        return geohash.encode(p[0], p[1]);
    });
};
