'use strict';

module.exports = {
	app: {
		title: 'TestApp',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
			],
			js: [
                'https://js.stripe.com/v2/',
                'https://apis.google.com/js/client:platform.js?onload=startApp',
                'public/lib/instafeed.js/instafeed.min.js',
                /*
                'public/lib/google-plus-extension-jsapi/jsapi/jsapi_helper.js',
                'public/lib/google-plus-extension-jsapi/jsapi/jsapi_for_google_plus.js',
                'public/lib/google-plus-extension-jsapi/jsapi/jsapi_abstract_database.js',
                'public/lib/google-plus-extension-jsapi/jsapi/jsapi_database.js',
                'public/lib/google-plus-extension-jsapi/settings.js',
                'public/lib/google-plus-extension-jsapi/content_script_api_bridge.js',
                'public/lib/google-plus-extension-jsapi/background_controller.js',
                */
                '//platform.linkedin.com/in.js',
                'https://apis.google.com/js/client:platform.js',
                'https://apis.google.com/js/platform.js',
                'https://apis.google.com/js/platform.js?onload=onLoadCallback',
                'http://code.jquery.com/jquery-2.1.4.min.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};