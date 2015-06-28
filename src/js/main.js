'use strict';
import modelsModule from './models/models';
import sharedModule from './shared/shared';
import componentsModule from './components/components';
import 'ionic';
import mainView from '../views/main.html!text';
import donateView from '../views/donate.html!text';
import mapView from '../views/map.html!text';
import charitiesView from '../views/charities.html!text';
import charityView from '../views/charity.html!text';
import talentsView from '../views/talents.html!text';
import rankingView from '../views/ranking.html!text';
import charityDetailsView from '../views/charityDetails.html!text';
import emailView from '../views/emailView.html!text';

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

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                template: mainView
            })

            // Each tab has its own nav history stack:

            .state('tab.map', {
                url: '/map',
                onEnter: setTitle('Find Your Projects On Map'),
                views: {
                    'content': {
                        template: mapView
                    }
                }
            })

            .state('tab.charities', {
              url: '/charities',
              onEnter: setTitle('Discover Projects Close To You'),
              views: {
                'content': {
                  template: charitiesView
                }
              }
            })

            .state('tab.charity', {
              url: '/charities/:id',
              views: {
                'content': {
                  template: charityView
                }
              }
            })
            .state('tab.charity.details', {
              url: '/details',
              views: {
                'sub-content': {
                  template: charityDetailsView
                }
              }
            })

            .state('tab.charity.donate', {
              url: '/donate',
              views: {
                'sub-content': {
                  template: donateView
                }
              }
            })

            .state('tab.charity.talents', {
              url: '/talents',
              views: {
                'sub-content': {
                  template: talentsView
                }
              }
            })

            .state('tab.charity.ranking', {
              url: '/ranking',
              views: {
                'sub-content': {
                  template: rankingView
                }
              }
            })

            .state('tab.auth', {
              url: '/auth',
              onEnter: setTitle('Who Are You?'),
              views: {
                'content': {
                  template: emailView,
                  controller: 'AuthController'
                }
              }
            })
            ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/map');

    }).controller('AuthController', function($scope, $state) {
      if (window.localStorage.knownUser) {
        $state.go('tab.map');
        return;
      }

      $scope.submit = () => {
        if (!_.isEmpty($scope.email)) {
          window.localStorage.knownUser = $scope.email;
          // log entered user
          $state.go('tab.map');
        }
      };
  });

angular.bootstrap(document, [app.name]);
