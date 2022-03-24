pragma solidity ^0.4.25; //Neglect error

contract SimpleWallet{

    address payable public owner;
    
    //Smart contract constructor
    constructor(){
        owner = (payable)msg.sender
    }

    //Function for the contract to receive ether
    receive() external payable{}

    getContractEtherBalance() public view returns (uint){
        return address(this).balance;
    }

    withdrawFromContract(uint amount) external{
        require(this.getContractEtherBalance() >= amount, "Withdrawal failed. Please contact admin");

        /*
            This transaction is not signed before it's taking place
            preferable a multi sign wallet will be better
         */
        payable(msg.sender).transfer(amount);
    }
}