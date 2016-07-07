angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  
  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'app/home/home.view.html',
      controller: 'HomeController',
      controllerAs: 'vm'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.view.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'app/register/register.view.html',
      controller: 'RegisterController',
      controllerAs: 'vm'
    })
    .state('device', {
      url: '/device',
      templateUrl: 'app/device/device.view.html',
      controller: 'DeviceController',
      controllerAs: 'vm'
    })
    .state('edit-device', {
      url: '/edit-device',
      templateUrl: 'app/edit-device/edit-device.view.html',
      controller: 'EditDeviceController',
      controllerAs: 'vm',
      params: {
        deviceToEdit: {}
      }
    })
    .state('user', {
      url: '/user',
      templateUrl: 'app/user/user.view.html',
      controller: 'UserController',
      controllerAs: 'vm',
      params: {
        userToEdit: {}
      }
    });
}
