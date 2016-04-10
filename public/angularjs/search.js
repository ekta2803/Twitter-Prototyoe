var app = angular.module('search', []);

    
app.controller('searchController',function($scope,$http) {

	$scope.searchKey = function(){
		var word = $scope.searchBox;
		if(word.indexOf('#') >-1){
		$http({
			method : "GET",
			url : '/search',
			data : {
				"keyword" : word
			}	
		}).success(function(data) {
				$scope.followingList = data.results;
		}).error(function(error) {
			console.log("Error");
		});
		}
		
	}
});
