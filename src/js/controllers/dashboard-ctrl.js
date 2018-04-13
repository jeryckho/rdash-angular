/**
 * Dashboard Controller
 */

angular
  .module("KMS")
  .controller("DashboardCtrl", ['$rootScope', function ($rootScope) {
    var vm = this;
    vm.X = $rootScope;

    vm.models = [
      { name: "NR", modele: "NR" },
      { name: "SW", modele: "TSA-SW" },
      { name: "NA", modele: "TSA-NA" }
    ];

    vm.chars = [
      { name: "Jigano", modName: 'NR', modele: "NR" },
      { name: "Seal", modName: 'SW', modele: "TSA-SW" },
      { name: "Sam", modName: 'NA', modele: "TSA-NA" },
    ];

    vm.closeAlert = function (index) {
      vm.unchanged = true;
    };
}]);
