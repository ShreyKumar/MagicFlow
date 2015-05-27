'use strict';

module.exports = {
	db: 'mongodb://localhost/testapp-dev',
	app: {
		title: 'TestApp - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '1445358595760933',
		clientSecret: process.env.FACEBOOK_SECRET || '6dcb1de4c8e47b554ddb796861afe5b3',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'RBQKXNDANNxORoNptCWiKRcS2',
		clientSecret: process.env.TWITTER_SECRET || 'auGy1E6NYde6JEXliUQoMktVKGq1Nkj56lr8MRuQIowZxB5k4e',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '1091191449450-q99l3jp72o79v5nk15hvigglmdb4j6ab.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'p345jz8kYX4POE-vfVr_iGqx',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || '77dg27hlx5rica',
		clientSecret: process.env.LINKEDIN_SECRET || 'ZRckyDX7UaQek3Ln',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
