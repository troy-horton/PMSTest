(function () {
    'use strict';

    angular
        .module('app')
        .factory('PMSService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetCurrent() {
            return $http.get('/api/pms/current').then(handleSuccess, handleError);
        }

        function GetAll() {
            return $http.get('/api/pms').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get('/api/pms/' + _id).then(handleSuccess, handleError);
        }

        function GetByUsername(pmsname) {
            return $http.get('/api/pms/' + pmsname).then(handleSuccess, handleError);
        }

        function Create(pms) {
            return $http.post('/api/pms/createPms', pms).then(handleSuccess, handleError);
        }

        function Update(pms) {
            return $http.put('/api/pms/' + pms._id, pms).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/pms/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
