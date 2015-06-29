'use strict';
import modelsModule from '../models.module';
import _ from 'lodash';

class Speak {

  constructor() {
    this.setVoice('Zarvox').then((voice) => {
      console.log(voice);
      this.voice = voice;
    });
  }
  setVoice(name) {
    return new Promise((resolve, reject) => {
      const voices = speechSynthesis.getVoices();
      if (_.isEmpty(voices)) {
        reject('No voices available');
      }

      _.each(voices, (voice) => {
        console.log(voice);
        if (voice.name === name) {
          this.voice = voice;
          resolve(voice);
        }
      });
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