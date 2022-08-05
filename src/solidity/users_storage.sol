pragma solidity ^0.8.0;

import "./user.sol";

contract users_storage{

    User[] private users;

    function addUser() public{
        if (! userExists(msg.sender) ){
           users.push(new User(msg.sender));
        }

    }


    function getUsers() public view returns (address[] memory){
        address[] memory userAdresses = new address[](users.length);
        
        for (uint i = 0; i < users.length; i++){
            User temp = users[i];
            userAdresses[i] = address(temp); //.getAddress();
        }
        return userAdresses;
    }

    function getUser(address userAddress) public view returns(User){

        User user;

        for( uint i = 0; i < users.length; i++){
            if (users[i].getAddress() == userAddress){
                user = users[i];
            }
        }

        return user;
    
    }


    function addTask(string memory title) public {
        if ( userExists(msg.sender) ){
            User user = getUser(msg.sender);
            user.addTask(title);
        } else {
            addUser();
            User user = getUser(msg.sender);
            user.addTask(title);
        }
    }

    function removeTask(int id, int rType) public {
        if ( userExists(msg.sender) ){
            User user = getUser(msg.sender);
            user.removeTask(id, rType);
        }
    }

    function getTasks() public view returns (User.Task[] memory){
        if ( userExists(msg.sender) ){
            return getUser(msg.sender).getTasks();
        } 
        return new User.Task[](0);
    }


    function userExists(address userAddress) public view returns (bool){
        for( uint i = 0; i < users.length; i++){
            if (users[i].getAddress() == userAddress){
                return true;
            }
        }
        return false;
    }


}