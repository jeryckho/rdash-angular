'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('KMS').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('fiche', {
                url: '/fiche/:Tpl/:Sht',
                templateUrl: 'templates/fiche.html',
                controller: 'SheetCtrl as VM'
            })
            .state('char', {
                url: '/char/:Sht',
                templateUrl: 'templates/character.html',
                controller: 'CharacterCtrl as VM'
            })
            .state('template', {
                url: '/template/:Tpl',
                templateUrl: 'templates/template.html',
                controller: 'TemplateCtrl as VM'
            });
    }
]);
