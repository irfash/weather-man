import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import "./Notyfy.styles.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
export const Notyfy = ({ message }) => {
  const [visible, setVisible] = useState(true);
  return (
    visible && (
      <div className="notyfy">
        <span>{message}</span>
        <FontAwesomeIcon
          className="clear-btn"
          onClick={() => {
            setVisible(false);
          }}
          icon={faXmark}
        />
      </div>
    )
  );
};
