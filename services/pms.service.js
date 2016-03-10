var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.connectionString);
var pmsDb = db.get('pms');
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

    pmsDb.findById(_id, function (err, pms) {
        if (err) deferred.reject(err);

        if (pms) {
            // return pms)
            deferred.resolve(pms);
        } else {
            // pms not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();
    pmsDb.insert(
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
    pmsDb.findById(_id, function (err, pms) {
        if (err) deferred.reject(err);
        updatePms();
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

    function updatePms() {
        // fields to update
        var set = {
            pmsName: userParam.pmsName,
            pmsAddress1: userParam.pmsAddress1,
            pmsAddress2: userParam.pmsAddress2,
            pmsCity: userParam.pmsCity,
            pmsState: userParam.pmsState,
            pmsCountry: userParam.pmsCountry,
            pmsPh: userParam.pmsPh
        };

        // update password if it was entered
        //if (userParam.password) {
        //    set.hash = bcrypt.hashSync(userParam.password, 10);
        //}

        pmsDb.findAndModify(
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

    pmsDb.remove(
        { _id: _id },
        function (err) {
            if (err) deferred.reject(err);

            deferred.resolve();
        });

    return deferred.promise;
}