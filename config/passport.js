module.exports = function(passport,db,bcrypt) {

	var LocalStrategy   = require('passport-local').Strategy;
	function comparePassword(password, salts) {
		return bcrypt.compareSync(password, salts);	
	}
	passport.use('local', new LocalStrategy({
		usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
	},
		function(req, email, password, done) {
		// console.log(req.body,email, password);
		db.get('SELECT salts FROM account_user WHERE email = ?', email, function(err, row) {
			if (!row) return done(null, false);
			var hash = comparePassword(password, row.salts);
			console.log(hash);
			if(hash){
				db.get('SELECT * FROM account_user WHERE email = ?', email, function(err, row) {
					if (!row) return done(null, false);
					return done(null, row);
				});
			}
			else{
				return done(null, false);
			}
		});
	}));

	passport.serializeUser(function(user, done) {
		return done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		db.get('SELECT id, email FROM account_user WHERE id = ?', id, function(err, row) {
			if (!row) return done(null, false);
			return done(null, row);
		});
	});

};