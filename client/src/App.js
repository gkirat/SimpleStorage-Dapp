import { useState, useEffect } from "react";
import SimpleStorage from "./contracts/simpleStorage.json";
import Web3 from "web3";
import "./App.css";

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  // const [inputText, setInputText] = useState('0');
  const [acc,setAcc] = useState([])
  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    const template = async () => {
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[networkId];
      const contract = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork.address
      );

      setState({
        web3: web3,
        contract: contract,
      });
    };

    provider && template();
  }, []);

  const getAccounts = async () => {
    const { web3 } = state;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts); 
    setAcc(accounts)
  };
  

  const writeSM = async () => {
    const value = document.querySelector("#data").value;
    const { contract } = state;
    const write = await contract.methods
      .setter(value)
      .send({ from: "0x7b24c30D5BB4BaeA11F96775fB21E39D76e895fc" });

    console.log(write);
  };

  // useEffect(()=>{
  //   const { contract } = state;
  //   const readSM = async ()=>{
  //     const read = await contract.methods.getter().call();
  //     // setInputText(read);
  //     console.log(read);
  //   };
  //   readSM();
  // },[state])

  const readSM = async ()=>{
      const { contract } = state;
      const read = await contract.methods.getter().call();
      // setInputText(read);
      console.log(read);
    };
  

  return (
    <div className="App">
      <h1>Hello world</h1>
      <button onClick={getAccounts}>Get accounts</button>
      <button onClick={writeSM}>Set Value</button>
      {/* <button onClick={readSM}>Get Value</button> */}
      <button onClick={readSM}>Get Value</button>
      <br></br>
      <br></br>
      <input type="number" placeholder="Enter your value" id="data"></input>
      {/* <h2>This is the value : {inputText}</h2> */}
      <p>these are the accounts
        {acc.map((account)=>{
          return (
          <li  key={Math.random()}>{account}</li>
          )
        })}
      </p>
    </div>
  );
}

export default App;
