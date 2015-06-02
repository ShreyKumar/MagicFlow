'use strict';

angular.module('core').controller('PaymentController', ['$scope', '$http',
	function($scope, $http) {
		// Payment controller logic
		// ...
        Stripe.setPublishableKey('pk_test_Hge89pbbLzszQcMRpKIGXm9d');
        
        $scope.submitPayment = function(){
            console.log('payment reached');
            console.log($scope.number);
            var $form = document.getElementById('payment');
            var token = Stripe.card.createToken($form, function(status, response){
            console.log(response);
            $scope.payment.stripeToken = response.id;
            $http.post('stripe', $scope.payment).success(function(res){
                console.log(res);
            }).error(function(data, status, headers, config){
            });
        });
        }
	}
]);