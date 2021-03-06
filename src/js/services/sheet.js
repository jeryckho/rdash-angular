angular
	.module('KMS')
	.factory('Sheet', ['$http', '$q', 'Template', 'FB', function ($http, $q, Template, FB) {
		var svc = {
			Template: {},
			Datas: {}
		};

		svc.ViewBox = function () { return "0 0 " + svc.Template.Fond.Width + " " + svc.Template.Fond.Height; }

		svc.GetSheet = function (id) {
			return $q(function (resolve, reject) {
				var datas = FB.GetObject('sheets/' + id);
				datas.$loaded().then(function () {
					svc.Datas = datas;
					resolve(svc);
				})
			});
		}

		svc.GetCloneSheet = function (id) {
			return $q(function (resolve, reject) {
				var datas = FB.GetObject('sheets/' + id);
				datas.$loaded().then(function () {
					angular.copy(datas, svc.Datas);
					delete svc.Datas["$$conf"];
					delete svc.Datas["$id"];
					delete svc.Datas["$value"];
					delete svc.Datas["$priority"];
					delete svc.Datas["$resolved"];
					resolve(svc);
				})
			});
		}

		svc.SetCloneSheet = function(id) {
			var data = FB.GetObject('sheets/'+id);
			angular.copy( svc.Datas, data);
			data.$save()
		}

		svc.Get = function (tpl, sht) {
			return Template.GetClone(tpl)
				.then(function(SvcTpl){
					return svc.GetSheet(sht)
						.then(function(SvcSht){
							svc.Template = SvcTpl.Datas;
						});
				});
		}

		svc.GetClone = function (tpl, sht) {
			return Template.GetClone(tpl)
				.then(function(SvcTpl){
					return svc.GetCloneSheet(sht)
						.then(function(SvcSht){
							svc.Template = SvcTpl.Datas;
						});
				});  
		}

		svc.Find = function (ref) {
			var reducedA = ref.split('.').reduce(function (obj, i) {
				if (obj != undefined) {
					return obj[i];
				}
			}, svc.Datas);
			return reducedA;
		}

		svc.Set = function (ref, val) {
			var List = ref.split('.');
			var obj = svc.Datas;
			for (var idx = 0, len = List.length; idx < len - 1; idx++) {
				if (obj[List[idx]] == undefined) {
					obj[List[idx]] = (List[idx + 1] == parseInt(List[idx + 1], 10)) ? [] : {};
				}
				obj = obj[List[idx]];
			}
			obj[List[List.length - 1]] = val;
			svc.Datas.$save();
		}

		svc.X = function (bx) {
			switch (bx.fer) {
				case 'start':
					return bx.x;
				case 'end':
					return bx.x + bx.w;
				default:
					return bx.x + bx.w / 2;
			}
		}

		return svc;
	}]);
