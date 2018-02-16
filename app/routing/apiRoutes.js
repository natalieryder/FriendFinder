var path = require("path");
var friends = require("../data/friends.js");
var fs = require("fs");

module.exports = function(app) {
	//show all the friend data at api/friends
	app.get("/api/friends", function(req,res){
		res.json(friends);
	}),

	app.post("/api/friends", function(req,res){
		// destructure the object
		let { name, photo, scores } = req.body
		//handle incoming survey results

		//get the data from friends.js
		console.log(scores);

		// for each friend, compare the numbers

		// fake number higher than possible outcomes
		var last = 50;
		var closestMatch;

		for (i = 0; i < friends.length; i++) {
			var friendScore = friends[i].scores;
			var totalDifference = 0;

			for (j = 0; j < scores.length; j++) {
				var difference = Math.abs(friendScore[j] - scores[j])
				totalDifference += difference;
			}

			if (totalDifference < last || last === undefined) {
				// total possible difference - difference / total possible difference
				console.log(scores.length);
				var percentMatch = 100 *(((scores.length * 4) - totalDifference) / (scores.length * 4))
		
				closestMatch = [i,percentMatch];
			};
			last = totalDifference;
		}
		console.log(friends[closestMatch[0]]);
		console.log(closestMatch[1]);
		//handle compatibility logic

		//return results from here
	
		var obj = {
			name: "name",
			photo :"photo"
		}
		res.send(friends[closestMatch[0]]);
		friends.push(req.body);
		console.log("friends");
		console.log(friends);

		// rewrite the js file? this is terrible, should use json file and append
		var newFriendsFile = 'var friends = ' + JSON.stringify(friends) +
		'; \n module.exports = friends;';

		// rewrite the friends.js file
		fs.writeFile(__dirname + '/../data/friends.js', newFriendsFile, (err) => {
		  if (err) throw err;
		});
		
	})
	
}