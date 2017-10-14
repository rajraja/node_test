var nodeTest = angular.module('nodeTest', []);

function mainController($scope, $http) {
	$scope.error = false;
	$http.get('/api/timezones')
		.success(function(data) {
			$scope.timezones = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	$scope.submit = function(){
		if(!$scope.timezone || !$scope.timeInMiliseconds){
			$scope.error = true;
			$scope.timeData = null;
		}
		else{
			$http.get('/api/parsetime',{params: { 'time':$scope.timeInMiliseconds, 'tz': $scope.timezone.tz }})
				.success(function(data) {

					if(data.time === "not_found"){
						$scope.error = true;
						$scope.timeData = null;
					}
					else{
						$scope.error = false;
						$scope.timeData = data;
					}

				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}

	};

}
