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
        contract = network.getContract('initiative','CarContract');
        console.log("Successfully connect to fabric");
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

async function queryCar(id){
    try {
        id = "CAR_"+id;
        const result = await contract.submitTransaction('readCar',id);
        logger.info(`Transaction has been submited, result is: ${result.toString()}`);
        return result;
    } catch (error) {
        throw Error(error.endorsements[0].message);
    }
}

async function queryCarHistory(id){
    try {
        id = "CAR_"+id;
        const result = await contract.submitTransaction('readCarHistory',id);
        logger.info(`Transaction has been submited, result is: ${result.toString()}`);
        return result;
    } catch (error) {
        throw Error(error.endorsements[0].message);
    }
}

async function queryCarAll(){
    try {
        const result = await contract.submitTransaction('queryAllCar');
        logger.info(`Transaction has been submited, result is: ${result.toString()}`);
        return result;
    } catch (error) {
        throw Error(error.endorsements[0].message);
    }
}

async function requestCar(data){
    try {
        data.id = "CAR_"+data.id;
        console.log(JSON.stringify(data));
        const result = await contract.submitTransaction('requestCar',data.id,JSON.stringify(data));
        logger.info(`Transaction has been submited, result is: ${result.toString()}`);
        return result;
    } catch (error) {
        throw Error(error.endorsements[0].message);
    }
}

async function makeCar(id){
    try {
        id = "CAR_"+id;
        const result = await contract.submitTransaction('makeCar',id);
        logger.info(`Transaction has been submited, result is: ${result.toString()}`);
        return result;
    } catch (error) {
        console.error(error.endorsements[0].message);
        throw Error(error.endorsements[0].message);
    }
}

async function deleteCar(id){
    try {
        id = "CAR_"+id;
        const result = await contract.submitTransaction('deleteCar',id);
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

module.exports = {queryCar,requestCar, makeCar, queryCarAll, deleteCar, queryCarHistory};
