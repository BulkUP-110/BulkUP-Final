import React from 'react';
import "./Featured.css";
import restaurant from "./Restaurant.jpg";

export default function Featured(props) {
  return (
    <div className="restaurant-slider">
        {/* <img src={restaurant} alt="restaurant"/> */}
        <div className="screen"></div>
        <h1 className="title">RAMSEY'S BISTRO</h1>
    </div>
  );
}