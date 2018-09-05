// more info to connect to the Heroku MySQL database can be found at:
// https://stackoverflow.com/questions/18408012/connection-to-mysql-from-nodejs-on-heroku-server

var mysql = require("mysql");

// create the connection object to connect to the Heroku MySQL database
var connection = mysql.createConnection({
    host: "us-cdbr-iron-east-01.cleardb.net",
    port: 3306,
    database: "heroku_e526b06d5ea1b87",
    user: "b14a1c4db3e55a",
    password: "772892e6"
});

// create the userData table and populate it with a row of mock data
connection.query("DROP TABLE IF EXISTS userData", function (err) {
    if (err) throw err;
    connection.query("CREATE TABLE userData ("
        + "id INT NOT NULL AUTO_INCREMENT,"
        + "name VARCHAR(100) NOT NULL,"
        + "photo_url VARCHAR(65535) NOT NULL,"
        + "scores VARCHAR(100) NOT NULL,"
        + "PRIMARY KEY (id)"
        + ")", function (err) {
            if (err) throw err;
            // seed the userData table in the Heroku MySQL database with a row of sample data
            connection.query("INSERT INTO userData (name, photo_url, scores)"
                + "VALUES"
                + "(\"Tom Anderson\", \"https://a3-images.myspacecdn.com/images03/1/240e42b5d9ce48a78983961e7fcb3c39/600x600.jpg\", \"[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]\"),"
                + "(\"Tony Stark\", \"https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/paramount-35065-Full-Image_GalleryBackground-en-US-1483994508505._RI_SX940_.jpg\", \"[2, 3, 4, 4, 1, 3, 5, 2, 3, 4]\"),"
                + "(\"Prince of Persia\", \"http://www.superheroes.ru/i/p/HTMMS127_00.jpg\", \"[3, 4, 2, 3, 4, 2, 3, 4, 5, 2]\"),"
                + "(\"Deez Nuts\", \"https://i.ytimg.com/vi/5LlQNty_C8s/hqdefault.jpg\", \"[3, 3, 4, 5, 3, 4, 5, 3, 4, 3]\"),"
                + "(\"Jack Bauer\", \"https://i1.wp.com/www.geekcrusade.com/wp-content/uploads/2013/10/Kiefer-Sutherland-plays-Jack-Bauer-in-24-e1450168553971.jpg\", \"[3, 4, 5, 4, 3, 4, 5, 3, 3, 4]\")", function (err) {
                    if (err) throw err;
                    console.log("The userData table has been created in the Heroku MySQL database and seeded with a row of sample data.");
                    connection.end();
                    process.exit(0);
            });
    });
});
