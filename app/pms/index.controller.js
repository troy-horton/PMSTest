(function () {
    'use strict';

    angular
        .module('app')
        .controller('PMS.IndexController', Controller);

    function Controller($window, PMSService, FlashService,PMCService) {
        var vm = this;
        var dt = new Date().toLocaleString();
        vm.pms = {};
        vm.pmc = {};
        vm.createPMS = createPMS;
        vm.deletePMS = deletePMS;
        vm.savePMS = savePMS;
        vm.createPMC = createPMC;
        vm.deletePMC = deletePMC;
        vm.savePMC = savePMC;


        //initController();

        //function initController() {
        //    // get current user
        //    PMSService.GetCurrent().then(function (pms) {
        //        vm.pms = pms;
        //    });
        //}

        function createPMS() {
            vm.pms.created=dt;
            PMSService.Create(vm.pms)
                .then(function () {
                    FlashService.Success('PMS Created - '+vm.pms.pmsName);
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function savePMS() {
            vm.pms.lastupdated=dt;
            PMSService.Update(vm.pms)
                .then(function () {
                    FlashService.Success('PMS updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deletePMS() {
            PMSService.Delete(vm.pms._id)
                .then(function () {
                    FlashService.Success('PMS deleted');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function createPMC() {
            vm.pmc.created=dt;
            PMCService.Create(vm.pmc)
                .then(function () {
                    FlashService.Success('PMC Created - '+vm.pmc.pmcName);
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });

        }

        function savePMC() {
            vm.pmc.lastupdated=dt;
            PMCService.Update(vm.pmc)
                .then(function () {
                    FlashService.Success('PMC updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deletePMC() {
            PMCService.Delete(vm.pmc._id)
                .then(function () {
                    FlashService.Success('PMC deleted');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }


})();