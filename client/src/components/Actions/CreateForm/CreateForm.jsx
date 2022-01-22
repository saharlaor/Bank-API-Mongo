import React, { useState } from "react";
import api from "../../../api/api";
import "./CreateForm.css";

function CreateForm() {
  const [value, setValue] = useState("");

  const handleNameChange = ({ target }) => {
    setValue(target.value);
  };

  const handleCreateClick = async (e) => {
    e.preventDefault();
    await api.post("/users", { name: value });
  };

  return (
    <form action="" className="CreateForm">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={value}
        onChange={handleNameChange}
        autoFocus
      />
      <button onClick={handleCreateClick}>Create</button>
    </form>
  );
}

export default CreateForm;
