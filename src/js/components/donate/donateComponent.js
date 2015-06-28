import componentsModule from '../components.module';
import template from './donateView.html!text';
import './donateStyles.css!';

componentsModule.directive('pifDonateComponent', () => {
  return {
    restrict: 'E',
    scope:{},
    template: template,
    controllerAs: 'vm',
    bindToController: true,
    controller() {
      let vm = this;
    }
  }; 
});
