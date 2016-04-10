var app = angular.module('home', []);

app.controller('homeController', function($scope, $http){

	$scope.logout = function(){
	$http({
			method : "POST",
			url : '/logout'			
		}).success(function(data) {
			if(data.status){
				console.log('logout');
				window.location.assign('/');
			}
		}).error(function(error) {
			console.log("Error");
		});	
}

$scope.getCurentUser = function(){
	console.log("getCurrentUser");
	$http({
			method : "POST",
			url : '/currentUser'
			
		}).success(function(data) {
			$scope.user_id = data.currUserId;
		}).error(function(error) {
			console.log("Error");
		});	
}
$scope.getCurentUser();

});


app.controller('tweetController', function($scope, $http,$interval){
	$scope.textRow = 1;
	$scope.tweetList = [];
	$scope.hideButton = true;
	var fetchTweetsFlag = $interval(function(){$scope.loadTweet();}, 5000);

	$scope.showTextArea = function(){

		$scope.textRow = 3;
		$scope.hideButton = false;
		
	}
	$interval(function(){$scope.loadTweet}, 5000);
	$scope.hideTextArea = function(){
		if($scope.textRow ==""){
		$scope.textRow = 1;
		$scope.hideButton = true;
		}
	}

	$scope.delete = function(tweet){
		console.log("inside delete tweet");
		$http({
			method : "POST",
			url : '/deleteTweet',
			data : {
				"tweet":tweet
			}
				
		}).success(function(data) {
			loadTweet();
		}).error(function(error) {
			alert("Error"); 
		});
	}
	
	$scope.loadTweet = function(){
		$http({
			method : "POST",
			url : '/loadTweet'
				
		}).success(function(data) {
			$scope.tweetList = data.res;
		}).error(function(error) {
			alert("Error"); 
		});
		
	}
	$scope.loadTweet();
	
	$scope.tweetData = function(){
		console.log('addTweet');
				$http({
			method : "POST",
			url : '/addTweet',
			data : {
				"tweet":$scope.tweet
			}
		
		}).success(function(data) {
			if(data.status == 200){
			$scope.tweet = "";
			$scope.loadTweet();
		}
		}).error(function(error) {
			alert("Error"); 
		});
	}

	$scope.tweetDetails = function(){
		
	}

	$scope.setRetweetContent = function(tweetContent){
			$interval.cancel(loadTweet);
			$scope.retweet = tweetContent;
			
	}
	
	$scope.sendRetweet = function(retweet){

		$http({
			method : "POST",
			url : '/addRetweet',
			data : {
				"retweet":$scope.retweet,
				"retweetComment" : $scope.retwtBoxContent
			}
	}).success(function(data) {
			if(data.successcode){
			fetchTweetsFlag = $interval(function(){$scope.fetchNewTweets();}, 5000);
			
		}
		}).error(function(error) {
			alert("Error"); 
		});

}
});


app.controller('followController', function($scope, $http){
	$scope.followList = [];

	$scope.whotofollow = function(){
		//alert("who to follow");
		$http({
			method : "POST",
			url : '/follow',
		
		}).success(function(data) {

			$scope.followList = data.follow;
			
		}).error(function(error) {
			alert("Error"); 
		});
	}
	$scope.whotofollow();

	$scope.unfollowUser = function(){
		var code = false;
		
		$http({
			method : "POST",
			url : '/unfollow',
			data : {
				"follow" : follow.user_id
			}
		
		}).success(function(data) {
			code = data.succescode;
			
			if(code){
				
				follow.showButton = true;
			}
			
		}).error(function(error) {
			alert("Error"); 
		});
	}

	
	$scope.followUser = function(follow){

		var code = false;
		console.log("inside follow");
		$http({
			method : "POST",
			url : '/following',
			data : {
				"follow" : follow.user_id
			}
		
		}).success(function(data) {
			code = data.succescode;
			
			if(code){
				
				follow.showButton = false;
				console.log("Done");
				$timeout(function() {$scope.whotofollow}, 3000);
				
			}
			
		}).error(function(error) {
			alert("Error"); 
		});
	}
	
	
});


app.controller('profileController', function($scope, $http){
	$scope.fullname ="";
	$scope.username="";
	$scope.getDetails = function(){	
		$http({
			method : "POST",
			url : '/profileDetails'
		
		}).success(function(data) {
			
			console.log("Before"+$scope.followingCount);
			$scope.username = data.username;
			$scope.fullname = data.fullname;
			$scope.followCount = data.follower;
			$scope.followingCount = data.following;
			$scope.user_id = data.user_ID
			console.log("After"+$scope.followingCount);

		}).error(function(error) {
			alert("Error"); 
		});
	}
	$scope.getDetails();
	
});	
