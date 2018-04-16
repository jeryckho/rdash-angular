angular
	.module('KMS')
	.factory('Template', ['$http', '$q', 'FB', function ($http, $q, FB) {
		var svc = {
			Datas: {
				"Fond": {
					"Src": "",
					"Width": 0,
					"Height": 0
				},
				"Boxes": []	
			}
		};
		var org = angular.copy(svc.Datas);

		svc.ViewBox = function () { return "0 0 " + svc.Datas.Fond.Width + " " + svc.Datas.Fond.Height; }

		svc.GetCopy = function (id) {
			return $q(function (resolve, reject) {
				var datas = FB.GetObject('templates/' + id);
				datas.$loaded().then(function () {
					angular.copy(datas, svc.Datas);
					delete svc.Datas["$$conf"];
					delete svc.Datas["$id"];
					delete svc.Datas["$value"];
					delete svc.Datas["$priority"];
					delete svc.Datas["$resolved"];
					if (!svc.Datas.Fond) {
						svc.Datas.Fond = {
							"Src": "",
							"Width": 0,
							"Height": 0
						};
					}
					resolve(svc);
				})
			});
		}

		svc.SetCopy = function(id) {
			var data = FB.GetObject('templates/'+id);
			angular.copy( svc.Datas, data);
			data.$save();
		}

		svc.Get = function (id) {
			return $q(function (resolve, reject) {
				$http.get('data/' + id + '.json').success(function (data) {
					angular.extend(svc.Datas, data);
					resolve(svc);
				}).error(function () {
					angular.extend(svc.Datas, org);
					reject(svc);
				});
			});
		}

		return svc;
	}]);