(function () {
  'use strict';

  angular
    .module('app')
    .factory('DeviceService', DeviceService);

  DeviceService.$inject = ['$timeout', '$filter', '$q'];
  function DeviceService($timeout, $filter, $q) {

    var service = {};

    service.GetById = GetById;
    service.GetByUsername = GetByUsername;
    service.GetByDeviceName = GetByDeviceName;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetById(id) {
      var deferred = $q.defer();
      var filtered = $filter('filter')(getDevices(), {id: id});
      var device = filtered.length ? filtered[0] : null;
      deferred.resolve(device);
      return deferred.promise;
    }

    function GetByUsername(username) {
      var deferred = $q.defer();
      var filtered = $filter('filter')(getDevices(), {username: username});
      var devices = filtered.length ? filtered : [];
      deferred.resolve(devices);
      return deferred.promise;
    }

    function GetByDeviceName(deviceName) {
      var deferred = $q.defer();
      var filtered = $filter('filter')(getDevices(), {deviceName: deviceName});
      var device = filtered.length ? filtered[0] : null;
      deferred.resolve(device);
      return deferred.promise;
    }

    function Create(device) {
      var deferred = $q.defer();

      // simulate api call with $timeout
      $timeout(function () {
        GetByDeviceName(device.deviceName)
          .then(function (duplicateDevice) {
            if (duplicateDevice !== null) {
              deferred.resolve({success: false, message: 'Device "' + device.deviceName + '" is already taken'});
            } else {
              var devices = getDevices();

              // assign id
              var lastDevice = devices[devices.length - 1] || {id: 0};
              device.id = lastDevice.id + 1;

              // save to local storage
              devices.push(device);
              setDevices(devices);

              deferred.resolve({success: true});
            }
          });
      }, 1000);

      return deferred.promise;
    }

    function Update(device) {
      var deferred = $q.defer();

      var devices = getDevices();
      for (var i = 0; i < devices.length; i++) {
        if (devices[i].id === device.id) {
          devices[i] = device;
          break;
        }
      }
      setDevices(devices);
      deferred.resolve({ success: true, message: "Device successfully updated!" });

      return deferred.promise;
    }

    function Delete(id) {
      var deferred = $q.defer();

      var devices = getDevices();
      for (var i = 0; i < devices.length; i++) {
        var device = devices[i];
        if (device.id === id) {
          devices.splice(i, 1);
          break;
        }
      }
      setDevices(devices);
      deferred.resolve();

      return deferred.promise;
    }

    // private functions

    function getDevices() {
      if (!localStorage.devices) {
        localStorage.devices = JSON.stringify([]);
      }

      return JSON.parse(localStorage.devices);
    }

    function setDevices(devices) {
      localStorage.devices = JSON.stringify(devices);
    }
  }
})();