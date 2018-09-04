// require the dependencies
var express = require("express");
var bodyParser = require("body-parser");

// express server and associated configuration setup
var app = express();
var PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// point our server to a series of "route" files to respond to user requests from various URLs
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//start our server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
