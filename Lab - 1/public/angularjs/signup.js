//loading the 'login' angularJS module
var app = angular.module('users', []);

//Defininf the menu controller

app.controller('signUpController', function($scope, $http){

	$scope.hideSignUp1 = false;
	$scope.hideSignUp2 = true;
	$scope.hideSignUp3 = true;
	$scope.duplicateUsername = true;
	//$scope.blankUsername=true;
	
	$scope.doSignUp = function(){
		
		$scope.hideSignUp1 = true;
		$scope.hideSignUp2 = false;
	}
	


	$scope.doRegisterPhone = function(){

		$scope.hideSignUp2 = true;
		$scope.hideSignUp3 = false;
	}

	$scope.doRegisterUsername = function() {
		
		console.log("doRegisterName");

		$http({
			method : "POST",
			url : '/addProfile',
			data : {
				"full_name" : $scope.fullName,
				"email" : $scope.emailId,
				"password" : $scope.password,
				"city" : $scope.city,
				"phone_no" : $scope.phoneNo,
				"username" : $scope.username

			}

		}).success(function(data) {
			console.log("duplicate"+data.status);
				if(data.status == "duplicate"){console.log(data.status);
					
					console.log("Duplicate");
					$scope.duplicateUsername = false;
				}
		}).error(function(error) {
			alert("Error"); 
		});
}
});
