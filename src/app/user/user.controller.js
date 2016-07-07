(function () {
  'use strict';

  angular
    .module('app')
    .controller('UserController', UserController);

  UserController.$inject = ['AuthenticationService', 'UserService', '$stateParams', '$location', '$rootScope', 'FlashService'];
  function UserController(AuthenticationService, UserService, $stateParams, $location, $rootScope, FlashService) {
    var vm = this;

    vm.currentUser = AuthenticationService.UserIsLoggedIn() ? $rootScope.globals.currentUser : {};
    vm.editUser = editUser;
    vm.userToEdit = $stateParams.userToEdit || {};
    console.log($stateParams);

    function editUser() {
      vm.dataLoading = true;
      UserService.Update(vm.userToEdit)
        .then(function (response) {
          if (response.success) {
            FlashService.Success('User successfully added!', true);
            $location.path('/home');
          } else {
            FlashService.Error(response.message);
            vm.dataLoading = false;
          }
        });
    }
  }

})();
