'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');
var Linkedin = require('node-linkedin')('77dg27hlx5rica', 'ZRckyDX7UaQek3Ln', 'http://localhost:3000/auth/linkedin/callback');
//var linkedin = Linkedin.init(sessionStorage.getItem("accesstoken"));

module.exports = function(app) {
    
    //oauth linkedin
    app.get('/oauth/linkedin', function(req, res){
        Linkedin.auth.authorize(res, ['r_basicprofile', 'r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo', 'rw_nus', 'rw_groups', 'w_messages']);   
    });
    
    app.get('/oauth/linkedin/callback', function(req, res) {
        Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {
            if ( err )
                return console.error(err);

            /**
             * Results have something like:
             * {"expires_in":5184000,"access_token":". . . ."}
             */

            console.log(results);
            return res.redirect('/');
        });
    });
    
	// User Routes
	var users = require('../../app/controllers/users.server.controller');

	// Setting up the users profile api
	app.route('/users/me').get(users.me);
	app.route('/users').put(users.update);
	app.route('/users/accounts').delete(users.removeOAuthProvider);

	// Setting up the users password api
	app.route('/users/password').post(users.changePassword);
	app.route('/auth/forgot').post(users.forgot);
	app.route('/auth/reset/:token').get(users.validateResetToken);
	app.route('/auth/reset/:token').post(users.reset);

	// Setting up the users authentication api
	app.route('/auth/signup').post(users.signup);
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);

	// Setting the facebook oauth routes
	app.route('/auth/facebook').get(passport.authenticate('facebook', {
		scope: ['email']
	}), function(){
        /* use jQuery to get user node */
        
        console.log('authentication successful');   
    });
	app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));

	// Setting the twitter oauth routes
	app.route('/auth/twitter').get(passport.authenticate('twitter'));
	app.route('/auth/twitter/callback').get(users.oauthCallback('twitter'));

	// Setting the google oauth routes
	app.route('/auth/google').get(passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}));
	app.route('/auth/google/callback').get(users.oauthCallback('google'));

	// Setting the linkedin oauth routes
	app.route('/auth/linkedin').get(passport.authenticate('linkedin', { scope: ['r_basicprofile','r_emailaddress', 'w_share', 'r_network']}));
	app.route('/auth/linkedin/callback').get(users.oauthCallback('linkedin'));
    
    // Setting the instagram oauth routes
    app.route('/auth/instagram').get(passport.authenticate('instagram'));
    
app.route('/auth/instagram/callback').get(users.oauthCallback('instagram'));

	// Setting the github oauth routes
	app.route('/auth/github').get(passport.authenticate('github'));
	app.route('/auth/github/callback').get(users.oauthCallback('github'));

	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};