import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api/api";
import CreateForm from "./CreateForm/CreateForm";
import UpdateForm from "./UpdateForm/UpdateForm";
import "./Actions.css";

function Actions() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const getUserById = async () => {
      const { id } = location.state;
      const { data } = await api.get(`/users/${id}`);
      console.log("data", data);
      setUser(data);
    };
    if (location.state) {
      getUserById();
    }
  }, [location]);

  return (
    <div className="Actions">
      {user ? <UpdateForm user={user} /> : <CreateForm />}
    </div>
  );
}

export default Actions;
