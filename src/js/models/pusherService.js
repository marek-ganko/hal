'use strict';
import modelsModule from './models.module';
import Pusher from 'pusher';


let PUSHER_API_KEY = '6d79a55875455ca4d124';

modelsModule.factory('PusherService', ($pusher)=>{

  return $pusher(new Pusher(PUSHER_API_KEY, {
      cluster: 'eu'
  }));

});
