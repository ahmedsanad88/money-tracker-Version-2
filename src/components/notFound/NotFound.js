import React from "react";
import { useNavigate } from "react-router-dom";

import "./NotFound.css";
import block from "../../images/block.gif";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notFound__container">
      <div className="notFound__parent">
        <img src={block} alt="Not found" />
        <div className="notFound__content">
          <h3>404 - Not Found</h3>
          <button type="button" onClick={() => navigate("/")}>
            Take me back! 🚕
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
