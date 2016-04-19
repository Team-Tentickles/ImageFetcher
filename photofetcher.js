var Discogs = require('disconnect').Client;
var dis = new Discogs({userToken: 'xQSstXxQtGrcxUDRGSHJYjshQcuqYgbsBQlMKagH'});
var db = dis.database();

var findPhoto = function(data, callback){
	db.search(data, {'type': 'artist'}, function(err, data){
		db.getArtist(data.results[0].id, function(err, data2) {
		   if(err){
                console.error("failed to find photo");
			    console.log(err);
                // callback(err, "");
			}
			else{
                console.log(data2.images);
				// callback(null, data2.images[0].resource_url);
			}
		}); 
	});
};

module.exports.findPhoto = findPhoto;