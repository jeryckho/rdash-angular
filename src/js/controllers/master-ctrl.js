/**
 * Master Controller
 */

angular.module('KMS')
	.controller('MasterCtrl', ['$scope', '$cookieStore', 'FB', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, FB) {
	/**
	 * Sidebar Toggle & Cookie Control
	 */
	var mobileView = 992;
	$scope.login = false;

	$scope.getWidth = function() {
		return window.innerWidth;
	};

	$scope.$watch($scope.getWidth, function(newValue, oldValue) {
		if (newValue >= mobileView) {
			if (angular.isDefined($cookieStore.get('toggle'))) {
				$scope.toggle = ! $cookieStore.get('toggle') ? false : true;
			} else {
				$scope.toggle = true;
			}
		} else {
			$scope.toggle = false;
		}

	});

	$scope.toggleSidebar = function() {
		$scope.toggle = !$scope.toggle;
		$cookieStore.put('toggle', $scope.toggle);
	};

	window.onresize = function() {
		$scope.$apply();
	};

	$scope.users = FB.GetObject('users');
}