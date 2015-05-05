'use strict';


admin.controller('LoginCtrl', function ($scope, djangoAuth, Validate) {
	$scope.model = {'email':'','password':''};
	$scope.complete = false;
	$scope.login = function(formData){
		$scope.errors = [];
		Validate.form_validation(formData,$scope.errors);
		if(!formData.$invalid){
			djangoAuth.login($scope.model)
			.then(function(data){
				// success case
				$scope.complete = true;
				$scope.setAuth(true);
			},function(data){
				// error case
				$scope.error = data.error;
			});
		}
	}
});
