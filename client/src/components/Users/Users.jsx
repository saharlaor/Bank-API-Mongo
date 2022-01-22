import React, { useState, useEffect } from "react";
import api from "../../api/api";
import Card from "../Card/Card";
import "./Users.css";

function Users() {
  const [results, setResults] = useState(null);

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

  const generateUserCards = () => {
    return results
      ? results.map((item) => {
          return <Card key={item._id} item={item} />;
        })
      : [];
  };

  return (
    <div className="Users">
      <h2>Users</h2>
      <div className="search">{generateUserCards()}</div>
    </div>
  );
}

export default Users;
