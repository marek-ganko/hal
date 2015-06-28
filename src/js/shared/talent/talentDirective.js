import sharedModule from '../shared.module';
import template from './talentView.html!text';
import './talentStyles.css!css';


sharedModule.directive('pifTalent', ($state) => {

  return {
    restrict: 'E',
    scope: {
      talent: '=',
      isActive: '='
    },
    replace: true,
    template: template,
    controllerAs: 'vm',
    bindToController: true,
    controller($element) {
      let vm = this;

    }
  }; 
});

