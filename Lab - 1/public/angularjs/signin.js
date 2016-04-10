var app = angular.module('signin', []);
app.controller('signin', function($scope,$http) {
	
	$scope.invalid_login = true;
	
	$scope.login = function(){
		$http({
			method : "POST",
			url : '/login',
			data : {
				"username":	$scope.username,
				"password" : $scope.password
			}
		
		}).success(function(data) {
			if(data.statusCode){
				
				window.location.assign("/homepage");
			}
			else{
				console.log("Failed Login");
				console.log("Before"+$scope.invalid_login);
				$scope.invalid_login = false;
				console.log("After"+$scope.invalid_login);
			}
		}).error(function(error) {
			alert("Error"); 
		});
	}
})