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
		friends.insertNewUserData(req.body.name, req.body.photo_url, JSON.stringify(req.body.scores));
		res.json(true);
	});
};
