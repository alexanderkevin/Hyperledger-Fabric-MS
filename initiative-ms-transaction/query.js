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
        contract = network.getContract('initiative','TransactionContract');
        console.log("Successfully connect to fabric");
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

async function buyCar(data){
    try {
        data.car_id = "CAR_"+data.car_id;
        data.person_id = "PERSON_"+data.person_id;
        const result = await contract.submitTransaction('buyNewCar',data.car_id,data.person_id);
        logger.info(`Transaction has been submited, result is: ${result.toString()}`);
        return result;
    } catch (error) {
        throw Error(error.endorsements[0].message);
    }
}

async function transferCar(data){
    try {
        data.car_id = "CAR_"+data.car_id;
        data.person_id = "PERSON_"+data.person_id;
        const result = await contract.submitTransaction('transferCar',data.car_id,data.person_id);
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

module.exports = {buyCar, transferCar};
