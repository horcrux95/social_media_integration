var User       = require('../app/models/user');

module.exports = function(app, passport) {


	app.get('/alluser',function(req,res){
		console.log("allusers here");
		User.find({'email':'sharang.2795@gmail.com'},function(err,users){
			res.json(users);
		})
	})
// =============================================================================
// AUTHENTICATE (Next LOGIN) ==================================================
// =============================================================================
/*

*/
	app.post("/giglogin",function(req,res){
		console.log(req.body);
		res.json({"meaasage":"success"});
	})

	app.post("/gglogin",function(req,res){

		var email =  req.body.email;
		console.log(email);
		User.findOne({'email':email},function(err,user){
			console.log(user);
			if(user){
				
					user.google.id = req.body.id;
					user.google.img= req.body.img;
					user.google.email = req.body.email;
					user.google.token = req.body.token;
					user.save(function(err){
						if(err) throw err;
						else{
							console.log("update found user and returned");
						}
					})
					res.json(user);
				
			}else{
			
				res.json({"message":"signup"});
			}
		})

	})

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================	
		app.post("/login", passport.authenticate('local-login'), function(req, res) {
			res.json(req.user);
		});

	// SIGNUP =================================
		// process the signup form
		app.post('/signup', passport.authenticate('local-signup'),function(req, res) {
			res.json(req.user);
			}	
		);
		
	// LOGOUT ==============================
		app.post('/logout', function(req, res) {
			req.logout();
			res.send(200);
		});

	// route middleware to ensure user is logged in
		function isLoggedIn(req, res, next) 
		{
			if (req.isAuthenticated())
			return next();

			res.redirect('/');
		}

}