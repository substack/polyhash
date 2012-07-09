module.exports = function (points) {
    var lats = points.map(function (p) { return p[0] });
    var lons = points.map(function (p) { return p[1] });
    return {
        w : Math.min.apply(null, lons),
        s : Math.min.apply(null, lats),
        e : Math.max.apply(null, lons),
        n : Math.max.apply(null, lats),
    };
};
