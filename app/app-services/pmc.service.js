(function () {
    'use strict';

    angular
        .module('app')
        .factory('PMCService', Service);

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
            return $http.get('/api/pms/pmc/current').then(handleSuccess, handleError);
        }

        function GetAll() {
            return $http.get('/api/pms/pmc').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get('/api/pmc/' + _id).then(handleSuccess, handleError);
        }

        function GetByUsername(pmcname) {
            return $http.get('/api/pmc/' + pmcname).then(handleSuccess, handleError);
        }

        function Create(pmc) {
            return $http.post('/api/pmc/createpmc', pmc).then(handleSuccess, handleError);
        }

        function Update(pmc) {
            return $http.put('/api/pmc/' + pmc._id, pmc).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/pmc/' + _id).then(handleSuccess, handleError);
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
