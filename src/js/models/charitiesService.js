'use strict';
import modelsModule from './models.module';
import _ from 'lodash';

function extractData(res) {
  return res.data;
}

class Charities {

  constructor($q, $http, PusherService) {
    this.$q = $q;
    this.$http = $http;
    this.pusher = PusherService;
    this.listenToUpdates(this.pusher.subscribe('charity'));
    this.cache = {};
  }

  listenToUpdates(channel) {

    let updateSingleCharity = (data) => {
      _.extend(this.cache[data._id], data);
    };

    channel.bind('update', updateSingleCharity);
    channel.bind('new', () => {
      this._getCharitiesWithNoCache().then((data) => {
        _.extend(this.cache['all'], data);
        _.each(data, updateSingleCharity);
      });
    });

  }

  _getCharitiesWithNoCache() {
    return this.$http.get('https://bh-berlin.herokuapp.com/api/charities')
      .then(extractData);
  }

  getCharities() {
    if (this.cache['all']) {
      return this.$q.when(this.cache['all']);
    }

    return this._getCharitiesWithNoCache()
      .then((charities) => {
        this.cache['all'] = charities;
        return charities;
      });
  }

  getCharity(id) {
    if (this.cache[id]) {
      return this.$q.when(this.cache[id]);
    }

    return this.getCharities().then((charities) => {
      return charities.filter((charity) => {
        return charity._id === id;
      })[0];
    }).then((charity) => {
      this.cache[id] = charity;
      return charity;
    });
  }

}

modelsModule.service('Charities', Charities);
