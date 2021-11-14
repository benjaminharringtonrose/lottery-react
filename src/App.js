import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import lottery from "./lottery";
import web3 from "./web3";

const App = () => {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [ether, setEther] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const manager = await lottery.methods.manager().call();
    await getBalance();
    await getPlayers();
    setManager(manager);
  };

  const getBalance = async () => {
    const balance = await web3.eth.getBalance(lottery.options.address);
    setBalance(balance);
  };

  const getPlayers = async () => {
    const players = await lottery.methods.getPlayers().call();
    setPlayers(players);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setMessage("Waiting on transaction success...");
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(ether, "ether"),
    });
    await getPlayers();
    await getBalance();
    setMessage("You have been entered!");
  };

  const onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    setMessage("Waiting on transaction success...");
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    await getPlayers();
    await getBalance();
    setMessage("A winner has been picked!");
  };

  return (
    <div>
      <h2>{"Lottery Contract"}</h2>
      <p>
        {`This contract is managed by ${manager}. `}
        {`There are currently ${
          players.length
        } people entered competing to win ${web3.utils.fromWei(balance)} ether.`}
      </p>
      <hr />
      <form onSubmit={onSubmit}>
        <h4>{"Want to try your luck?"}</h4>
        <div>
          <label>{"Amount of ether to enter"}</label>
          <input value={ether} onChange={(event) => setEther(event.target.value)} />
        </div>
        <button>{"Enter"}</button>
      </form>
      <hr />
      <h4>{"Ready to pick a winner?"}</h4>
      <button onClick={onClick}>{"Pick a winner!"}</button>
      <hr />
      <h1>{message}</h1>
    </div>
  );
};
export default App;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
