module.exports = function(app,db,passport,bcrypt) {

	function hashPassword(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	}

	app.get('*', function(req, res) {
		res.send('Bad Routes');
	});

	app.get('/', function(req, res) {
		res.render('index'); // load the single view file (angular will handle the page changes on the front-end)
	});

	app.get('/user', function(req,res){
		// sqlRequest = "SELECT * FROM account_user"
		console.log(req,"harsh");
		// if(req.cookies.token){
		// 	// console.log(req.cookies)
		// }
		// else{
		// 	res.end();
		// }
	});
	
	app.post('/register', function(req, res) {
		var email			=	req.body.email;
		var password	=	req.body.password;
		var firstName	=	req.body.firstName;
		var lastName	= req.body.lastName;
		var salts = hashPassword(password);
		console.log(email,password,firstName,lastName, salts); 
		sqlRequest = "INSERT INTO 'account_user' (email, password, salts, first_name, last_name) " +
								 "VALUES('" + email + "', '" + password + "', '" + salts + "', '" + firstName + "', '" + lastName + "')"
		db.run(sqlRequest, function(err) {
			if(err !== null) {
				console.log(err);
			}
			else {
				console.log(this.lastID);
			}
		});
	});

	app.post('/login', passport.authenticate('local'), function(req, res) {
			console.log(req.body);
			// If this function gets called, authentication was successful.
			// `req.user` contains the authenticated user.
			res.cookie('token', 'authlogin', { path: '/', expires: new Date(Date.now() + 900000), httpOnly: true });
			res.redirect('/user/');
	});
};