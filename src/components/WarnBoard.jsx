import React from "react";

export const WarnBoard = ({ message }) => {
  return (
    <div
      style={{
        padding: 20,
        backgroundColor: "lemonchiffon",
        border: "2px solid wheat",
        borderRadius: 12,
        margin: 12,
      }}
    >
      <span style={{ color: "#FABA5F", fontSize: "1.3rem" }}>{message}</span>
    </div>
  );
};
