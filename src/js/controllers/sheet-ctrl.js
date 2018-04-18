/**
 * Sheet Controller
 */

angular
	.module('KMS')
	.controller('SheetCtrl', ['Sheet', '$stateParams', function (Sheet, $stateParams ) {
		var vm = this;

		vm.Status = '';
		vm.Temp = {};
		vm.Sheet = Sheet;
		vm.Sheet.Get($stateParams.Tpl, $stateParams.Sht)
			.then(function () {
				vm.Status = 'OK'
			}, function () {
				vm.Status = 'KO'
			});
		
		vm.Rand = function(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};

		vm.ActRand = function(str) {
			var re = /^@RAND\((\d+),(\d+)\)$/;
			var res = re.exec(str);
			if (res !== null) {
				return vm.Rand(res[1], res[2]);
			} else {
				return null;
			}
		};

		vm.Act = function(ref, idx) {
			if (ref.startsWith("@RAND(")) {
				vm.Temp[idx] = vm.Temp[idx] == null ? vm.ActRand(ref) : null;
			} else if (ref.startsWith("@")) {
			} else {
				vm.Change(ref);
			}
		};

		vm.Change = function (ref) {
			var val = prompt("Modifier '" + ref + "'", vm.Sheet.Find(ref));
			if (val != null) {
				vm.Sheet.Set(ref, val);
			}
		}

		vm.Show = function(ref, idx) {
			if (ref.startsWith("@")) {
				return vm.Temp[idx];
			} else {
				return vm.Sheet.Find(ref);
			}
		};
	}]);