(function () {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['UserService', 'AuthenticationService', 'DeviceService', '$location', '$state', '$rootScope'];
  function HomeController(UserService, AuthenticationService, DeviceService, $location, $state, $rootScope) {
    var vm = this;

    vm.user = null;
    vm.allUsers = [];
    vm.devicesOfCurrentUser = [];
    vm.deleteUser = deleteUser;
    vm.deleteDevice = deleteDevice;
    vm.editDevice = editDevice;

    initController();

    function initController() {
      loadCurrentUser();
      loadAllUsers();
      loadAllDevicesOfCurrentUser();
    }

    function loadCurrentUser() {
      if (AuthenticationService.UserIsLoggedIn()) {
        UserService.GetByUsername($rootScope.globals.currentUser.username)
          .then(function (user) {
            vm.user = user;
          });
      } else {
        AuthenticationService.ClearCredentials();
        $location.path('/login');
      }
    }

    function loadAllUsers() {
      UserService.GetAll()
        .then(function (users) {
          vm.allUsers = users;
        });
    }

    function loadAllDevicesOfCurrentUser() {
      if (AuthenticationService.UserIsLoggedIn()) {
        DeviceService.GetByUsername($rootScope.globals.currentUser.username)
          .then(function (devices) {
            vm.devicesOfCurrentUser = devices;
          });
      }
    }

    function deleteUser(id) {
      UserService.Delete(id)
        .then(function () {
          loadAllUsers();
        });
    }

    function deleteDevice(id) {
      DeviceService.Delete(id)
        .then(function () {
          loadAllDevicesOfCurrentUser();
        });
    }

    function editDevice(device) {
      $state.go("edit-device", {deviceToEdit: device});
    }

  }

})();