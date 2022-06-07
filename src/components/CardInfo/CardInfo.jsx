import React, { useEffect, useState } from "react";
import { Calendar, CheckSquare, List, Tag, Trash, Type } from "react-feather";
import Chip from "../Chip/Chip";
import Editable from "../Editable/Editable";
import Modal from "../Modal/Modal";
import "./CardInfo.css";

function CardInfo({ updateCard, onClose, card, boardId }) {
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

  const [values, setValues] = useState({ ...card });
  const [activeColor, setActiveColor] = useState("");

  useEffect(() => {
    updateCard(card.id, boardId, values);
  }, [values]);

  const { title, labels, desc, date, tasks } = card;

  const calculatepercent = () => {
    if (values.tasks?.length <= 0) return 0;

    const completed = values.tasks?.filter((item) => item.completed)?.length;

    return (completed / values.tasks?.length) * 100 + "";
  };

  const addLabel = (value, color) => {
    const index = values?.labels?.findIndex((item) => item.text === value);
    if (index > -1) return;
    const label = {
      text: value,
      color,
    };
    setValues({ ...values, labels: [...values.labels, label] });
    setActiveColor("");
  };

  const removeLabel = (text) => {
    const index = values.labels?.filter((item) => item.text !== text);

    setValues({ ...values, labels: index });
  };

  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random(),
      text: value,
      completed: false,
    };
    setValues({ ...values, tasks: [...values.tasks, task] });
  };

  const removeTask = (id) => {
    const idx = values.tasks?.findIndex((item) => item.id === id);
    if (idx < 0) return;
    const tempTasks = values.tasks?.splice(idx, 1);
    setValues({ ...values, tasks: tempTasks });
  };

  const updateTask = (id, completed) => {
    const idx = values.tasks?.findIndex((item) => item.id === id);
    if (idx < 0) return;

    const tempTasks = [...values.tasks];
    tempTasks[idx].completed = completed;
    setValues({ ...values, tasks: tempTasks });
  };

  return (
    <Modal onClose={() => onClose()}>
      <div className="cardInfo">
        <div className="cardInfo_box">
          <div className="cardInfo_box_title">
            <Type />
            Title
          </div>
          <div className="cardInfo_box_body">
            <Editable
              text={values.title}
              degfault={values.title}
              placeholder="Enter Title"
              buttonText={"Set Title"}
              onSubmit={(value) => setValues({ ...values, title: value })}
            />
          </div>
        </div>
        <div className="cardInfo_box">
          <div className="cardInfo_box_title">
            <List />
            Description
          </div>
          <div className="cardInfo_box_body">
            <Editable
              text={values.desc}
              degfault={values.desc}
              placeholder="Enter Description"
              buttonText={"Set Description"}
              onSubmit={(value) => setValues({ ...values, desc: value })}
            />
          </div>
        </div>
        <div className="cardInfo_box">
          <div className="cardInfo_box_title">
            <Calendar />
            Date
          </div>
          <div className="cardInfo_box_body">
            <input
              defaultValue={
                values.date
                  ? new Date(values.date).toISOString().substr(0, 10)
                  : ""
              }
              type="date"
              onChange={(e) => setValues({ ...values, date: e.target.value })}
            />
          </div>
        </div>
        <div className="cardInfo_box">
          <div className="cardInfo_box_title">
            <Tag />
            Labels
          </div>
          <div className="cardInfo_box_labels">
            {values.labels?.map((item, idx) => (
              <Chip
                key={idx}
                close
                onClose={() => removeLabel(item.text)}
                color={item.color}
                text={item.text}
              />
            ))}
          </div>
          <div className="cardInfo_box_colors">
            {colors.map((item, idx) => (
              <li
                className={item === activeColor && "active"}
                key={idx}
                style={{ backgroundColor: item }}
                onClick={() => setActiveColor(item)}
              />
            ))}
          </div>
          <div className="cardInfo_box_body">
            <Editable
              text="Label"
              placeholder="Enter Label"
              buttonText={"Add"}
              onSubmit={(value) => addLabel(value, activeColor)}
            />
          </div>
        </div>
        <div className="cardInfo_box">
          <div className="cardInfo_box_title">
            <CheckSquare />
            Tasks
          </div>

          <div className="cardInfo_box_progress-bar">
            <div
              className="cardInfo_box_progress"
              style={{
                width: calculatepercent() + "%",
                backgroundColor: calculatepercent() === "100" && "limegreen",
              }}
            />
          </div>

          <div className="cardInfo_box_list">
            {values.tasks?.map((item) => (
              <div key={item.id} className="cardInfo_box_list_task">
                <input
                  onChange={(e) => updateTask(item.id, e.target.checked)}
                  defaultChecked={item.completed}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p>{item.text}</p>
                <Trash onClick={() => removeTask(item.id)} />
              </div>
            ))}
          </div>

          <div className="cardInfo_box_body">
            <Editable
              text="Add Task"
              placeholder="Enter Task"
              buttonText={"Add"}
              onSubmit={(value) => addTask(value)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CardInfo;
