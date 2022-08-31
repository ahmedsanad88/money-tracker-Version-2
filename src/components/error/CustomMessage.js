import React from "react";
import "./CustomMessage.css";

const CustomMessage = ({ message, isShown, isSuccess }) => {
  return (
    <div
      className={`error__container ${isShown ? "active" : ""} ${
        !isShown ? "show__message" : ""
      } ${isSuccess ? "success" : "failed"}`}
    >
      <div className="error__content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default CustomMessage;
