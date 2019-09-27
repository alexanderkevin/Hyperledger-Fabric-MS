const express = require('express');
const router = express.Router();
const logger = require('./logger');
const config = require('config');
const BCconn = require('./query');

router.post('/buyCar',async function (req, res) {
    let violation = checkMissingField(req.body,config.mandatoryFieldBuy);
    if(violation.missingField.length > 0 || violation.extraField.length > 0){
        res.status(400);
        res.json(violation);
    }
    else {
        try {
            let result = await BCconn.buyCar(req.body);
        } catch (error) {
            logger.error(error);
            res.status(500).json({error:error});
        }
        req.body.status = 'SUCCESS';
        res.status(200).json(req.body);
    }
});

router.post('/transferCar',async function (req, res) {
    let violation = checkMissingField(req.body,config.mandatoryFieldTransferCar);
    if(violation.missingField.length > 0 || violation.extraField.length > 0){
        res.status(400);
        res.json(violation);
    }
    else {
        try {
            let result = await BCconn.transferCar(req.body);
        } catch (error) {
            logger.error(error);
            res.status(500).json({error:error});
        }
        req.body.status = 'SUCCESS';
        res.status(200).json(req.body);
    }
});

function checkMissingField(data,mandatoryData){
    let violation = {};
    violation.missingField = [];
    violation.extraField = [];
    mandatoryData.forEach(mandatoryKey => {
        if(!data[mandatoryKey]){
            violation.missingField.push(mandatoryKey);
        }
    });
    console.log(mandatoryData);
    for (field in data) {
        if(!mandatoryData.includes(field)){
            violation.extraField.push(field);
        }
    };
    return violation;
}
module.exports = router;