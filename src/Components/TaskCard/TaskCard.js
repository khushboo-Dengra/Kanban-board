import React from "react";
import "./taskCard.scss";

export default function TaskCard(props) {
  return (
    <div
      className="task-card"
      draggable="true"
      id={props.taskId}
      onDragStart={props.onDragStart}
    >
      {props.title}
    </div>
  );
}
