/**
 * @author Aldi Mustafri
 * @email aldimustafri@live.com
 * @create date 2020-07-14 14:44:56
 * @modify date 2020-07-14 14:44:56
 * @desc [description]
 */

var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "fullstack_thing",
});

connection.connect(function (err) {
	if (err) throw err;
});

module.exports = connection;
