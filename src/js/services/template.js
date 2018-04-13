angular
    .module('KMS')
	.factory('Template', ['$http', '$q', function ($http, $q) {
		var svc = {
			"Fond": {
				"Src": "",
				"Width": 0,
				"Height": 0
			},
			"Boxes": []
		};
		var org = angular.copy(svc);

		svc.ViewBox = function () { return "0 0 " + svc.Fond.Width + " " + svc.Fond.Height; }

		svc.Get = function (id) {
			return $q(function (resolve, reject) {
				$http.get('data/' + id + '.json').success(function (data) {
					angular.extend(svc, data);
					resolve(svc);
				}).error(function () {
					angular.extend(svc, org);
					reject(svc);
				});
			});
		}

		return svc;
	}]);    