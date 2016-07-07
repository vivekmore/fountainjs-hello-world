(function () {
  'use strict';

  angular
    .module('app')
    .controller('EditDeviceController', EditDeviceController);

  EditDeviceController.$inject = ['AuthenticationService', 'DeviceService', '$state', '$stateParams', '$rootScope', 'FlashService'];
  function EditDeviceController(AuthenticationService, DeviceService, $state, $stateParams, $rootScope, FlashService) {
    var vm = this;

    vm.currentUser = AuthenticationService.UserIsLoggedIn() ? $rootScope.globals.currentUser : {};
    vm.updateDevice = updateDevice;
    vm.device = vm.device || {};
    vm.deviceToEdit = $stateParams.deviceToEdit || {};

    function updateDevice() {
      vm.dataLoading = true;

      DeviceService.Update(vm.deviceToEdit)
        .then(function (response) {
          if (response.success) {
            FlashService.Success('Device successfully updated!', true);
            $state.go('home');
          } else {
            FlashService.Error(response.message);
            vm.dataLoading = false;
          }
        });
    }
  }

})();
