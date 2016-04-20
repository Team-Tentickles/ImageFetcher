var photofetcher = require('./photofetcher');
var getartists = require('./getartists');
var managedownloads = require('./managedownloads');
var artistNames = getartists.getArtists();
var path = require('path');

var downloadImageOnTimer = function (url, filename, timer) {
    setTimeout(function () {
        downloadimages.downloadImage(url, filename, function () {
            console.log('downloaded to ' + filename);
        });
    }, timer);
}

var populateFolderWithImages = function (artist, folder) {
    photofetcher.findPhoto(artist, function (err, urls) {
        if (err === null) {
            for (var i = 0; i < urls.length; i++) {
                var url = urls[i];
                var filename = folder + '/' + artist + i + '.jpg';    
                filename = filename.replace(/[\?<>\\:\*\|":]/g, ''); // remove illegal chars
                filename = filename.replace(/ /g, '_');
                photofetcher.downloadImage(url, filename);
            }
        } else {
            console.error(err);
            throw err;
        }
    });
}

var createArtistFolder = function (root, artistName) {
    var dir = root + "/" +  artistName;
    managedownloads.mkArtistDirectory(dir, function (formattedDir) {
        populateFolderWithImages(artistName, formattedDir);
    });
};

var createArtistFolderTimeout = function (time, root, artistName) {
    setTimeout(function () {
        createArtistFolder(root, artistName);
    }, time);
};

var downloadFolder = path.resolve(__dirname, './download');
managedownloads.clearDownloads(downloadFolder, function (root) {
    for (var i = 0; i < artistNames.length; i++) {
        createArtistFolderTimeout(i * 1100, downloadFolder, artistNames[i]);
    }   
});