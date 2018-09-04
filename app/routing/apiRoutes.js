// var friendsData = require("../data/friends");
var friends = require("../data/friends-sync");

module.exports = function(app) {
	app.get("/api/friends", function(req, res) {
		res.json(friends.getFriendsData());
	});

	app.post("/api/friends", function(req, res) {
		// console.log(req);
		// console.log(req.body.name, req.body.photo_url, req.body.scores);
		// var scores = req.body.scores.map(function(score) {
		// 	return parseInt(score);
		// });
		// // console.log(scores); => [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ]
		// // console.log(req.body.scores); => [ '2', '2', '2', '2', '2', '2', '2', '2', '2', '2' ]
		// // console.log(JSON.stringify(req.body.scores)); => ["2","2","2","2","2","2","2","2","2","2"]		
		var scores = req.body.scores.map(function(score) {
			return parseInt(score);
		});
		var friendsArray = friends.getFriendsData();
		var closestMatch = {"name": "", "photo_url": "", "matchValue": Number.MAX_SAFE_INTEGER};
		friendsArray.forEach(function(friend){
			var friendScores = friend.scores;
			var matchValue = 0;
			for (var i=0; i < scores.length; i++) {
				matchValue += Math.abs(scores[i] - friendScores[i]);
			}
			if (matchValue < closestMatch.matchValue) {
				closestMatch.name = friend.name;
				closestMatch.photo_url = friend.photo_url;
			}
		});

		// insert the new user's data into the database
		friends.insertNewUserData(req.body.name, req.body.photo_url, JSON.stringify(req.body.scores));
		
		res.json({"name": closestMatch.name, "photo_url": closestMatch.photo_url});
		// res.json({"name": "Jack", "photo_url": "http://getdrawings.com/img/silhouette-avatar-12.png"});
	});
};
