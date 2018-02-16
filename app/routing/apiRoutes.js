var path = require("path");
var friends = require("../data/friends.js");

module.exports = function(app) {
	//show all the friend data at api/friends
	app.get("/api/friends", function(req,res){
		res.json(friends);
	}),

	app.post("/api/friends", function(req,res){
		//handle incoming survey results
		//handle compatibility logic
		console.log("apis");
		console.log(req.body);
		console.log(req.headers);
		//return results from here
		res.send(req.body);
	})
	
}