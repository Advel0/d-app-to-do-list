pragma solidity ^0.8.0;

contract User{
    struct Task{
        string  title;
        int  id;
    }

    address private accountAddress;

    constructor(address userAdress) {
        accountAddress = userAdress;
    }

    function getAddress() public view returns (address){
        return accountAddress;
    }

    Task[] private tasks;


    function addTask(string memory title) public {
        int newTaskId = 0;

        if ( tasks.length > 0 ){
            newTaskId = tasks[tasks.length-1].id + 1;
        }

        tasks.push(Task(title, newTaskId));

        emit newTask(title);
    }

    function removeTask(int id, int rType) public {
        int indexToRemove = -1;

        uint counter = 0;
        while( indexToRemove < 0 && counter < tasks.length){
            if(tasks[counter].id == id){
                indexToRemove = int(counter);
            }
            counter++;
        }


        if ( indexToRemove >=0  ) {
            Task memory deleted = tasks[uint(indexToRemove)];

            if ( rType == 1 || rType == -1 ){

                for (uint i = uint(indexToRemove); i < tasks.length-1; i++){
                    tasks[i] = tasks[i+1];
                }

                tasks.pop();
                if (rType == 1){
                    emit CompletedTask(deleted.title);
                } else {
                    emit RemovedTask(deleted.title);
                }
            }
        }
    }


    function getTasks() public view returns (Task[] memory){
        Task[] memory formatedTasks = new Task[](tasks.length);

        for(uint i = 0 ; i < tasks.length; i++){
            formatedTasks[i] = tasks[i]; 
        }

        return formatedTasks;
        
    }

    event newTask(string);
    event RemovedTask(string);
    event CompletedTask(string);


    
}