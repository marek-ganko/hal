'use strict';
import componentsModule from '../components.module';
import mainTemplate from './mainView.html!text';

componentsModule.directive('pifMainComponent', ($ionicSideMenuDelegate) => {

  return {
    template: mainTemplate,
    bindToController: true,
    controllerAs: 'vm',
    controller() {
      let vm = this;
      vm.toggleLeft = () => {
        $ionicSideMenuDelegate.toggleLeft();
      };
    }
  };
});
