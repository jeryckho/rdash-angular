/**
 * Widget Header Directive
 */

angular
    .module('KMS')
    .directive('rdSidebarItem', function () {
    var directive = {
        scope: {
            icon: '@?',
            target: '@?'
        },
        transclude: true,
        template: '<li class="sidebar-list"><a ng-href="{{target}}"><ng-transclude></ng-transclude> <span class="menu-icon fa-fw" ng-class="icon"></span></a></li>',
        restrict: 'E'
    };
    return directive;
});
