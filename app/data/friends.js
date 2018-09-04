var MySql = require("sync-mysql");

// create the connection object to connect to the Heroku MySQL database
var connection = new MySql({
    host: "us-cdbr-iron-east-01.cleardb.net",
    port: 3306,
    database: "heroku_e526b06d5ea1b87",
    user: "b14a1c4db3e55a",
    password: "772892e6"
});

module.exports = {
    getFriendsData: function() {
        var friendsDataArray = [];
        var friendsData = connection.query("SELECT * FROM userData");
        if (friendsData.length === 0) {
            console.log("ERROR: Invalid query!");
        } else {
                friendsData.forEach(function(row) {
                    // console.log(row);    
                    friendsDataArray.push({"name": row["name"], "photo_url": row["photo_url"], scores: JSON.parse(row["scores"])});
                });
        console.log(friendsDataArray);
        return friendsDataArray;
        }
    },
    insertNewUserData: function(name, photo_url, scores) {
        var result = connection.query("INSERT INTO userData (name, photo_url, scores) VALUES (?, ?, ?)",
        [name, photo_url, scores]);
        if (result.changedRows === 1) {
            console.log("You have added a new user with id " + result.insertId + " to the userData table in the Heroku MySQL database.");
        } 
    }
};
