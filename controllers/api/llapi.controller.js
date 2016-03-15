var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

//var llapiService = require('services/llapi.service');

//router.get('/', function (req, res) {
//    res.render('register');
//});

router.post('/createLLPmc', createLLPmc);

function createLLPmc(req, res) {
    res.sendStatus(200);
    request.post({
        url: config.llapiUrl + '/hub/v2/pmcs',
        qs: {apiKey: config.llapiKey},
        json: {
            "name": req.body.pmcName,
            "phoneNumber": {
                "countryCode": "666",
                "mainNumber": req.body.pmcPhone,
                "ext": "555"
            },
            "reservationPhoneNumber": {
                "countryCode": "666",
                "mainNumber": req.body.pmcPhone,
                "ext": "555"
            },
            "emailAddress": req.body.pmcEmail,
            "websiteUrl": req.body.pmcUrl
        },
        json: true
    }, function (error, response, body) {
        if (error) {
            console.log(error);
        }

        //if (response.statusCode !== 200) {
        //    return ({
        //        error: response.body,
        //        pmcName: req.body.pmcName
        //        //lastName: req.body.lastName,
        //        //username: req.body.username
        //    });
        //}
        // return to login page with success message
        //req.session.success = 'LeisureLink PMC Creation successful';
        //return res.redirect('/login');
    });
}

module.exports = router;