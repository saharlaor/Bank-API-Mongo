import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import "./UpdateForm.css";

function UpdateForm({ user: { _id, name, cash, credit } }) {
  const [mode, setMode] = useState("deposit");
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [transferId, setTransferId] = useState("");
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        const { data } = await api.get(`/users/`);
        setResults(data);
        console.log("data", data);
      } catch (err) {
        setResults([]);
        console.log(err);
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleModeChange = (e) => {
    setMode(e.target.value);
    setAmount(0);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTransferIdChange = (e) => {
    console.log("e.target.value", /^[0-9a-f]{0,24}$/.test(e.target.value));
    /^[0-9a-f]{0,24}$/i.test(e.target.value) && setTransferId(e.target.value);
  };

  const handleDepositClick = async (e) => {
    e.preventDefault();
    if (amount < 0) return setErrorMessage("Invalid Amount");
    await api.put(`/users/deposit/${_id}`, { amount: parseInt(amount) });
    navigate("/users");
  };

  const handleWithdrawClick = async (e) => {
    e.preventDefault();
    if (amount < 0 || amount > cash + credit)
      return setErrorMessage("Invalid Amount");
    await api.put(`/users/withdraw/${_id}`, { amount: parseInt(amount) });
    navigate("/users");
  };

  const handleCreditClick = async (e) => {
    e.preventDefault();
    if (amount < Math.max(0, cash * -1))
      return setErrorMessage("Invalid Amount");
    await api.put(`/users/credit/${_id}`, { amount: parseInt(amount) });
    navigate("/users");
  };

  const handleTransferClick = async (e) => {
    e.preventDefault();
    try {
      if (amount < 0 || amount > cash + credit)
        return setErrorMessage("Invalid Amount");
      if (transferId.length !== 24) return setErrorMessage("Invalid Id");
      await api.put(`/users/transfer/`, {
        fromID: _id,
        toID: transferId,
        amount: parseInt(amount),
      });
      navigate("/users");
    } catch (err) {
      console.dir("err", err);
      setErrorMessage(err.message);
    }
  };

  const generateForm = () => {
    switch (mode) {
      case "deposit":
        return (
          <>
            <label htmlFor="amount" autoFocus>
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              onChange={handleAmountChange}
              min={0}
            />
            <button onClick={handleDepositClick}>Deposit</button>
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
              onChange={handleAmountChange}
              min={0}
              max={cash + credit}
            />
            <button onClick={handleWithdrawClick}>Withdraw</button>
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
              onChange={handleAmountChange}
              min={Math.max(0, cash * -1)}
              max={cash + credit}
            />
            <button onClick={handleCreditClick}>Set Credit</button>
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
              onChange={handleAmountChange}
              min={Math.max(0, cash * -1)}
              max={cash + credit}
            />
            <label htmlFor="id" autoFocus>
              ID:
            </label>
            <select
              name="id"
              id="id"
              maxLength={24}
              value={transferId}
              onChange={handleTransferIdChange}>
              <option value="" disabled>
                Pick user to transfer to
              </option>
              {results &&
                results
                  .filter((item) => item._id !== _id)
                  .map((res) => (
                    <option key={res._id} value={res._id}>
                      {res.name}
                    </option>
                  ))}
            </select>
            <button onClick={handleTransferClick}>Transfer</button>
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
      <div className="error-message">{errorMessage}</div>
    </div>
  );
}

export default UpdateForm;
