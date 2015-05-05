'use strict';

admin.controller('MainCtrl', function ($scope, ipCookie, $location, djangoAuth) {	
	$scope.login = function(){
		djangoAuth.login(prompt('Username'),prompt('password'))
		.then(function(data){
			$scope.setAuth(true);
			handleSuccess(data);
		},handleError);
	}
	
	$scope.logout = function(){
		djangoAuth.logout()
		.then(handleSuccess,handleError);
		$scope.setAuth(false);
	}
	
	$scope.resetPassword = function(){
		djangoAuth.resetPassword(prompt('Email'))
		.then(handleSuccess,handleError);
	}
	
	$scope.register = function(){
		djangoAuth.register(prompt('Username'),prompt('Password'),prompt('Email'))
		.then(handleSuccess,handleError);
	}
	
	$scope.verify = function(){
		djangoAuth.verify(prompt("Please enter verification code"))
		.then(handleSuccess,handleError);
	}
	
	$scope.goVerify = function(){
		$location.path("/verifyEmail/"+prompt("Please enter verification code"));
	}
	
	$scope.changePassword = function(){
		djangoAuth.changePassword(prompt("Password"), prompt("Repeat Password"))
		.then(handleSuccess,handleError);
	}
	
	$scope.profile = function(){
		djangoAuth.profile()
		.then(handleSuccess,handleError);
	}
	
	$scope.updateProfile = function(){
		djangoAuth.updateProfile(prompt("First Name"), prompt("Last Name"), prompt("Email"))
		.then(handleSuccess,handleError);
	}
	
	$scope.confirmReset = function(){
		djangoAuth.confirmReset(prompt("Code 1"), prompt("Code 2"), prompt("Password"), prompt("Repeat Password"))
		.then(handleSuccess,handleError);
	}

	$scope.goConfirmReset = function(){
		$location.path("/passwordResetConfirm/"+prompt("Code 1")+"/"+prompt("Code 2"))
	}
	
	var handleSuccess = function(data){
		$scope.response = data;
	}
	
	var handleError = function(data){
		$scope.response = data;
	}
});
