var fs = require('fs');
var rimraf = require('rimraf');
var sanitize = require('sanitize-filename');

var clearDownloads = function (dir, callback) {
    rimraf(dir, function () {
        fs.mkdir(dir, function () {
            callback(dir);
        });
    }); 
}

var mkArtistDirectory = function (name, callback) {
    var dir = name.replace(/[\?<>\\:\*\|":]/g, ''); // remove illegal chars
    dir = dir.replace(/ /g, '_');
    fs.mkdir(dir, function () {
        callback(dir);
    });
}

module.exports.clearDownloads = clearDownloads;
module.exports.mkArtistDirectory = mkArtistDirectory;