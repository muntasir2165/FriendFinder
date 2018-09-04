// require the path package to get the correct file path for our public html files
var path = require("path");

module.exports = function(app) {
    app.get("/home", function(req, res) {
        // console.log("__dirname: " + __dirname); => __dirname: /Users/houst/Desktop/UofT-SCS-Bootcamp/homeworks/homework-11/FriendFinder/app/routing
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    // If no matching route is found default to home
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
};
