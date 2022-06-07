import React from "react";
import "./Modal.css";

function Modal({ children, onClose }) {
  return (
    <div className="modal" onClick={() => onClose && onClose()}>
      <div
        className="modal_content custom-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
