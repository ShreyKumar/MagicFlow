'use strict';

angular.module('core').controller('PaymentController', ['$scope',
	function($scope) {
		// Payment controller logic
		// ...
        Stripe.setPublishableKey('pk_test_Hge89pbbLzszQcMRpKIGXm9d');
        
        $scope.submitPayment = function(){
            console.log($scope.number);
            var $form = document.getElementById('payment');
            var token = Stripe.card.createToken($form, function(status, response){
            console.log(response);
        });
        }
	}
]);