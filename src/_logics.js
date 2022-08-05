// ethers.BigNumber.from(task[1]).toNumber()
const{ ethers } = require('ethers');

export const loadTasks = async (contract)=>{
    const loadedTasks = await contract.getTasks();
    return loadedTasks;
}


export const addTask = async (contract, title) =>{
    const addTransaction = contract.addTask(title);
}

export const removeTask = async (contract, id) =>{
    contract.removeTask(id, -1);    
}

export const completeTask = async (contract, id) =>{
    contract.removeTask(id, 1);
}


export const formatTasks = (tasks, contractWithSigner)=>{
    return tasks.map(
        task => 
        <h4>
            {task[0]} | <span onClick={()=>completeTask(contractWithSigner, task[1])}>Done</span> <span onClick={()=>removeTask(contractWithSigner, task[1])}>Del</span>
        </h4>)
  }

export const generateAddTaskInterface = (provider, newTaskTitle, contractWithSigner)=> {
    return  <div>
                <input ref={newTaskTitle} placeholder='enter task'/> 
                <button onClick={()=>{
                    const signer = provider.getSigner();
                    addTask( contractWithSigner, newTaskTitle.current.value);
                    newTaskTitle.current.value = '';
                    }}>add task
                </button>
            </div>
}