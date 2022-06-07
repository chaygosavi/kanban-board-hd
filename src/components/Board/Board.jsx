import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";
import Dropdown from "../../Dropdown/Dropdown";
import Card from "../Card/Card";
import Editable from "../Editable/Editable";
import "./Board.css";

function Board({
  updateCard,
  board,
  removeBoard,
  addCard,
  removeCard,
  handleDragEnter,
  handleDragEnd,
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="board">
      <div className="board_top">
        <p className="board_top_title">
          {board?.title}
          <span>{board?.cards?.length}</span>
        </p>
        <div className="board_top_more">
          <MoreHorizontal onClick={() => setShowDropdown(!showDropdown)} />
          {showDropdown && (
            <Dropdown>
              <div className="board_dropdown">
                <p onClick={() => removeBoard(board?.id)}>Delete Board</p>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {board?.cards?.map((card) => (
          <Card
            handleDragEnter={handleDragEnter}
            handleDragEnd={handleDragEnd}
            key={card.id}
            card={card}
            removeCard={removeCard}
            boardId={board?.id}
            updateCard={updateCard}
          />
        ))}
        <Editable
          displayClass={"boards_cards_add"}
          text="Add Card"
          placeholder={"Enter Card Title"}
          onSubmit={(value) => addCard(value, board?.id)}
        />
      </div>
    </div>
  );
}

export default Board;
