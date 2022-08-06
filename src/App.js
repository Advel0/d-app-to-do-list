import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import React from 'react';
import { ethers } from 'ethers';
import { loadTasks, addTask, removeTask, completeTask, formatTasks, generateAddTaskInterface, generateButton } from './_logics';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function App() {
  const [tasks, setTasks] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);
  const [contractWithSigner, setContractWithSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [userContractAddress, setUserContractAddress] = useState(null);
  const [userContract, setUserContract] = useState(null);
  const [walletConnected, setWalletConnected] = useState(null);
  const [walletRegistered, setWalletRegistered] = useState(null);
  const [RegisterWalletButton, setRegisterWalletButton] = useState(null);
  const [AddTaskInterface, setAddTaskInterface ] = useState(null);
  const [TasksRepresentation, setTasksRepresentation ] = useState(formatTasks(tasks, contractWithSigner));
  const [connectButton, setConnectButton] = useState(null)
  

  const newTaskTitle = useRef(0);
  

  

  const contractAddress = '0x12eC67A330f0c2C90DFb6d9C9947B823a30B3994';

  const contractAbi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        }
      ],
      "name": "addTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "addUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTasks",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "int256",
              "name": "id",
              "type": "int256"
            }
          ],
          "internalType": "struct User.Task[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getUser",
      "outputs": [
        {
          "internalType": "contract User",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUsers",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "int256",
          "name": "id",
          "type": "int256"
        },
        {
          "internalType": "int256",
          "name": "rType",
          "type": "int256"
        }
      ],
      "name": "removeTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "userExists",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  const userContractAbi =[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAdress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "CompletedTask",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "RemovedTask",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "newTask",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        }
      ],
      "name": "addTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTasks",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "int256",
              "name": "id",
              "type": "int256"
            }
          ],
          "internalType": "struct User.Task[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "int256",
          "name": "id",
          "type": "int256"
        },
        {
          "internalType": "int256",
          "name": "rType",
          "type": "int256"
        }
      ],
      "name": "removeTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  const filter_add = (ContractAdress)=>{
    return {
      address: ContractAdress,
      topics: [
        '0xc10f9b1d8442f5f9e09eac747ec975b5da58c2c4a24c76083942558f779511f8',
      ]
      
    }
  }
  const filter_remove = (ContractAdress)=>{
    return {
      address: ContractAdress,
      topics: [
        '0xec9aa72513187457aa3b081adaf968d7a916b0f10299484844556dbb4b07431c',
      ]
      
    }
  }
  const filter_complete = (ContractAdress)=> {
    return {
      address: ContractAdress,
      topics: [
        '0xf328a35ba300fa9a588f785d3a077fdf3c34b7825a696c539cfa720caa40bfcd',
      ]
      
    }
  }

  useEffect(()=>{
    
    const newProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(newProvider);

    window.ethereum.on('accountsChanged', async (accs)=> {
      setAccounts(accs);
    })

  }, [])

  

  // Setting up main Contract
  useEffect(()=>{
    if (provider != null) {
      const newContract = new ethers.Contract(contractAddress, contractAbi, provider);
      setContract(newContract);

      const newContractWithSigner = new ethers.Contract(contractAddress, contractAbi, provider.getSigner());
      setContractWithSigner(newContractWithSigner);

      setConnectButton(generateButton("Connect", async() => await connectWallet(provider), '50px'));
    }
  }, [provider])

  useEffect( ()=>{
    
    const main = async ()=>{
      if ( await contract.userExists(accounts[0]) ){
        
        setWalletRegistered(true)
        
        const currentUserContractAddress = await contract.getUser(accounts[0]);
        setTasks(await loadTasks(new ethers.Contract(currentUserContractAddress, userContractAbi, provider)))
        setUserContractAddress(currentUserContractAddress);
      } else {
        
        if (accounts.length != 0) {
          setWalletRegistered(false);
          setAddTaskInterface(null);
        }

        setTasks([]);
      }
    }
    
    if (accounts.length != 0){
      main();

      setConnectButton(null);
    } else {
      setConnectButton(generateButton("Connect", async() => await connectWallet(provider), '50px'));
      setTasks([]);
      setAddTaskInterface(null);
      setUserContractAddress(null);
      setUserContract(null);
      setWalletRegistered(null);
    }
    
  }, [accounts]);

  useEffect( ()=> {
    if (userContractAddress != null) {
      const currentUserContract = new ethers.Contract(userContractAddress, userContractAbi, provider);
      setUserContract(currentUserContract);
    }
    
  }, [userContractAddress])

  useEffect( ()=> {
    const main = async ()=> {
      const loadedTasks = await loadTasks(userContract);
      setTasks(loadedTasks);


      provider.on(filter_add(userContractAddress), async (title)=>{
        const loadedTasks = await loadTasks(userContract);
        setTasks( loadedTasks );
      });
      provider.on(filter_remove(userContractAddress), async (title)=>{
        const loadedTasks = await loadTasks(userContract);
        setTasks( loadedTasks );
      });
      provider.on(filter_complete(userContractAddress), async (title)=>{
        const loadedTasks = await loadTasks(userContract);
        setTasks( loadedTasks );
      });

      setAddTaskInterface(
        generateAddTaskInterface(provider, newTaskTitle, contractWithSigner)
      )

    }
    if (userContract != null) {
      main()
    }

  }, [userContract])

  useEffect( ()=>{
    if (tasks.length != 0) {
      setTasksRepresentation(formatTasks(tasks, contractWithSigner));
    } else {
      setTasksRepresentation(null);
    }
  }, [tasks])

  useEffect( ()=>{
    if (walletRegistered == false ) {
      setRegisterWalletButton(generateButton('Register Wallet', registerWallet, '50px'))
    } else if (walletRegistered == true) {
      setRegisterWalletButton(null);
    }
  }, [walletRegistered])

  const connectWallet = async (provider) => {
    const currentAccounts = await provider.send('eth_requestAccounts', []);
    setAccounts(currentAccounts);
  }


  const registerWallet = async () => {
    contractWithSigner.addUser();
  }



  return (
    <Container maxWidth="sm" className='App' >
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} >
      
      <Box sx={{
          display: 'flex',
          justifyContent: 'space-around',
          p: 1,
          m: 1,
        }}>

        <Box sx={{
          bgcolor: '',
          width:'250px', 
          height: '35px', 
          alignContent: 'center', 
          fontSize: '25px',
          borderRadius: 2,
          fontFamily : 'roboto'
          }}>
        | DApp todo List | 
        </Box>

      </Box>
      <h4 style={{fontFamily: 'roboto'}}>current account : {accounts[0]}</h4>
      
      { connectButton }

      { RegisterWalletButton }
      { AddTaskInterface }
     
      <div>
        <h3 style={{fontFamily: 'roboto'}}x>tasks: </h3>

        { TasksRepresentation }
      </div>
      </Box>
    </Container>
  );
}

export default App;
