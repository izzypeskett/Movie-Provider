import React from "react";
import networkImage from "../assets/c3po.png";

const NetworkError = () => {
  return (
    <div className="network-error">
      <div className="network-error__content">
        <h1>Sir, It’s quite possible that your server is not running</h1>
        <p>( Please make sure your server is running at localhost:5000 )</p>
      </div>
      <img
        src={networkImage}
        alt="Network error image"
        className="network-error__img"
      />
    </div>
  );
};

export default NetworkError;
