var test = require('tap').test;
var polyhash = require('../');

// todo: plot this to make sure it looks right

test('hash level 4', function (t) {
    t.plan(1);
    var polygon = [
        [ 37.96, -122.45 ],
        [ 37.95, -122.90 ],
        [ 38.21, -122.62 ]
    ];
    var hashes = polyhash(polygon, 4);
    t.same(hashes, [ '9q8x', '9q8z', '9qb8', '9qbb' ]);
    // ^ is this even correct?
});
