/**
 * Character Controller
 */

angular
	.module('KMS')
	.controller('CharacterCtrl', ['Sheet', '$stateParams', '$scope', function (Sheet, $stateParams, $scope) {
		var vm = this;

		vm.Status = '';
		vm.Sheet = Sheet;
		vm.unchanged = true;

		var container = document.getElementById("jsoneditor");
		var options = {
			onChange: function () {
				$scope.$apply(function () {
					vm.unchanged = false;
				});
			}
		};
		var editor = new JSONEditor(container, options);

		vm.Sheet.GetCloneSheet($stateParams.Sht)
			.then(function () {
				vm.Status = 'OK'
				editor.set(vm.Sheet.Datas);
				editor.expandAll();
			}, function () {
				vm.Status = 'KO'
			});

		vm.closeAlert = function (index) {
			vm.unchanged = true;
		};

		vm.Save = function () {
			vm.Sheet.Datas = editor.get();
			vm.Sheet.SetCloneSheet($stateParams.Sht);
			vm.unchanged = true;
		}

		$scope.$on('$stateChangeStart', function (event) {
			if ((!vm.unchanged) && (!confirm("Certaines données ne seront pas sauvées.\nContinuez quand-même ?"))) {
				event.preventDefault()
			}
			else {
				return
			}
		});
	}]);