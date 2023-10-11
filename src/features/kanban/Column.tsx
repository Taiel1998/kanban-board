import React from "react";
import Task from "./Task";
import "../../styles/Column.css";

interface _Task {
  id: string;
  description: string;
}

interface ColumnProps {
  title: string;
  tasks: _Task[];
  onDrop: Function;
  columnID: string;
}

const startDrag = (evt: React.DragEvent<HTMLDivElement>, item: _Task) => {
  evt.dataTransfer.setData("itemID", item.id);
};

const draggingOver = (evt: React.DragEvent<HTMLDivElement>) => {
  evt.preventDefault();
};

const Column: React.FC<ColumnProps> = ({ title, tasks, onDrop, columnID }) => {
  return (
    <div
      className="column-container"
      /* @ts-ignore */
      droppable="true"
      onDragOver={(evt) => draggingOver(evt)}
      onDrop={(evt) => onDrop(evt, columnID)}
    >
      <div className="title-container">
        <h2>{title}</h2>
      </div>

      <div className="task-list">
        {tasks.map((task, index) => (
          <div className="task-wrapper" key={index}>
            <Task task={task} index={index} startDrag={startDrag} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
