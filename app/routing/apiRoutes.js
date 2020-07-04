var friends = require("../data/friends");

module.exports = function(app){
  //GET route to display to get friendlist
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

  
  var user = req.body;

  // for scores  
  for(var i = 0; i < user.scores.length; i++) {
    user.scores[i] = parseInt(user.scores[i]);
  }

  // diff. in scores
  var bestFriendIndex = 0;
  var minimumDifference = 40;

    // diff. add to the total 
    for(var i = 0; i < friends.length; i++) {
    var totalDifference = 0;
    for(var j = 0; j < friends[i].scores.length; j++) {
      var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
      totalDifference += difference;
    }
    if(totalDifference < minimumDifference) {
      bestFriendIndex = i;
      minimumDifference = totalDifference;
    }
  }

  // push match
  friends.push(user);

  res.json(friends[bestFriendIndex]);
  });
};