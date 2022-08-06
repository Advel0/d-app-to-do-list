// ethers.BigNumber.from(task[1]).toNumber()
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { textAlign } from '@mui/system';

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

    function Item(props){
        return(
            <Box
                sx={{
                    bgcolor: 'white',
                    width: '300px',
                    borderRadius: 1.5,
                    p: 0.5,
                    m: 0.5,
                    border: '1px solid',
                    borderColor: 'grey.300'
                }}
            >
                props.title | <span onClick={()=>completeTask(contractWithSigner, props.id)}>Done</span> <span onClick={()=>removeTask(contractWithSigner, props.id)}>Del</span>
            </Box>
        )
    }


    return (
        <Box sx={{ 
            display: 'grid', 
            gridTemplateRows: 'repeat(3, 1fr)', 
            justifyContent: 'center', 
            }}>
            {
                tasks.map(
                    task => 
                    <Item title={task[0]} id={task[1]}/>
                    )
            }
        </Box>
    )
    
    
  }

export const generateAddTaskInterface = (provider, newTaskTitle, contractWithSigner)=> {
    return  <div>
                <span style={{marginRight:'5px' }}>
                    <TextField ref={newTaskTitle} id="outlined-basic" label="Outlined" variant="outlined" placeholder='enter task'
                    
                    inputProps={{
                        style: {
                        fontSize: '14px',
                        },
                    }}
                    />
                </span>
                {generateButton('add task', 
                ()=>{
                    const signer = provider.getSigner();
                    addTask( contractWithSigner, newTaskTitle.current.value);
                    newTaskTitle.current.value = '';
                    }, '53.13px'
                )}
            </div>
}

export const generateButton = (text, func, height) =>{
    return <Button variant="outlined" onClick={func}
            sx={{height: height}}>
                {text}
            </Button>
}