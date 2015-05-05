'use strict';

admin.controller('MasterCtrl', function ($scope, djangoAuth) {
	djangoAuth.initialize('', false, $scope);
});