 'use strict';

/**
*   Module dependencies 
*/
var passport = require('passport'),
	url = require('url'),
	InstagramStrategy = require('passport-instagram').Strategy,
	config = require('../config'),
	users = require('../../app/controllers/users.server.controller');

module.exports = function(){
    passport.use(new InstagramStrategy({
        clientID: config.instagram.clientID,
        clientSecret: config.instagram.clientSecret,
        callbackURL: config.instagram.callbackURL,
        passReqToCallback: true
    }, function(req, accessToken, refreshToken, profile, done) {
			// Set the provider data and include tokens
			var providerData = profile._json;
            console.log("Access token " + profile);
			providerData.accessToken = accessToken;
			providerData.refreshToken = refreshToken;

			// Create the user OAuth profile
			var providerUserProfile = {
				providerData: providerData
			};

			// Save the user OAuth profile
			users.saveOAuthUserProfile(req, providerUserProfile, done);
		}
	));
};