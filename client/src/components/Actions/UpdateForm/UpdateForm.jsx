import React, { useState } from "react";
import "./UpdateForm.css";

function UpdateForm({ user: { _id, name, cash, credit } }) {
  const [mode, setMode] = useState("deposit");

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  return (
    <div className="UpdateForm">
      <h2>{name}</h2>
      <h4>Cash</h4>
      <span>{cash}</span>
      <h4>Credit</h4>
      <span>{credit}</span>
      <select name="mode" id="mode" value={mode} onChange={handleModeChange}>
        <option value="deposit">Deposit</option>
        <option value="withdraw">Withdraw</option>
        <option value="credit">Credit</option>
        <option value="transfer">Transfer</option>
      </select>
    </div>
  );
}

export default UpdateForm;
