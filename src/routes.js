angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
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
    });
}
