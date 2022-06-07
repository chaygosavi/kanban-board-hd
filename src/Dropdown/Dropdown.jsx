import React, { useEffect, useRef } from "react";
import "./Dropdown.css";

function Dropdown({ children, onClose }) {
  const dropdownRef = useRef();
  const handleClick = (event) => {
    if (dropdownRef && !dropdownRef.current?.contains(event.target) && onClose)
      onClose();
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div
      style={{ position: "absolute", top: "100%", right: "0" }}
      ref={dropdownRef}
      className="dropdown"
    >
      {children}
    </div>
  );
}

export default Dropdown;
