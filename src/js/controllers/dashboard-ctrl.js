/**
 * Dashboard Controller
 */

angular
	.module("KMS")
	.controller("DashboardCtrl", ['$rootScope', 'FB', function ($rootScope, FB) {
		var vm = this;
		vm.X = $rootScope;
		vm.models = [];
		vm.chars = [];
		vm.lding = true;
		FB.GetObject('gene').$loaded()
			.then(function(res){
				vm.gene = res;
				vm.models = Object.keys(res.templates);
				vm.chars = Object.keys(res.sheets);
				vm.lding = false;
			},function(res){
				vm.gene = res;
				vm.models = [];
				vm.chars = [];
				vm.lding = false;
			});

		vm.getEmail = function() {
			return (FB.user && FB.user.email) ? FB.user.email : "?";
		}

		vm.RSheetOK = function(item) {
			return FB.admin || (vm.gene.sheets[item] === FB.user.uid);
		}

		vm.WTempOk = function(item) {
			return FB.admin || (vm.gene.templates[item] === FB.user.uid);
		}

		vm.newMod = function() {
			var nMod = prompt("Entrez le nom", "");
			if (nMod == null || nMod == "") {
				alert("User cancelled the prompt.");
			} else {
				vm.gene.templates[nMod] = FB.user.uid;
				vm.gene.$save();
				vm.models.push(nMod);
			}
		};
		vm.newChar = function() {
			var nChar = prompt("Entrez le nom", "");
			if (nChar == null || nChar == "") {
				alert("User cancelled the prompt.");
			} else {
				vm.gene.sheets[nChar] = FB.user.uid;
				vm.gene.$save();
				vm.chars.push(nChar);
			}
		};

		vm.closeAlert = function (index) {
			vm.unchanged = true;
		};

		vm.Logout = function() {
			vm.X.selMod = null;
			vm.X.selChar = null;
			vm.X.searchMod = null;
			vm.X.searchChar = null;
			FB.auth.$signOut();
		}
}]);
