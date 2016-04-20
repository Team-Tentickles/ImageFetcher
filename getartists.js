var artists = require('artist-data');

var getArtists = function () {
    var artistNames = [];
    var decade = artists.decade;
    for (var i = 0; i < decade.length; i++) {
        var decadeArtists = decade[i].artistsArray;
        for (var j = 0; j < decadeArtists.length; j++) {
            var artist = decadeArtists[j];
            artistNames.push(artist.name);
        }
    }
    return artistNames;
}

module.exports.getArtists = getArtists;