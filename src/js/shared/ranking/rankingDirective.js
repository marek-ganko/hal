import sharedModule from '../shared.module';
import template from './rankingView.html!text';
import './rankingStyles.css!';
import _ from 'lodash';

sharedModule.directive('pifRanking', (Users) => {

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
    controller($scope) {
      let vm = this;

      Users.getUsers().then((users) => {
        _.map(users, (user) => {
          user.score = _.reduce(user.charities || {}, (sum, score) => { 
            return sum + score.points || 0; 
          }, 0);
        });
        $scope.users = users;
      });

    }
  }; 
});

