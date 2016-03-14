var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.connectionString);
var pmcDb = db.get('pmc');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var service = {};

service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;


function getById(_id) {
    var deferred = Q.defer();

    pmcDb.findById(_id, function (err, pmc) {
        if (err) deferred.reject(err);

        if (pmc) {
            // return pmc)
            deferred.resolve(pmc);
        } else {
            // pmc not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();
    pmcDb.insert(
        userParam,
        function (err, doc) {
            if (err) deferred.reject(err);

            deferred.resolve();
        });

    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    pmcDb.findById(_id, function (err, pmc) {
        if (err) deferred.reject(err);
        updatepmc();
        //    if (pmcname !== userParam.username) {
        //        // username has changed so check if the new username is already taken
        //        pmcsDb.findOne(
        //            { username: userParam.username },
        //            function (err, user) {
        //                if (err) deferred.reject(err);
        //
        //                if (user) {
        //                    // username already exists
        //                    deferred.reject('Username "' + req.body.username + '" is already taken')
        //                } else {
        //                    updateUser();
        //                }
        //            });
        //    } else {
        //        updateUser();
        //    }
        //});
    });

    function updatepmc() {
        // fields to update
        var set = {
            pmcName: userParam.pmcName,
            pmcAddress1: userParam.pmcAddress1,
            pmcAddress2: userParam.pmcAddress2,
            pmcCity: userParam.pmcCity,
            pmcState: userParam.pmcState,
            pmcCountry: userParam.pmcCountry,
            pmcPh: userParam.pmcPh
        };

        // update password if it was entered
        //if (userParam.password) {
        //    set.hash = bcrypt.hashSync(userParam.password, 10);
        //}

        pmcDb.findAndModify(
            { _id: _id },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    pmcDb.remove(
        { _id: _id },
        function (err) {
            if (err) deferred.reject(err);

            deferred.resolve();
        });

    return deferred.promise;
}