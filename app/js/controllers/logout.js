'use strict';

admin.controller('LogoutCtrl', function ($scope, $location, djangoAuth) {
	djangoAuth.logout();
	$scope.setAuth(false);
});