var app = angular.module('profile',[]);

app.controller("profileDetailsController",function($scope,$http,fullname,username,user_id,city,dob,joinedon){

$scope.fullname = fullname;
$scope.username = username;
$scope.user_id = user_id;
$scope.city = city;
$scope.dob = dob;
$scope.joinedon = joinedon;
$scope.showSearch = true;
$scope.hideCoverPicDiv=false;
$scope.hideNavDiv=false;
$scope.mainDiv=false;
$scope.hideEditbtn=false;
$scope.hideCity = false;
$scope.searchKey = function(){
		var word = $scope.searchBox;
		console.log("-->#"+word);
		
			console.log('Hash');
		$http({
			method : "POST",
			url : '/search',
			data : {
				"keyword" : word
			}	
		}).success(function(data) {
			console.log("load");
			$scope.searchList = data.results;
			$scope.showSearch = false;
			$scope.hideCoverPicDiv=true;
			$scope.hideNavDiv=true;
			$scope.mainDiv=true;
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
			if(!city){
				
				$scope.hideCity = true;
			}
			if(!dob){
				$scope.hideDob = true;
			}
			$scope.currUserName = data.currUsername;
			$scope.currUserId = data.currUserId;
			console.log("---->>>>>"+$scope.currUserId);
			if($scope.user_id != $scope.currUserId){
				console.log("Hide edit button");
				$scope.hideEditbtn=true;
			}
		}).error(function(error) {
			console.log("Error");
		});	
}
$scope.getCurentUser();

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
});

app.controller("tweetControllerProfile",function($scope,$http,user_id,username,fullname){
	console.log("reached in function");
$scope.username = username;
$scope.fullname = fullname;
$scope.user_id = user_id;

$scope.getTweets = function(){
	console.log("--->"+$scope.user_id);
	$http({
			method : "POST",
			url : '/loadTweetProfile',
			data : {
				"user_id" : $scope.user_id
			}	
		}).success(function(data) {
			console.log(data.successcode)
			if(data.successcode)
			{

			$scope.tweetList = data.tweets;

			}
		}).error(function(error) {
			console.log("Error");
		});
};


$scope.getTweets();
});


app.controller("followController",function($scope,$http,user_id){
$scope.user_id = user_id;
$scope.whotofollow = function(){
		//alert("who to follow");
		console.log("Who to follow");
		$http({
			method : "POST",
			url : '/follow',
			data : {
				"user_id" : $scope.user_id 
			}
		
		}).success(function(data) {
			console.log("***"+data.follow.length);
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
				
				$timeout(function() {$scope.whotofollow}, 3000);
				
			}
			
		}).error(function(error) {
			alert("Error"); 
		});
	}
});


app.controller("updateProfileController",function($scope,$http,username,user_id){

	$scope.profileDetails = function(){
	$scope.username = username;
	$http({
			method : "POST",
			url : '/getProfile',
			data : {
				"username" : username
			}
		
		}).success(function(data) {
			code = data.succescode;
			
			if(code){
				console.log("@@@"+data.city);
				//$scope.userDetails.city = data.city;

				$scope.emailid = data.email;
				$scope.phoneno = data.phone
				$scope.dobshow = data.dob;

				
			}
			
		}).error(function(error) {
			alert("Error"); 
		});
}
$scope.profileDetails();

$scope.saveProfileChanges = function(){
	$scope.user_id = user_id;
	$scope.username = username;
	$http({
			method : "POST",
			url : '/updateProfile',
			data : {
				"user_id" : $scope.user_id,
				"username" : $scope.username,
				"city" : $scope.city,
				"dob" : $scope.dob,
				"phone" : $scope.phoneno
			}	
		}).success(function(data) {
			console.log(data.successcode)
			if(data.successcode)
				$scope.tweetList = data.tweets;
		}).error(function(error) {
			console.log("Error");
		});
}
});

app.controller("followerControllers",function($scope,$http,username,user_id){
$scope.user_id = user_id;

$scope.getFollowers = function(){
		$http({
			method : "POST",
			url : '/getFollowers',
			data : {
				"user_id" : $scope.user_id
			}	
		}).success(function(data) {
			console.log("getFollowers"+data.results.length);
				$scope.followerList = data.results;
		}).error(function(error) {
			console.log("Error");
		});

}
$scope.getFollowers();

});	

app.controller("followingControllers",function($scope,$http,username,user_id){
$scope.user_id = user_id;
$scope.hideFollowing = false;
$scope.getFollowing = function(){
		$http({
			method : "POST",
			url : '/getFollowing',
			data : {
				"user_id" : $scope.user_id
			}	
		}).success(function(data) {
			console.log("getFollowing"+data.results.length);
				$scope.followingList = data.results;
		}).error(function(error) {
			console.log("Error");
		});

}
$scope.getFollowing();

$scope.hideBtns = function(btn) {
	console.log("Hide Btn status"+btn.hideFollowing);
	btn.hideFollowing = true;
	$scope.followingList = btn;
};


});	
