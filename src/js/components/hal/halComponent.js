'use strict';
import componentsModule from '../components.module';
import template from './halView.html!text';
import './halStyles.css!';
import _ from 'lodash';

componentsModule.directive('pifHalComponent', (HalSpeak, HalListen, nlp, $http) => {
  return {
    template,
    link: (scope, element) => {
      scope.isActive = false;
      let halTextElement;

      scope.startConversation = () => {
        scope.isActive = true;
      };

      scope.$watch('isActive', (isActive) => {
        if (!isActive) {
          return;
        }
        halTextElement = angular.element(element[0].querySelector('.hal-text'));
        HalSpeak.say('This is Hal, what can I do for you?', halTextElement).then(() => {
          console.log('finished');
          talkWithHal();
        });
      });

      function talkWithHal() {
        return HalListen.listen()
          .then((result) => {
            halTextElement[0].innerHTML = '...';
            $http.get(`https://yoda.p.mashape.com/yoda?sentence=${encodeURI(result)}`, {
              headers: {'X-Mashape-Key': 'YuX5mt727rmsh2PDPTHIySgjnyJvp1hp1BQjsnFkRVicjDsYoB', 'Accept': 'text/plain'}
            }).then((result) => {
              console.log(result.data);

              //HalSpeak.say('You said: ' + result.data, halTextElement);
              HalSpeak.say('Yoda would say: ' + result.data, halTextElement);
              talkWithHal('Please tell me something else');
            });

          })
          .catch((error) => {
            console.log(error);
            HalSpeak.say(error, halTextElement);
            talkWithHal('Please tell me something else');
          });
      }

    }
  };
});
