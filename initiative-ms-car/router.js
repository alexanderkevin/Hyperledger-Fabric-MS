const express = require('express');
const router = express.Router();
const logger = require('./logger');
const config = require('config');
const BCconn = require('./query');

router.post('/request',async function (req, res) {
    let violation = checkMissingField(req.body,config.mandatoryFieldRequest);
    if(violation.missingField.length > 0 || violation.extraField.length > 0){
        res.status(400);
        res.json(violation);
    }
    else {
        try {
            let result = await BCconn.requestCar(req.body);
        } catch (error) {
            logger.error(error);
            res.status(500).json({error:error});
        }
        req.body.status = 'SUCCESS';
        res.status(200).json(req.body);
    }
});

router.post('/manufacture/:id',async function (req, res) {
    let violation = checkMissingField(req.body,config.mandatoryFieldMake);
    if(violation.missingField.length > 0 || violation.extraField.length > 0){
        res.status(400);
        res.json(violation);
    }
    else {
        try {
            let result = await BCconn.makeCar(req.params.id);
        } catch (error) {
            logger.error(error);
            res.status(500).json({error:error});
        }
        req.body.status = 'SUCCESS';
        res.status(200).json(req.body);
    }
});

router.get('/all', async function(req, res) {
    try {
        let result = await BCconn.queryCarAll();
        res.send(JSON.parse(result));
    } catch (error) {
        delete error.stack;
        res.status(500).json(error);
    }
});

router.get('/:id', async function(req, res) {
    try {
        let result = await BCconn.queryCar(req.params.id);
        res.send(JSON.parse(result));
    } catch (error) {
        delete error.stack;
        res.status(500).json(error);
    }
});

router.get('/history/:id', async function(req, res) {
    try {
        let result = await BCconn.queryCarHistory(req.params.id);
        res.send(JSON.parse(result));
    } catch (error) {
        delete error.stack;
        res.status(500).json(error);
    }
});

router.get('/:id/car', async function(req, res) {
    try {
        let result = await BCconn.personCar(req.params.id);
        res.send(JSON.parse(result));
    } catch (error) {
        delete error.stack;
        res.status(500).json(error);
    }
});

router.delete('/:id', async function(req,res){
    try {
        let result = await BCconn.deleteCar(req.params.id);
        res.send({message:"SUCCESS"});
    } catch (error) {
        // delete error.stack;
        res.status(500).json(error);
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