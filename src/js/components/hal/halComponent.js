'use strict';
import componentsModule from '../components.module';
import template from './halView.html!text';
import './halStyles.css!';
import _ from 'lodash';

componentsModule.directive('pifHalComponent', (HalSpeak, HalListen, $timeout) => {
  return {
    template,
    link: (scope) => {
      scope.isActive = false;

      scope.startConversation = () => {
        scope.isActive = true;
        HalSpeak.say('This is Hal, what can I do for you?').then(() => {
          console.log('finished');
          talkWithHal();
        });
      };

      function talkWithHal() {
        return HalListen.listen()
          .then((result) => {
            console.log(result);
            HalSpeak.say('You said: ' + result);
            talkWithHal('Please tell me something else');
          })
          .catch((error) => {
            console.log(error);
            HalSpeak.say(error);
            talkWithHal('Please tell me something else');
          });
      }

    }
  };
});
