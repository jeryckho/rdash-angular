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
    FB.GetObject('gene')
      .$loaded()
      .then(function(res){
        vm.models = Object.keys(res.templates);
        vm.chars = Object.keys(res.sheets);
      });

    vm.closeAlert = function (index) {
      vm.unchanged = true;
    };
}]);
