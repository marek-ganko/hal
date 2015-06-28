'use strict';
import componentsModule from '../components.module';
import template from './emailModalView.html!text';

componentsModule.directive('pifEmailModalComponent', (Charities) => {

  return {
    template: template,
    bindToController: true,
    controllerAs: 'vm',
    controller() {
      let vm = this;
      Charities.getCharities().then((charities) => {
        vm.charities = charities;
      });
   }
  };
});
