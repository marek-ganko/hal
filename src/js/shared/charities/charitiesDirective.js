import sharedModule from '../shared.module';
import template from './charitiesView.html!text';


sharedModule.directive('pifCharities', ($http) => {

  return {
    restrict: 'E',
    scope: {
      charities: '='
    },
    template: template,
    controllerAs: 'vm',
    bindToController: true,
    controller($element) {
      let vm = this;
    }
  }; 
});

