import React, { useState } from "react";
import "./UpdateForm.css";

function UpdateForm({ user: { _id, name, cash, credit } }) {
  const [mode, setMode] = useState("deposit");

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const generateForm = () => {
    switch (mode) {
      case "deposit":
        return (
          <>
            <label htmlFor="amount" autoFocus>
              Amount:
            </label>
            <input type="number" name="amount" id="amount" min={0} />
            <button>Deposit</button>
          </>
        );
      case "withdraw":
        return (
          <>
            <label htmlFor="amount" autoFocus>
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              min={0}
              max={cash + credit}
            />
            <button>Withdraw</button>
          </>
        );
      case "credit":
        return (
          <>
            <label htmlFor="amount" autoFocus>
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              min={Math.max(0, cash * -1)}
              max={cash + credit}
            />
            <button>Set Credit</button>
          </>
        );
      case "transfer":
        return (
          <>
            <label htmlFor="amount" autoFocus>
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              min={Math.max(0, cash * -1)}
              max={cash + credit}
            />
            <label htmlFor="id" autoFocus>
              ID:
            </label>
            <input
              type="text"
              name="id"
              id="id"
              min={Math.max(0, cash * -1)}
              max={cash + credit}
            />
            <button>Transfer</button>
          </>
        );

      default:
        break;
    }
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
      <form action="">{generateForm()}</form>
    </div>
  );
}

export default UpdateForm;
