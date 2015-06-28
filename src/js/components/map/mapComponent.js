'use strict';
import componentsModule from '../components.module';
import template from './mapView.html!text';
import './mapStyles.css!';
import _ from 'lodash';

//import emailView from '../../../views/emailView.html!text';

componentsModule.directive('pifMapComponent', (Charities, $timeout, $cordovaGeolocation, Users, $state) => {
    return {
        template,
        link: (scope) => {

          let firstTime = true;
          function updateLocation() {
            var email = window.localStorage.knownUser;
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
              .getCurrentPosition(posOptions)
              .then(function (position) {
                const coordinates = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                };

                Users.updatePosition(email, coordinates);


                if (firstTime) {
                  centerMap(coordinates.latitude, coordinates.longitude);
                  firstTime = false;
                }

                return;
              }, function (err) {
                console.log(err);
                // error
              });

            $timeout(updateLocation, 10000);
          }

            const drawMarker = (map, id, imageUrl, lat, lng, title, zIndex = 1) => {
                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    map: map,
                    icon: {url: imageUrl},
                    shape: {coords: [50, 50, 25], type: 'circle'},
                    title: title,
                    zIndex: zIndex,
                    optimized: false
                });
                google.maps.event.addListener(marker, 'click', function() {
                   $state.go('tab.charity.details', {
                    id: id
                   });
                });
            };

            let isDestroyed;

            function rollCharity() {
                let a = scope.charities;
                scope.currentCharity = a[Math.floor(Math.random() * a.length)];
                if (isDestroyed) {
                    return;
                }

                $timeout(rollCharity, 5000);
            }

            scope.$on('$destroy', ()=>{
                isDestroyed = true;
            });

          var mapObject = null;

            function centerMap(latitude, longitude) {
              mapObject.setCenter(new google.maps.LatLng(latitude, longitude));
            }

            scope.$watch('charities.length', ()=>{
                let charities = scope.charities || [];
                _.each(charities, (element) => {
                    element.thumb = element.thumb || 'http://lorempixel.com/50/50';
                    drawMarker(mapObject, element._id, element.thumb, element.coordinates.latitude, element.coordinates.longitude, element.name);
                });
            });

            scope.$on('mapInitialized', (event, map) => {
                    mapObject = map;
                    map.setCenter(new google.maps.LatLng(52, 13));
                    map.setZoom(10);
                    updateLocation();
                    Charities.getCharities().then((charities) => {
                        scope.charities = charities;
                        rollCharity();
                    });

                }
            );
        },

        controller: function($scope, $state) {
            if (!window.localStorage.knownUser) {
                $state.go('tab.auth');
            }
        }

    };
});
