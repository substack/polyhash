var polyhash = require('../');
var polygon = [
    [ 37.96, -122.45 ],
    [ 37.95, -122.90 ],
    [ 38.21, -122.62 ]
];
var hashes = polyhash(polygon, 3);
console.dir(hashes);
