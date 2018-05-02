angular
	.module('KMS')
	.factory('FB', ['$firebaseArray', '$firebaseObject', '$firebaseAuth', function ($firebaseArray, $firebaseObject, $firebaseAuth) {
		var svc = {};
		svc.ref = firebase.database().ref('kms');
		svc.auth = $firebaseAuth();
		svc.user = null;
		svc.admin = false;
		svc.init = true;
	
		svc.auth.$onAuthStateChanged(function(user) {
			if (user !== null) {
				svc.GetObject("users/" + user.uid)
					.$loaded()
					.then(function(res) {
						svc.admin = res.admin ? res.admin : false;
						svc.user = user;
						svc.init = false;
					},function(res) {
						svc.admin = false;
						svc.user = null;
						svc.init = false;
					});
			} else {
				svc.admin = false;
				svc.user = null;
				svc.init = false;
			}
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
