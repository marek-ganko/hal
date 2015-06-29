'use strict';
import modelsModule from '../models.module';
import _ from 'lodash';

class Speak {

  constructor($timeout) {
    this.$timeout = $timeout;
    this.setVoice('Zarvox').then((voice) => {
      console.log(voice);
      this.voice = voice;
    }).catch((error) => {
      console.log(error);
    });
  }
  setVoice(name) {
    return new Promise((resolve, reject) => {

      speechSynthesis.onvoiceschanged = function() {
        const voices = speechSynthesis.getVoices();
        if (_.isEmpty(voices)) {
          return reject('No voices available');
        }

        _.each(voices, (voice) => {
          if (voice.name === name) {
            this.voice = voice;
            return resolve(voice);
          }
        });
      };


    });

  }

  say(text, element) {
    return new Promise((resolve, reject) => {

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = this.voice;
      utterance.rate = 0.7;

      utterance.addEventListener('end', () => {
        resolve();
      });

      utterance.addEventListener('error', (event) => {
        reject(event.error);
      });

      speechSynthesis.speak(utterance);

      element[0].innerHTML = '';
      text.split('').forEach((elem, index) => {
        this.$timeout(() => element.append(elem), 100 * index * (1.5 - 0.7));
      });

    });
  }

}

modelsModule.service('HalSpeak', Speak);