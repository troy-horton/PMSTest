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

    request.post({
        url: config.llapiUrl + '/hub/v2/pmcs',
        qs: {apiKey: config.llapiKey},
        json:
    {
        "name": req.body.pmcName,
        "phoneNumber": {
        "countryCode": "555",
            "mainNumber": req.body.pmcPhone,
            "ext": "1111"
    },
        "reservationPhoneNumber": {
        "countryCode": "555",
            "mainNumber": req.body.pmcPhone,
            "ext": "1111"
    },
        "emailAddress": req.body.pmcEmail,
        "websiteUrl": req.body.pmcUrl
    }

    }, function (error, response, body) {
        if (error) {
            console.log(response, body);
        }
        res.sendStatus(response.statusCode);
        if (response.statusCode == 202) {
            console.log(response.headers['location']);
        }else{
            console.log(response.statusCode, body);
        }
        // return to login page with success message
        //req.session.success = 'LeisureLink PMC Creation successful';
        //return res.redirect('/login');
    });
}

module.exports = router;