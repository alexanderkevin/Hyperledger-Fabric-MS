# Hyperledger Fabric Microservices

This is the microservices part that are interacting with the chaincode on this repository 
[Hyperledger Fabric Chaincode](https://github.com/alexanderkevin/Hyperledger-Fabric-MS)

The microservices itself will be divided into three seperate services that will each work correspondingly with their respective smart contract.

This microservices are build using Express and NodeJS. The interaction with the chaincode are done using `fabric-network` npm library. 

## How to run
This section will provide explanation on how to run the MS side of the application locally on your machine. 

>Every MS step would be the exact same. In this guide we'll use initiative-ms-car.

### Step 1

Get to the directory of the specific ms
```
cd initiative-ms-car
```

### Step 2

Install all of the dependency
```
npm install
```

### Step 3

Get the fabric certificate:
> This part expect you to have succesfully installed the [Hyperledger Fabric Chaincode](https://github.com/alexanderkevin/Hyperledger-Fabric-MS)

1. In your Visual Studio Code click on the IBM Blockchain Platform icon (on the side bar)
2. Right click `Export Wallet` on the local fabric wallet in the Fabric Wallets menu
3. Choose the directory of this project

### Step 4

Run the application
>The app would run on the port that are listen on the config folder on default.js

```
npm start
```

### Step 5
Interacting with the MS with the help of postman by Importing the `Initiative.postman_collection.json` to your postman


## Brief Explanation
This section will give you a little bit of background of what each MS cover

### Initiative MS Car
This microservices would interact with the `carContract` smart contract. It has several method such as:
* Request Car
* Manufacture the Car
* See Car's Status
* Get list of all cars
* Get block history of specific car
* Delete Car Record

### Initiatice MS Person
This microservices would interact with the `personContract` smart contract. It has several method such as:
* Create Person
* Update Person
* See Person Data
* See all cars that belong to specific Person
* Get list of all Persons
* Get block history of specific Person
* Delete Person Record

### Initiatice MS Transaction
This microservices would interact with the `transactionContract` smart contract. It has several method such as:
* Buy new Car
* Transfer Car's ownership