'use strict';

//var users = require('public/users');
angular.module('core').controller('HomeController', ['$rootScope', '$scope', 'Authentication',
	function($rootScope, $scope, Authentication) {
        //initialise scope vars
        $scope.next = "";
        $scope.friendz = "";
        
		// This provides Authentication context.
		$scope.authentication = Authentication;
        $scope.authentication.provider = "Facebook timeline";
        console.log($scope.authentication);
        
        if($scope.authentication.user.provider == 'facebook'){
            // Load the SDK Asynchronously
            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));

            //connect to facebook
            window.fbAsyncInit = function() {

                /* Post function*/
                $scope.post = function(){
                    console.log('post has been clicked');
                    FB.api('/me/feed', 'post', {message: $scope.user.input}, function(){
                        console.log("Your content has been posted!");
                        alert("Posted to your timeline!");
                    });
                }

                FB.init({
                    appId      : 1445358595760933, // App ID
                    status     : true,    // check login status
                    cookie     : true,    // enable cookies to allow the
                    // server to access the session
                    xfbml      : true,     // parse page for xfbml or html5
                    // social plugins like login button below
                    version    : 'v2.0',  // Specify an API version
                });
                
                FB.login(function(){
                    console.log("Permission has been granted");
                    //grab friends
                    /* make the API call */
                    console.log(user.input);
                        FB.api("/me/taggable_friends", function(response){
                            console.log(response);
                            $scope.friendz = response.data;
                            console.log($scope.friendz);
                            console.log(response.paging.next);
                            $scope.next = response.paging.next;
                            console.log($scope.next);
                            $rootScope.$apply();
                        });
                }, {scope: 'publish_actions, user_friends'});
            
            //grab the ID
            console.log($scope.authentication.user.providerData.id);
            
            
        };
            
        } else if($scope.authentication.user.provider == 'twitter'){
            //set provider on screen
            $scope.authentication.provider = "Twitter feed";
            console.log("connected to twitter");
        } else if($scope.authentication.user.provider == 'linkedin'){
            $scope.authentication.provider = "Linkedin profile";
            console.log("connected to linkedin");   
        } else {
            $scope.authentication.provider = "None";
            console.log("Connected to other social media");
        }
        }]);