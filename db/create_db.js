module.exports = function(db) {
	db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='account_user'",
	function(err, rows) {
		if(err !== null) {
			console.log(err);
		}
		else if(rows === undefined) {
			db.run('CREATE TABLE account_user' +
						 '("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,' +
						 '"email" VARCHAR(255) NOT NULL, ' +
						 '"password" VARCHAR(128) NOT NULL,' +
						 '"salts" VARCHAR(255),' +
						 '"first_name" VARCHAR(255),' +
						 '"last_name" VARCHAR(255))', function(err) {
				if(err !== null) {
					console.log(err);
				}
				else {
					console.log("SQL Table initialized.");
				}
			});
		}
		else {
			console.log("SQL Table already initialized.");
		}
	});
};