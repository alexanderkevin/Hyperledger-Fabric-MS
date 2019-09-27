# Hyperledger Fabric Microservices

This is the microservices part that are interacting with the chaincode on this repository 
[Hyperledger Fabric Chaincode](https://github.com/alexanderkevin/Hyperledger-Fabric-Chaincode)

The microservices itself will be divided into three seperate services that will each work correspondingly with their respective smart contract.

This microservices are build using Express and NodeJS. The interaction with the chaincode are done using `fabric-network` npm library. 

## The Story
Someday a `Person` is going to buy a `Car`. The Person would need to `Register` itself on the blockchain before he can buy that dream car.

>The System will Invoke the `/person/register` 

After the Person data has been recorded on Blockchain, He will `Request` a car to be made.

>The System will Invoke the `/car/requestCar`

The manufacturer would then start to `Make` the requested car.

>The System will invoke the `/car/manufacture/{id}`

After the car has been made then the manufacturer would let the person `Buy` the car

>The System will Invoke the `/transaction/buyCar`

Voila! now the car are permanently recorded on the blockchain for that person

If the Person want to see when and what are the `History` of the car. He can directly refer to the ledger on the blockchain.

>The System will provide all of the history of the block by Invoking `/car/history/{id}`

Someday the person decided to `Transfer` the car to his son and so The Sytem will ... (we will let you figure this part yourself)


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
> This part expect you to have succesfully installed the [Hyperledger Fabric Chaincode](https://github.com/alexanderkevin/Hyperledger-Fabric-Chaincode)

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

### Initiative MS Person
This microservices would interact with the `personContract` smart contract. It has several method such as:
* Create Person
* Update Person
* See Person Data
* See all cars that belong to specific Person
* Get list of all Persons
* Get block history of specific Person
* Delete Person Record

### Initiative MS Transaction
This microservices would interact with the `transactionContract` smart contract. It has several method such as:
* Buy new Car
* Transfer Car's ownership