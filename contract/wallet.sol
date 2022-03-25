// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.1 <0.9.0;

contract SimpleWallet{

    address payable public owner;
    
    //Smart contract constructor
    constructor(){
        owner = payable (msg.sender);
    }

    //Function for the contract to receive ether
    receive() external payable{}

    function getContractEtherBalance() public view returns (uint){
        return address(this).balance;
    }

    function withdrawFromContract(uint amount) external{
        require(this.getContractEtherBalance() >= amount, "Withdrawal failed. Please contact admin");

        /*
            This transaction is not signed before it's taking place
            preferable a multi sign wallet will be better
         */
        payable (msg.sender).transfer(amount);
    }
}