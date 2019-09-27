/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const logger = require('./logger');
const ccpPath = path.resolve(__dirname, 'local_fabric_wallet','connection.json');

var contract;

async function connection() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'local_fabric_wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('admin');
        if (!userExists) {
            console.log('An identity for the user "admin" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
        // Get the contract from the network.
        contract = network.getContract('initiative','PersonContract');
        console.log("Successfully connect to fabric");
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

async function queryPerson(id){
    try {
        id = "PERSON_"+id;
        const result = await contract.submitTransaction('readPerson',id);
        logger.info(`Transaction has been submited, result is: ${result.toString()}`);
        return result;
    } catch (error) {
        throw Error(error.endorsements[0].message);
    }
}

async function queryPersonHistory(id){
    try {
        id = "PERSON_"+id;
        const result = await contract.submitTransaction('readPersonHistory',id);
        logger.info(`Transaction has been submited, result is: ${result.toString()}`);
        return result;
    } catch (error) {
        throw Error(error.endorsements[0].message);
    }
}

async function queryPersonAll(){
    try {
        const result = await contract.submitTransaction('queryAllPerson');
        logger.info(`Transaction has been submited, result is: ${result.toString()}`);
        return result;
    } catch (error) {
        throw Error(error.endorsements[0].message);
    }
}

async function registerPerson(data){
    try {
        data.id = "PERSON_"+data.id;
        console.log(JSON.stringify(data));
        const result = await contract.submitTransaction('createPerson',data.id,JSON.stringify(data));
        logger.info(`Transaction has been submited, result is: ${result.toString()}`);
        return result;
    } catch (error) {
        throw Error(error.endorsements[0].message);
    }
}

async function updatePerson(data){
    try {
        data.id = "PERSON_"+data.id;
        console.log(JSON.stringify(data));
        const result = await contract.submitTransaction('updatePerson',data.id,JSON.stringify(data));
        logger.info(`Transaction has been submited, result is: ${result.toString()}`);
        return result;
    } catch (error) {
        throw Error(error.endorsements[0].message);
    }
}

async function deletePerson(id){
    try {
        id = "PERSON_"+id;
        const result = await contract.submitTransaction('deletePerson',id);
        logger.info(`Transaction has been submited, result is: ${result.toString()}`);
        return result;
    } catch (error) {
        throw Error(error.endorsements[0].message);
    }
}

async function personCar(id){
    try {
        id = "PERSON_"+id;
        const result = await contract.submitTransaction('readPersonCar',id);
        logger.info(`Transaction has been submited, result is: ${result.toString()}`);
        return result;
    } catch (error) {
        throw Error(error.endorsements[0].message);
    }
}

async function main(){
    await connection();
}

main();

module.exports = {queryPerson,registerPerson, queryPersonAll, updatePerson, deletePerson, personCar, queryPersonHistory};
