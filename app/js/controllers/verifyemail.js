'use strict';

admin.controller('VerifyemailCtrl', function ($scope, $routeParams, djangoAuth) {
	djangoAuth.verify($routeParams["emailVerificationToken"]).then(function(data){
		$scope.success = data.success;
	},function(data){
		$scope.failure = data.errors;
	});
});
