'use strict';
import componentsModule from '../components.module';
import template from './halView.html!text';
import './halStyles.css!';
import _ from 'lodash';

componentsModule.directive('pifHalComponent', (HalSpeak, HalListen, $timeout) => {
  return {
    template,
    link: (scope, element) => {
      scope.isActive = false;
      let el;

      scope.startConversation = () => {
        scope.isActive = true;
      };

      scope.$watch('isActive', (isActive) => {
        if (!isActive) {
          return;
        }
        el = angular.element(element[0].querySelector('.hal-text'));
        HalSpeak.say('This is Hal, what can I do for you?', el).then(() => {
          console.log('finished');
          talkWithHal();
        });
      });

      function talkWithHal() {
        return HalListen.listen()
          .then((result) => {
            console.log(result);
            HalSpeak.say('You said: ' + result, el);
            talkWithHal('Please tell me something else');
          })
          .catch((error) => {
            console.log(error);
            HalSpeak.say(error, el);
            talkWithHal('Please tell me something else');
          });
      }

    }
  };
});
