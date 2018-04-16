angular
	.module('KMS')
	.factory('SvgUtils', ['$document', function ($document) {
		var svc = {};

		svc.ViewBox = function () { return "0 0 " + svc.Fond.Width + " " + svc.Fond.Height; }

		svc.Target = function (domId) {
			svc.svg = $document[0].getElementById(domId);
			svc.pt = svc.svg.createSVGPoint();
			return svc;
		}

		svc.PointAt = function (e) {
			svc.pt.x = e.clientX || e.originalEvent.pageX || e.originalEvent.clientX;
			svc.pt.y = e.clientY || e.originalEvent.pageY || e.originalEvent.clientY;
			return svc.pt.matrixTransform(svc.svg.getScreenCTM().inverse());
		}

		return svc;
	}])
	.factory('FB', ['$firebaseArray', '$firebaseObject', function ($firebaseArray, $firebaseObject) {
		var svc = {};
		svc.ref = firebase.database().ref('kms');
	
		svc.GetArray = function (kid) {
			var ref = svc.ref.child(kid);
			return $firebaseArray(ref);
		}
	
		svc.GetObject = function (kid) {
			var ref = svc.ref.child(kid);
			return $firebaseObject(ref);
		}
		return svc;
	}]);
