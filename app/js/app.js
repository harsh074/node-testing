'use strict';

var admin = angular.module('AuthApp', ['ipCookie','ngResource','ngSanitize','ui.router']);

admin.config(function ($stateProvider, $urlRouterProvider, $locationProvider){
	$locationProvider.hashPrefix('!');
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home', {
			url:'/',
			templateUrl: '/views/main.html',
			controller: 'MainCtrl'
		})
		.state('register', {
			url:'/register',
			templateUrl: 'views/register.html',
		})
		.state('passwordReset', {
			url:'/passwordReset',
			templateUrl: 'views/passwordreset.html',
		})
		.state('passwordResetConfirm', {
			url:'/passwordResetConfirm/:firstToken/:passwordResetToken',
			templateUrl: 'views/passwordresetconfirm.html',
		})
		.state('login', {
			url:'/login',
			templateUrl: 'views/login.html',
		})
		.state('verifyEmail', {
			url:'/verifyEmail/:emailVerificationToken',
			templateUrl: 'views/verifyemail.html',
		})
		.state('logout', {
			url:'/logout',
			templateUrl: 'views/logout.html',
		})
		.state('userProfile', {
			url:'/userProfile',
			templateUrl: 'views/userprofile.html',
		})
		.state('passwordChange', {
			url:'/passwordChange',
			templateUrl: 'views/passwordchange.html',
		});
});