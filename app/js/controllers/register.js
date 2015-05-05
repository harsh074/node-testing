'use strict';

admin.controller('RegisterCtrl', function ($scope, djangoAuth, Validate) {
	$scope.model = {'email':'','password':'','firstName':'','lastName':''};
	$scope.complete = false;
	$scope.register = function(formData){
		$scope.errors = [];
		Validate.form_validation(formData,$scope.errors);
		if(!formData.$invalid){
			djangoAuth.register($scope.model)
			.then(function(data){
				// success case
				$scope.complete = true;
			},function(data){
				// error case
				$scope.errors = data.user;
			});
		}
	}
});
