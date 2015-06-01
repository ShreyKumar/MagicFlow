'use strict';

//var users = require('public/users');
angular.module('core').controller('HomeController', ['$rootScope', '$scope', '$http', 'Authentication',
	function($rootScope, $scope, $http, Authentication) {
        var loc = window.location.href
        console.log("Current location: " + loc);
        if (loc.indexOf("#") == -1){
            window.location.pathname = "/#!/";
        }
        
        //initialise scope vars
        $scope.next = '';
        $scope.friendz = '';
        
		// This provides Authentication context.
		$scope.authentication = Authentication;
        $scope.authentication.provider = 'Facebook timeline';
        console.log($scope.authentication);
        
        if($scope.authentication.user.provider === 'facebook'){
            // Load the SDK Asynchronously
            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                    js = d.createElement(s); js.id = id;
                    js.src = '//connect.facebook.net/en_US/sdk.js';
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));

            //connect to facebook
            window.fbAsyncInit = function() {

                /* Post function*/
                $scope.post = function(){
                    console.log('post has been clicked');
                    FB.api('/me/feed', 'post', {message: $scope.user.input}, function(){
                        console.log('Your content has been posted!');
                        alert('Posted to your timeline!');
                    });
                };

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
                    console.log('Permission has been granted');
                    //grab friends
                    /* make the API call */
                    FB.api('/me/taggable_friends/', function(response){
                        $scope.allfriends = [];
                        
                        $scope.friendz = response;
                        console.log($scope.friendz);
                        
                        
                        for(var i = 0; i < $scope.friendz.data.length; i++){
                            console.log($scope.friendz.data[i].name);
                            $scope.allfriends.push($scope.friendz.data[i].name);
                        }
                        
                        console.log($scope.allfriends);
                        
                        $scope.next = response.paging.next;
                        $scope.prev = response.paging.previous;
                        $rootScope.$apply();
                        console.log($scope.next);
                        
                        $scope.previousfriends = function(){
                            console.log($scope.prev);
                            if($scope.prev !== undefined){
                                $http.get($scope.prev).success(function(data, status, headers, config){$scope.allfriends = [];
                                    $scope.allfriends = [];
                                    for(var i = 0; i < data.data.length; i++){
                                        $scope.allfriends.push(data.data[i].name);
                                    }
                                    $scope.next = data.paging.next;
                                    $scope.prev = data.paging.previous;
                                });
                            } else {
                                alert('You can\'t go back');   
                            }
                            
                        };
                        
                        $scope.nextfriends = function(){
                            if($scope.next !== undefined){
                                $http.get($scope.next).success(function(data, status, headers, config) {
                                    $scope.allfriends = [];
                                    for(var i = 0; i < data.data.length; i++){
                                        $scope.allfriends.push(data.data[i].name);
                                    }
                                    $scope.next = data.paging.next;
                                    $scope.prev = data.paging.previous;
                                });
                            } else {
                                alert('You don\'t have any more friends...LOL');
                            }
                        };
                    });
                    
                }, {scope: 'publish_actions, user_friends'});
            
            //grab the ID
            console.log($scope.authentication.user.providerData.id);
            
            
        };
            
        //outside asynchronous data
            
        } else if($scope.authentication.user.provider === 'twitter'){
            //set provider on screen
            $scope.authentication.provider = 'Twitter feed';
            console.log('connected to twitter');
        } else if($scope.authentication.user.provider === 'google'){
            console.log('connected to google+');
            $scope.user = {input : ""};
            //window.accesstoken = $scope.authentication.providerData.accessToken;
            console.log($scope.authentication);
            $scope.authentication.provider = 'Google+ wall';
            /** Google+ API **/
            //ask for authorization
            console.log(gapi.auth);
            gapi.auth.authorize({
                client_id : '1091191449450-ms86cc0kl6j2ka40tlff83uvofkdr0f1.apps.googleusercontent.com',
                immediate : false,
                scope : ['https://www.googleapis.com/auth/plus.me','https://www.googleapis.com/auth/plus.circles.read', 'https://www.googleapis.com/auth/plus.stream.write', 'https://www.googleapis.com/auth/plus.media.upload']
                
            }, function(response){
                var options = {
                    contenturl: 'https://plus.google.com/pages/',
                    contentdeeplinkid: '/pages',
                    clientid: '1091191449450-ms86cc0kl6j2ka40tlff83uvofkdr0f1.apps.googleusercontent.com',
                    cookiepolicy: 'single_host_origin',
                    prefilltext: '',
                    calltoactionlabel: 'CREATE',
                    calltoactionurl: 'http://plus.google.com/pages/create',
                    calltoactiondeeplinkid: '/pages/create',
                    callback: function(resp){
                        console.log(resp);   
                    }
                };
                $scope.post = function(){
                    //$scope.inp = $scope.user.input;
                    options.prefilltext = $scope.user.input;
                    $rootScope.$apply();
                }
                options.prefilltext = "";
                // Call the render method when appropriate within your app to display
                // the button.
                gapi.interactivepost.render('sharePost', options);
                /* Post to stream */
                /*
                gapi.client.request( "https://plus.google.com/115960927098866056811/", "POST",
                    body: {
                        description: 'Hello World!'
                    }
                }).execute(function(e) {
                    console.log("did it.", e);
                });
                
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://www.googleapis.com/plus/v1/activities?query=Google%2B');
                var msg = "Hello world!";
                xhr.send(msg);
                
                */
                
                /* Load connections */
                gapi.client.load('plus','v1', function(){
                    var request = gapi.client.plus.people.list({
                        'userId': 'me',
                        'collection': 'visible'
                    });
                    request.execute(function(resp) {
                        console.log(resp);
                        var total = [];
                        for(var i = 0; i < resp.items.length; i++){
                            total.push(resp.items[i].displayName);
                        }
                        console.log(total);
                        $scope.allfriends = total;
                        console.log($scope.allfriends);
                        $rootScope.$apply();
                    });
                });
            });
            /*
            gapi.auth.signIn({
                'client' : 'google-signin',
                'data-clientid' : '1091191449450-q99l3jp72o79v5nk15hvigglmdb4j6ab.apps.googleusercontent.com',
                'data-cookiepolicy' : 'single_host_origin',
                'data-accesstype' : 'online',
                'data-approvalprompt' : 'auto',
                'data-callback' : 'function(authResult){
                   console.log(authResult);
                }',
                'data-requestvisibleactions' : 'http://schema.org/AddAction, http://schema.org/BuyAction, http://schema.org/CheckInAction, http://schema.org/CommentAction'
            });
            */
            
        } else if($scope.authentication.user.provider === 'linkedin'){
            $scope.authentication.provider = 'Linkedin profile';
            console.log('connected to linkedin');
            
            
        } else {
            $scope.authentication.provider = 'None';
            console.log('Connected to other social media');
            var feed = new Instafeed({
                get: 'tagged',
                tagName: 'awesome',
                clientId: '9dc21292970945f58b50e31be0a5dbf6'
            });
            feed.run();
        }
        }]);