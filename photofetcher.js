var Discogs = require('disconnect').Client;
var dis = new Discogs({userToken: 'xQSstXxQtGrcxUDRGSHJYjshQcuqYgbsBQlMKagH'});
var db = dis.database();
var fs = require('fs');

var findPhoto = function(initdata, callback){
	db.search(initdata, {'type': 'artist'}, function(err, data){
        if (err === null) {
            db.getArtist(data.results[0].id, function(err, data2) {
                if (err) {
                        console.error("failed to find photo");
                        console.log(err);
                        // callback(err, "");
                }
                else {
                    // console.log(data2.images);
                    var urls = [];
                    if (data2.hasOwnProperty('images')) {
                        for (var i = 0; i < data2.images.length; i++) {
                            urls.push(data2.images[i].resource_url);
                        }
                    }
                    callback(null, urls);
                }
            });  
        } else {
            console.error(err);
            throw err;
        }
	});
};

var downloadImage = function(url, filename) {
    db.getImage(url, function (err, data, rateLimit) {
        if (err === null) {
            fs.writeFile(filename, data, 'binary', function () {
                console.log('image saved as ' + filename);
            });
        }
    });
};

module.exports.findPhoto = findPhoto;
module.exports.downloadImage = downloadImage;