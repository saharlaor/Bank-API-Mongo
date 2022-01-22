import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

function Card({ item: { _id, name, cash, credit } }) {
  return (
    <div className="Card">
      <Link to="/actions" key={_id} state={{ id: _id }}>
        <h3>{name}</h3>
        <p>Cash: {cash}</p>
        <p>Credit: {credit}</p>
      </Link>
    </div>
  );
}

export default Card;
