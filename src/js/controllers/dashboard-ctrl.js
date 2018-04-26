/**
 * Dashboard Controller
 */

angular
	.module("KMS")
	.controller("DashboardCtrl", ['$rootScope', '$state', 'FB', function ($rootScope, $state, FB) {
		// DECLARATIONS
		var vm = this;
		vm.X = $rootScope;
		vm.models = [];
		vm.chars = [];
		vm.lding = false;

		vm.menuOptions = [
			{
				text: 'Editer',
				click: function ($itemScope, $event, modelValue, text, $li) {
					if (typeof $itemScope.modl !== "undefined") {
						$state.go("template", { Tpl: $itemScope.modl });
					} else if (typeof $itemScope.char !== "undefined") {
						$state.go("char", { Sht: $itemScope.char });
					}
				},
				displayed: function ($itemScope, $event, modelValue, text, $li) {
					if (typeof $itemScope.modl !== "undefined") {
						return vm.WTempOk($itemScope.modl);
					} else if (typeof $itemScope.char !== "undefined") {
						return vm.RSheetOK($itemScope.char);
					}
					return false;
				},
				hasBottomDivider: function ($itemScope, $event, modelValue, text, $li) {
					return true;
				}
			},
			{
				text: 'Sélectionner',
				click: function ($itemScope, $event, modelValue, text, $li) {
					if (typeof $itemScope.modl !== "undefined") {
						vm.X.selMod = $itemScope.modl;
					} else if (typeof $itemScope.char !== "undefined") {
						vm.X.selChar = $itemScope.char;
					}
				},
				displayed: function ($itemScope, $event, modelValue, text, $li) {
					return true;
				}
			},
			{
				text: 'Renommer',
				click: function ($itemScope, $event, modelValue, text, $li) {
					console.log($itemScope.modl);
				},
				displayed: function ($itemScope, $event, modelValue, text, $li) {
					if (typeof $itemScope.modl !== "undefined") {
						return vm.WTempOk($itemScope.modl);
					} else if (typeof $itemScope.char !== "undefined") {
						return vm.RSheetOK($itemScope.char);
					}
					return false;
				}
			},
			{
				text: 'Supprimer',
				click: function ($itemScope, $event, modelValue, text, $li) {
					console.log($itemScope.modl);
				},
				displayed: function ($itemScope, $event, modelValue, text, $li) {
					if (typeof $itemScope.modl !== "undefined") {
						return vm.WTempOk($itemScope.modl);
					} else if (typeof $itemScope.char !== "undefined") {
						return vm.RSheetOK($itemScope.char);
					}
					return false;
				}
			}
		];

		vm.initCtrl = function() {
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
		}

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
				console.log("User cancelled the prompt.");
			} else if (typeof vm.gene.templates[nMod] === "undefined") {
				vm.gene.templates[nMod] = FB.user.uid;
				vm.gene.$save();
				vm.models.push(nMod);
			}
		};
		vm.newChar = function() {
			var nChar = prompt("Entrez le nom", "");
			if (nChar == null || nChar == "") {
				console.log("User cancelled the prompt.");
			} else if (typeof vm.gene.sheets[nChar] === "undefined") {
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

		// INITIALISATION
		vm.initCtrl();

}]);
