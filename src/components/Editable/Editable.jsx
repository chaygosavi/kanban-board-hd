import React, { useState } from "react";
import { X } from "react-feather";
import "./Editable.css";

function Editable({
  buttonText,
  placeholder,
  text,
  onSubmit,
  editClass,
  displayClass,
  degfault,
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [inputValue, setInputValue] = useState(degfault|| "");
  return (
    <div className="editable">
      {showEdit ? (
        <form
          className={`editable_edit ${editClass || ""}`}
          onSubmit={(e) => {
            e.preventDefault();
            if (onSubmit && inputValue) onSubmit(inputValue);
            setShowEdit(false);
            setInputValue("");
          }}
        >
          <input
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder={placeholder || "Enter Item"}
          />
          <div className="editable_edit_footer">
            <button type="submit">{buttonText || "Add"}</button>
            <X onClick={() => setShowEdit(false)} />
          </div>
        </form>
      ) : (
        <p
          className={`editable_display ${displayClass || ""}`}
          onClick={() => setShowEdit(true)}
        >
          {text || "Add item"}
        </p>
      )}
    </div>
  );
}

export default Editable;
