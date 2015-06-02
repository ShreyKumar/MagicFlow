'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
    var stripe = require('stripe')(
        "sk_test_1DrnLqtt68AyW1u1H3U0Phgn"
    );
    
    /*

    */
    app.route('/stripe').post(function(req, res){
        console.log("THIS IS THE REQUEST");
        var stripeToken = req.body.stripeToken;
    
        var charge = stripe.charges.create({
            amount: 1000, // amount in cents, again
            currency: "cad",
            source: stripeToken,
            description: "Example charge"
        }, function(err, charge) {
            console.log(err);
        });
    });
    /*
    app.post('stripe', function(req, res){
        console.log(req);
    });
    */
    
	app.route('/').get(core.index);
};