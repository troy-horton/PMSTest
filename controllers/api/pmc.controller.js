var config = require('config.json');
var express = require('express');
var router = express.Router();
var pmcService = require('services/pmc.service');

// routes
router.post('/createpmc', createpmc);
//router.get('/current', getCurrentUser);
router.put('/:_id', updatepmc);
router.delete('/:_id', deletepmc);

module.exports = router;

//function authenticateUser(req, res) {
//    userService.authenticate(req.body.username, req.body.password)
//        .then(function (token) {
//            if (token) {
//                // authentication successful
//                res.send({ token: token });
//            } else {
//                // authentication failed
//                res.sendStatus(401);
//            }
//        })
//        .catch(function (err) {
//            res.status(400).send(err);
//        });
//}

function createpmc(req, res) {
    pmcService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

//function getCurrentUser(req, res) {
//    userService.getById(req.user.sub)
//        .then(function (user) {
//            if (user) {
//                res.send(user);
//            } else {
//                res.sendStatus(404);
//            }
//        })
//        .catch(function (err) {
//            res.status(400).send(err);
//        });
//}

function updatepmc(req, res) {
    var pmcId = req.pmc.sub;
    //if (req.params._id !== userId) {
    //    // can only update own account
    //    return res.status(401).send('You can only update your own account');
    //}

    pmcService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deletepmc(req, res) {
    var pmcId = req.pmc.sub;
    //if (req.params._id !== userId) {
    //    // can only delete own account
    //    return res.status(401).send('You can only delete your own account');
    //}

    pmcService.delete(pmcId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}