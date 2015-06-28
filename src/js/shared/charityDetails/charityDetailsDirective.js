import sharedModule from '../shared.module';
import template from './charityDetailsView.html!text';


sharedModule.directive('pifCharityDetails', ($state) => {

  return {
    restrict: 'E',
    scope: {
      charity: '=',
      charityUser: '='
    },
    replace: false,
    template: template,
    controllerAs: 'vm',
    bindToController: true,
    controller($element, $scope) {
      let vm = this;

      vm.isDonateState = ()=>{
        return $state.includes('tab.charity.donate');
      };
      vm.isTalentsState = () => {
        return $state.includes('tab.charity.talents');
      };

      $scope.$watch(() => vm.charity, (dupa)=>{
        console.log(dupa);
      });
    }
  };
});

