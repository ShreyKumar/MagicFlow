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
		clientID: process.env.GOOGLE_ID || '1091191449450-ms86cc0kl6j2ka40tlff83uvofkdr0f1.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'l5l__LylJ6fQCrsm_D2H8xWh',
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
    instagram: {
        clientID: process.env.INSTAGRAM_ID || '9dc21292970945f58b50e31be0a5dbf6',
        clientSecret: process.env.INSTAGRAM_SECRET || '8666cee816484c6ca4482c996fda3c66',
        callbackURL: '/auth/instagram/callback'
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
