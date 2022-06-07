import React, { useEffect, useState } from "react";
import Board from "./components/Board/Board";
import Editable from "./components/Editable/Editable";
import "./App.css";

function App() {
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("kanban")) || []);

  useEffect(() => {
    localStorage.setItem("kanban", JSON.stringify(boards));
  }, [boards]);

  const [target, setTarget] = useState({
    cid: "",
    bid: "",
  });

  const addBoard = (title) => {
    setBoards([
      ...boards,
      {
        id: Date.now() + Math.random(),
        title,
        cards: [],
      },
    ]);
  };

  const removeBoard = (bid) => {
    // const tempBoards = [...boards];
    // const index = tempBoards.findIndex((board) => board.id === bid);

    // tempBoards.splice(index, 1);
    const tempBoards = boards.filter((board) => board.id !== bid);
    setBoards(tempBoards);
  };

  const addCard = (title, bid) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: "",
    };

    const index = boards.findIndex((board) => board.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  };

  const removeCard = (bid, cid) => {
    const bIndex = boards.findIndex((board) => board.id === bid);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((card) => card.id === cid);
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards.splice(cIndex, 1);
    setBoards(tempBoards);
  };

  const handleDragEnter = (cid, bid) => {
    setTarget({
      cid,
      bid,
    });
  };
  const handleDragEnd = (cid, bid) => {
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex;

    s_bIndex = boards.findIndex((item) => item.id === bid);
    if (s_bIndex < 0) return;
    s_cIndex = boards[s_bIndex].cards?.findIndex((item) => item.id === cid);
    if (s_cIndex < 0) return;

    t_bIndex = boards.findIndex((item) => item.id === target.bid);
    if (t_bIndex < 0) return;
    t_cIndex = boards[t_bIndex].cards?.findIndex(
      (item) => item.id === target.cid
    );
    if (t_cIndex < 0) return;

    const tempBoards = [...boards];
    const tempCard = tempBoards[s_bIndex].cards[s_cIndex];

    tempBoards[s_bIndex].cards.splice(s_cIndex, 1);
    tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCard);

    setBoards(tempBoards);
  };

  const updateCard = (cid, bid, card) => {
    const bIndex = boards.findIndex((board) => board.id === bid);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((card) => card.id === cid);
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards[cIndex] = card;
    setBoards(tempBoards);
  };

  return (
    <div className="app">
      <div className="app_navbar">
        <h2>Kanban</h2>
      </div>

      <div className="app_outer">
        <div className="app_boards">
          {boards.map((board) => (
            <Board
              handleDragEnter={handleDragEnter}
              handleDragEnd={handleDragEnd}
              addCard={addCard}
              removeCard={removeCard}
              key={board.id}
              board={board}
              removeBoard={removeBoard}
              updateCard={updateCard}
            />
          ))}
          <div className="app_boards_board">
            <Editable
              displayClass={"app_boards_board_add"}
              text={"Add Board"}
              placeholder="Enter board title"
              onSubmit={(value) => addBoard(value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
