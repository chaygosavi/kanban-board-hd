import React from "react";
import { X } from "react-feather";
import "./Chip.css";

function Chip({ text, color, close, onClose }) {
  return (
    <div className="chip" style={{ background: color }}>
      {text}
      {close && <X onClick={() => (onClose ? onClose() : "")} />}
    </div>
  );
}

export default Chip;
