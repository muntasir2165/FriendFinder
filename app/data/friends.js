var mysql = require("mysql");

// create the connection information for the Heroku MySQL database
var connection = mysql.createConnection({
    host: "us-cdbr-iron-east-01.cleardb.net",
    port: 3306,
    database: "heroku_e526b06d5ea1b87",

    user: "b14a1c4db3e55a",
    password: "772892e6"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

var friendsArray = [];
function readUserData() {
  connection.query("SELECT * FROM userData", function(err, res) {
    if (err) throw err;
    res.forEach(function(row) {
    	friendsArray.push({"name": row["name"], "photo_url": row["photo_url"], scores: JSON.parse(row["scores"])});
    });
    connection.end();
    console.log(friendsArray);
  });
}
readUserData();

// Note how we export the array. This makes it accessible to other files using require.
module.exports = friendsArray;
