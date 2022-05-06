# SIMPLE ETHER WALLET

## Overview

This project is about the creation of an Ether wallet platform where users can create accounts, send and receive ether, and view wallet balance.

It is a low level implementation of platforms like coinbase, luno etc.

## Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (React & Node.js)
- [Web3](https://web3js.readthedocs.io/en/v1.2.11/index.html) (Blockchain Interaction)
- [Ganache](https://trufflesuite.com/ganache/) (Local blockchain)
- [Remix](http://remix.ethereum.org/) (Web based solidity compiler)
- [MySql Workbench](https://dev.mysql.com/) (Local database management tool for MySQL database)

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/),
- [MySql Workbench](https://dev.mysql.com/)

## Architecture (Data flow)

    Below is the data flow pattern used in this project:

    Frontend(React) <-> Fetch Api <-> Backend(Node.js) <-> Web3 <-> Ganache(Local blockchain)

## Alternative Architecture

    Apart from the above data flow or architectural pattern, the below architectural pattern can also be used with a couple of tweaks:

    Frontend(React) <-> Web3 <-> MetaMask(Web3 connector) <-> Ganache(Local blockchain)

## Start Development

Kindly fork and clone the repo 

## Installation

### SET UP LOCAL BLOCKCHAIN

Download [Ganache](https://trufflesuite.com/ganache/index.html) which is a local blockchain that you can run the smart contract or 

Install Ganache-cli using the following command

```
npm install ganache-cli
```

After install of the Ganache-cli, run the following command to get access to your local blockchain

```
ganache-cli
```

### SMART CONTRACT SETUP

You can copy the code in 'wallet.sol' and paste in [Remix](https://remix.ethereum.org), then compile and deploy to local blockchain.

### BACKEND INSTALLATION

cd or navigate to the backend folder from the root folder in your terminal and install backend dependencies

```markdown
#Goto backend
cd frontend

#Install dependencies
npm install
```

## Setup

Create a .env file in the root directory of the backend folder and add the following properties

```markdown
DB_USER = ?
DB_HOST = ?
DB_DATABASE = ?
DB_PASSWORD = ?
#Set timezone, put 1 if it's GMT+1 or -1 if it's GMT-1
TIME_ZONE = ?
SECRET_KEY=?
#Local blockchain url
WEB3_URL =?
#Smart contract address
CONTRACT_ADDRESS=?
```

### FRONTEND INSTALLATION

cd or navigate to the frontend folder from the root folder in your terminal and install backend dependencies

```
#Goto frontend
cd frontend

#Install dependencies
npm install
```

## TEST

### TEST BACKEND PROJECT

The backend test include database connect and table creation test, web3 test and account creation test.

NB: Please some test cases are commented out and the reasons for the comment are at the top of each comment.

cd to the backend folder in your terminal and enter the following command
```
npm run test
```



## STARTING PROJECT

### STARTING FRONTEND PROJECT

cd to the frontend folder in your terminal and enter the following command

```
npm start
```

You can access the project in your browser by entering - `localhost:3000`


### STARTING BACKEND PROJECT

cd to the backend folder in your terminal and enter the following command

```
npm start
```

Backend opens at port 8000


## 🎩 Author

- IJONI VICTOR  

> Don't forget to star the project :) :) . Thanks

