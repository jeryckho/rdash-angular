/**
 * Template Controller
 */

angular
	.module('KMS')
	.controller('TemplateCtrl', ['Template', '$stateParams', 'SvgUtils', '$uibModal', '$document', function (Template, $stateParams, SvgUtils, $uibModal, $document) {
		var vm = this;
		vm.Status = '';
		vm.Template = Template;
		vm.Template.GetClone($stateParams.Tpl)
			.then(function () {
				vm.Status = 'OK'
			}, function () {
				vm.Status = 'KO'
			});

		var Svg = SvgUtils.Target('Tpl');
		var From = { x: 0, y: 0 };

		vm.Clk = function (clickEvent) {
			var ptm = Svg.PointAt(clickEvent);

			if (From.x != 0 && From.y != 0) {
				From = { x: 0, y: 0 };
				if (vm.Template.Datas.Boxes) {
					vm.Template.Datas.Boxes.push(vm.RCT);
				} else {
					vm.Template.Datas.Boxes = [ vm.RCT ];
				}
			} else {
				From = { x: ptm.x, y: ptm.y };
			}
		};

		vm.Cancel = function () {
			From = { x: 0, y: 0 };
			vm.RCT = {};
		}

		vm.Mov = function (clickEvent) {
			var To = Svg.PointAt(clickEvent);

			if (From.x != 0 && From.y != 0) {
				vm.RCT = {
					x: Math.round(Math.min(From.x, To.x)),
					y: Math.round(Math.min(From.y, To.y)),
					w: Math.round(Math.abs(To.x - From.x)),
					h: Math.round(Math.abs(To.y - From.y)),
					ref: '',
					fer: 'middle',
					col: '#0000ff'
				};
			}
		};

		vm.Open = function (obj) {
			var org = angular.copy(obj);
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'templates/modal-template.html',
				controller: 'ModalInstanceCtrl',
				controllerAs: '$ctrl',
				size: 'sm',
				appendTo: $document.find('aside').eq(0),
				resolve: {
					item: function () {
						return obj;
					}
				}
			});
			modalInstance.result.then(function () {
			}, function (reason) {
				if (reason === 'delete') {
					angular.copy({todel:1}, obj);
					for(var i = vm.Template.Datas.Boxes.length - 1; i >= 0; i--) {
						if(vm.Template.Datas.Boxes[i].todel === 1) {
							vm.Template.Datas.Boxes.splice(i, 1);
						}
					}
				} else if (reason === 'clone') {
					var lcl =  angular.copy(obj);
					vm.Template.Datas.Boxes.push(lcl);
					angular.copy(org, obj);
				} else {
					angular.copy(org, obj);
				}
			});
		}

	}]);
