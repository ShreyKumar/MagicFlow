'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
    var stripe = require('stripe')(
        "sk_test_1DrnLqtt68AyW1u1H3U0Phgn"
    );
	app.route('/').get(core.index);
};