import sharedModule from '../shared.module';
import braintree from 'braintree-web';
import template from './donateView.html!text';


sharedModule.directive('pifDonate', ($http) => {

  return {
    restrict: 'E',
    scope: {
      charity: '='
    },
    template: template,
    controllerAs: 'vm',
    bindToController: true,
    controller($scope, $element) {
      let vm = this;

      let clientTokenUrl = 'https://bh-berlin.herokuapp.com/api/client-token';
      let postUrl;
     
      $scope.$watch(() => vm.charity, (charity) => {
        if (!charity) {
          return;
        }
        postUrl = 'https://bh-berlin.herokuapp.com/api/charities/' + charity._id + '/payment';
      });

      vm.state = 'isLoading';

      $http.get(clientTokenUrl).then(function (resp) {
        return resp.data;
      }).then(function (token) {
        vm.state = 'isInitial';
        braintree.setup(
          // Replace this with a client token from your server
          token,
          'dropin', 
          {
            container: 'dropin'
          }
        );
      });

      vm.createTransaction = function () {
        vm.state = 'isLoading';

        var nonce = $element.find('[name="payment_method_nonce"]').val();
        $http.post(postUrl, {
            email: window.localStorage.knownUser,
            payment_method_nonce: nonce
        }).then(function () {
          vm.state = 'isCompleted';
        });
      };
    }
  }; 
});

