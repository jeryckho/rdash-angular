/**
 * Modal Instance Controller
 */

angular
	.module('KMS')
	.controller('ModalInstanceCtrl', ['$uibModalInstance', 'item', function ($uibModalInstance, item) {
		var $ctrl = this;
		$ctrl.item = item;

		$ctrl.ok = function () {
			$uibModalInstance.close();
		};

		$ctrl.clone = function () {
			$uibModalInstance.dismiss('clone');
		};

		$ctrl.delete = function () {
			$uibModalInstance.dismiss('delete');
		};

		$ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}]);
