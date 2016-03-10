(function () {
    'use strict';

    angular
        .module('app')
        .controller('PMS.IndexController', Controller);

    function Controller($window, PMSService, FlashService) {
        var vm = this;
        vm.createPMS = createPMS;
        vm.deletePMS = deletePMS;
        vm.pms = {};

        //initController();

        //function initController() {
        //    // get current user
        //    PMSService.GetCurrent().then(function (pms) {
        //        vm.pms = pms;
        //    });
        //}

        function createPMS() {
            PMSService.Create(vm.pms)
                .then(function () {
                    FlashService.Success('PMS Created - '+vm.pms.pmsName);
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deletePMS() {
            PMSService.Delete(vm.pms._id)
                .then(function () {
                    // log user out
                    $window.location = '/login';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();