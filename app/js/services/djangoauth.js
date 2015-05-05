'use strict';

admin.service('djangoAuth', function djangoAuth($q, $http, ipCookie) {
	// AngularJS will instantiate a singleton by calling "new" on this function
	var service = {
		'authenticated': null,
		'request': function(args) {
			// Let's retrieve the toUpperCaseken from the cookie, if available
			if(ipCookie('token')){
				$http.defaults.headers.common.Authorization = 'Token ' + ipCookie('token');
			}
			// Continue
			params = args.params || {}
			args = args || {};
			var deferred = $q.defer(),
				url = this.API_URL + args.url,
				method = args.method || "GET",
				params = params,
				data = args.data || {};
			// Fire the request, as configured.
			$http({
				url: url,
				withCredentials: this.use_session,
				method: method.toUpperCase(),
				headers: {'X-CSRFToken': ipCookie('csrftoken')},
				params: params,
				data: data
			})
			.success(angular.bind(this,function(data, status, headers, config) {
				deferred.resolve(data, status);
			}))
			.error(angular.bind(this,function(data, status, headers, config) {
				console.log("error syncing with: " + url);
				// Set request status
				
				// ENABLE WHEN API IS READY
				// if(data){
				// 	data.status = status;
				// }
				if(status == 0){
					if(data == ""){
						data = {};
						data['status'] = 0;
						data['non_field_errors'] = ["Could not connect. Please try again."];
					}
					// or if the data is null, then there was a timeout.
					if(data == null){
						// Inject a non field error alerting the user
						// that there's been a timeout error.
						data = {};
						data['status'] = 0;
						data['non_field_errors'] = ["Server timed out. Please try again."];
					}
				}
				deferred.reject(data, status, headers, config);
			}));
			return deferred.promise;
		},
		'register': function(args){
			return this.request({
				'method': "POST",
				'url': "/register/",
				'data':args
			});
		},
		'login': function(args){
			var djangoAuth = this;
			return this.request({
				'method': "POST",
				'url': "/login/",
				'data':args
			}).then(function(data){
				console.log(data);
				// if(!djangoAuth.use_session){
				// 	$http.defaults.headers.common.Authorization = 'Token ' + data.key;
				// 	ipCookie('token',data.key, {expires: 4, expirationUnit: 'days'});
				// }
			});
		},
		'logout': function(){
			return this.request({
				'method': "GET",
				'url': "/logout/"
			}).then(function(data){
				delete $http.defaults.headers.common.Authorization;
				ipCookie.remove('token');
			});
		},
		'changePassword': function(password1,password2){
			return this.request({
				'method': "POST",
				'url': "/password/change/",
				'data':{
					'new_password1':password1,
					'new_password2':password2
				}
			});
		},
		'resetPassword': function(email){
			return this.request({
				'method': "POST",
				'url': "/password/reset/",
				'data':{
					'email':email
				}
			});
		},
		'profile': function(){
			return this.request({
				'method': "GET",
				'url': "/user/"
			}); 
		},
		'updateProfile': function(first_name,last_name,email){
			return this.request({
				'method': "POST",
				'url': "/user/",
				'data':{
					'user':{
						'first_name':first_name,
						'last_name':last_name,
						'email':email
					}
				}
			}); 
		},
		'verify': function(key){
			return this.request({
				'method': "GET",
				'url': "/verify-email/"+key+"/"
			});            
		},
		'confirmReset': function(code1,code2,password1,password2){
			return this.request({
				'method': "POST",
				'url': "/password/reset/confirm/"+code1+"/"+code2+"/",
				'data':{
					'new_password1':password1,
					'new_password2':password2
				}
			});
		},
		'initialize': function(url, sessions, model){
			this.API_URL = url;
			this.use_session = sessions;
			if(model){
				model.authenticated = null;
				if(this.authenticated == null){
					var djangoAuth = this;
					this.profile().then(function(){
						djangoAuth.authenticated = true;
						model.authenticated = true;
					},function(){
						djangoAuth.authenticated = false;
						model.authenticated = false;
					});
				}else{
					model.authenticated = this.authenticated;
				}
				model.setAuth = function(auth){
					model.authenticated = auth;
				}
			}
		}
	}
	return service;
});
