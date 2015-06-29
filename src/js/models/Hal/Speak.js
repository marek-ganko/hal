'use strict';
import modelsModule from '../models.module';
import _ from 'lodash';

class Speak {

  constructor() {
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
          console.log(voice);
          if (voice.name === name) {
            this.voice = voice;
            return resolve(voice);
          }
        });
      };


    });

  }

  say(text) {
    return new Promise((resolve, reject) => {

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = this.voice;

      utterance.addEventListener('end', () => {
        resolve();
      });

      utterance.addEventListener('error', (event) => {
        reject(event.error);
      });

      speechSynthesis.speak(utterance);
    });
  }

}

modelsModule.service('HalSpeak', Speak);