import React from "react";
import "../../styles/Task.css";

interface _Task {
  id: string;
  description: string;
}

interface TaskProps {
  task: _Task;
  index: number;
  startDrag: Function;
}

const Task: React.FC<TaskProps> = ({ task, index, startDrag }) => {
  return (
    <div
      className="task-container"
      draggable
      onDragStart={(evt) => startDrag(evt, task)}
    >
      {task.description}
    </div>
  );
};

export default Task;
