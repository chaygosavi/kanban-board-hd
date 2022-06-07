import React, { useState } from "react";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import "./Card.css";
import Chip from "../Chip/Chip";
import Dropdown from "../../Dropdown/Dropdown";
import CardInfo from "../CardInfo/CardInfo";

function Card({
  updateCard,
  card,
  removeCard,
  boardId,
  handleDragEnter,
  handleDragEnd,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <CardInfo
          updateCard={updateCard}
          card={card}
          boardId={boardId}
          onClose={() => setShowModal(false)}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnd={() => handleDragEnd(card.id, boardId)}
        onDragEnter={() => handleDragEnter(card.id, boardId)}
        onClick={() => setShowModal(true)}
      >
        <div className="card_top">
          <div className="card_top_labels">
            {card?.labels?.map((item, idx) => (
              <Chip key={idx} text={item.text} color={item.color} />
            ))}
          </div>
          <div className="card_top_more">
            <MoreHorizontal onClick={() => setShowDropdown(!showDropdown)} />
            {showDropdown && (
              <Dropdown>
                <div className="card_dropdown">
                  <p onClick={() => removeCard(boardId, card?.id)}>
                    Delete Card
                  </p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_title">{card?.title}</div>
        <div className="card_footer">
          {card.date && (
            <p>
              <Clock />
              {card?.date}
            </p>
          )}
          {card?.tasks?.length > 0 && (
            <p>
              <CheckSquare />
              {card?.tasks?.filter((item) => item.completed).length}/
              {card?.tasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
