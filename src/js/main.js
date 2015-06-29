'use strict';
import modelsModule from './models/models';
import sharedModule from './shared/shared';
import componentsModule from './components/components';
import 'ionic';
import mainView from '../views/main.html!text';
import halView from '../views/hal.html!text';

import 'ionic-material/dist/ionic.material.min';
import 'ionic-material/dist/ionic.material.min.css!';
import 'ng-cordova/dist/ng-cordova.min';

import _ from 'lodash';

const app = angular.module('pif', [
    'ionic',
    'ionic-material',
    'ngCordova',
    modelsModule.name,
    sharedModule.name,
    componentsModule.name
])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

      function setTitle(name) {
        return function($rootScope) {
          $rootScope.title = name;
        };
      }
        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: true,
                template: mainView
            })
            .state('tab.hal', {
                url: '/hal',
                onEnter: setTitle('This is Hal, what can I do for you?'),
                views: {
                    'content': {
                        template: halView
                    }
                }
            })
            ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/hal');

    });

angular.bootstrap(document, [app.name]);
