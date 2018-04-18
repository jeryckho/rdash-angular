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

		vm.Act = function(bx) {
			if (bx.act && bx.act.startsWith("@RAND(")) {
				vm.Temp[bx.ref] = vm.Temp[bx.ref] == null ? vm.ActRand(bx.act) : null;
			} else {
				vm.Change(bx.ref);
			}
		};

		vm.Change = function (ref) {
			var val = prompt("Modifier '" + ref + "'", vm.Sheet.Find(ref));
			if (val != null) {
				vm.Sheet.Set(ref, val);
			}
		}

		vm.Show = function(bx) {
			return (bx.act && bx.act.startsWith("@")) ? vm.Temp[bx.ref] : vm.Sheet.Find(bx.ref);
		};
	}]);