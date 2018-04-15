/**
 * Sheet Controller
 */

angular
    .module('KMS')
    .controller('SheetCtrl', ['Sheet', '$stateParams', function (Sheet, $stateParams ) {
        var vm = this;

        vm.Status = '';
        vm.Sheet = Sheet;
        vm.Sheet.GetCopy($stateParams.Tpl, $stateParams.Sht)
            .then(function () {
                vm.Status = 'OK'
            }, function () {
                vm.Status = 'KO'
            });

        vm.Change = function (ref) {
            var val = prompt("Modifier '" + ref + "'", vm.Sheet.Find(ref));
            if (val != null) {
                vm.Sheet.Set(ref, val);
            }
        }
    }]);