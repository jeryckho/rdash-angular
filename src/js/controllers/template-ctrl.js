/**
 * Template Controller
 */

angular
	.module('KMS')
	.controller('TemplateCtrl', ['Template', '$stateParams', 'SvgUtils', '$uibModal', '$document', function (Template, $stateParams, SvgUtils, $uibModal, $document) {
		var vm = this;
		vm.Status = "";
		vm.State = "OK";
		vm.Cursor = "pointer";
		vm.Template = Template;
		vm.Template.GetClone($stateParams.Tpl)
			.then(function () {
				vm.Status = 'OK'
			}, function () {
				vm.Status = 'KO'
			});

		var Svg = SvgUtils.Target("Tpl");
		var SelFrom = { x: 0, y: 0, ox: 0, oy: 0 };

		vm.ChangeCursor = function(bx, $ev) {
			var ptm = Svg.PointAt($ev);

			if (vm.State === "Moving") {
				vm.State = "OK";
				SelFrom = { x: 0, y: 0, ox: 0, oy: 0 };
				vm.Cursor = "pointer";
				vm.RCT = {};
			} else if (vm.State === "OK") {
				vm.State = "Moving";
				SelFrom = { x: ptm.x, y: ptm.y, ox: bx.x, oy: bx.y };
				vm.Cursor = "move";
				vm.RCT = bx;
			}
			$ev.stopPropagation();
		};

		vm.Clk = function($ev) {
			var ptm = Svg.PointAt($ev);

			if (vm.State === "Selecting") {
				vm.State = "OK";
				SelFrom = { x: 0, y: 0, ox: 0, oy: 0 };
				if (vm.Template.Datas.Boxes) {
					vm.Template.Datas.Boxes.push(vm.RCT);
				} else {
					vm.Template.Datas.Boxes = [vm.RCT];
				}
			} else if (vm.State === "OK") {
				vm.State = "Selecting";
				SelFrom = { x: ptm.x, y: ptm.y, ox: 0, oy: 0 };
			}
			$ev.stopPropagation();
		};

		vm.Mov = function(movEvent) {
			var To = Svg.PointAt(movEvent);

			if (vm.State === "Moving") {
				vm.RCT.x = Math.round(To.x + (SelFrom.ox - SelFrom.x));
				vm.RCT.y = Math.round(To.y + (SelFrom.oy - SelFrom.y));
			} else if (vm.State === "Selecting") {
				vm.RCT = {
					x: Math.round(Math.min(SelFrom.x, To.x)),
					y: Math.round(Math.min(SelFrom.y, To.y)),
					w: Math.round(Math.abs(To.x - SelFrom.x)),
					h: Math.round(Math.abs(To.y - SelFrom.y)),
					ref: "",
					fer: "middle",
					col: "#0000ff",
					act: ""
				};
			}
		};

		vm.Open = function(obj) {
			var org = angular.copy(obj);
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: "modal-title",
				ariaDescribedBy: "modal-body",
				templateUrl: "templates/modal-template.html",
				controller: "ModalInstanceCtrl",
				controllerAs: "$ctrl",
				size: "sm",
				appendTo: $document.find("aside").eq(0),
				resolve: {
					item: function() {
						return obj;
					}
				}
			});
			modalInstance.result
				.then(function () {
				}, function (reason) {
					if (reason === 'delete') {
						angular.copy({todel:1}, obj);
						for(var i = vm.Template.Datas.Boxes.length - 1; i >= 0; i--) {
							if(vm.Template.Datas.Boxes[i].todel === 1) {
								vm.Template.Datas.Boxes.splice(i, 1);
							}
						}
					} else if (reason === "clone") {
						var lcl = angular.copy(obj);
						vm.Template.Datas.Boxes.push(lcl);
						angular.copy(org, obj);
					} else {
						angular.copy(org, obj);
					}
				});
		}

	}]);
