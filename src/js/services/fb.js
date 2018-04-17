angular
	.module('KMS')
	.factory('FB', ['$firebaseArray', '$firebaseObject', '$firebaseAuth', function ($firebaseArray, $firebaseObject, $firebaseAuth) {
		var svc = {};
		svc.ref = firebase.database().ref('kms');
		svc.auth = $firebaseAuth();
		svc.user = null;
	
		svc.auth.$onAuthStateChanged(function(user) {
			svc.user = user;
		});

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
