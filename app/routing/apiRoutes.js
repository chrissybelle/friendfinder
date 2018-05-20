var friends = require("../data/friends");

module.exports = function(app) {

//when user visits this path, display friends data
app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

//when user submits survey answers, send data to server
app.post("/api/friends", function(req, res) {
    var user1 = [];
    friends.push(req.body);
    console.log(req.body);
    console.log("friend pushed to table");
    //store user's inputs in array
    for (var h=0; h<10; h++) {
        user1.push(parseInt(req.body.answers[h]));
    };
    var compatibility = [];
        for (var i=0; i<friends.length-1; i++) {
            var difference = [];
            var matchName;
            var matchPhoto;
            var match;
            var totalScore = 0;
            var user2 = friends[i].answers;
            console.log("User1 answers: " + user1);
            console.log(friends[i].name + " answers: " + user2);
            //calculate difference between user's inputs and each of the other people in the database; store the difference from each question in a new array
                for (var j=0;j<10;j++) {
                    difference.push(Math.abs(parseInt(user1[j]) - parseInt(user2[j])));
                };
                console.log("Difference: " + difference);
                //add up total difference across all questions and store in totalScore
                for (var k=0; k<10; k++) {
                    totalScore += difference[k];
                };
                compatibility.push(totalScore);
            console.log("Total score: " + totalScore);
        };
        console.log("Compatibility: " + compatibility);
        console.log(Math.min(...compatibility));
        //find user with the lowest total difference and store in "match" object
        for (var l=0; l<compatibility.length; l++) {
            if (compatibility[l] === Math.min(...compatibility)) {
                matchName = friends[l].name;
                matchPhoto = friends[l].photo;
                match = friends[l]
            };
        };
        console.log("Your match is: " + matchName, matchPhoto);
    //send "match" object back to client for display in modal
    return res.send(match);
    });

};