(function () {
  'use strict';

  angular
    .module('app')
    .controller('DeviceController', DeviceController);

  DeviceController.$inject = ['AuthenticationService', 'DeviceService', '$location', '$rootScope', 'FlashService'];
  function DeviceController(AuthenticationService, DeviceService, $location, $rootScope, FlashService) {
    var vm = this;

    vm.currentUser = AuthenticationService.UserIsLoggedIn() ? $rootScope.globals.currentUser : {};
    vm.addDevice = addDevice;
    vm.device = vm.device || {};

    function addDevice() {
      vm.dataLoading = true;
      vm.device.username = vm.currentUser.username;
      DeviceService.Create(vm.device)
        .then(function (response) {
          if (response.success) {
            FlashService.Success('Device successfully added!', true);
            $location.path('/home');
          } else {
            FlashService.Error(response.message);
            vm.dataLoading = false;
          }
        });
    }
  }

})();
