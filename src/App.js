import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import web3 from "./web3";
import lottery from "./lottery";

const App = () => {
  const [manager, setManager] = useState("");

  useEffect(() => {
    async function asyncCalls() {
      const manager = await lottery.methods.manager().call();
      setManager(manager);
      console.log(manager);
    }
    asyncCalls();
  }, []);

  return (
    <div>
      <h2>{"Lottery Contract"}</h2>
      <p>{`This contract is managed by ${manager}`}</p>
    </div>
  );
};
export default App;
