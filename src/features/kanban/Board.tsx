import React, { useState } from "react";
import Column from "./Column";
import "../../styles/Board.css"; // Importa el archivo CSS
import { v4 as uuidv4 } from "uuid";
import Toolbar from "./Toolbar";
import TaskModal from "./TaskModal";

interface Task {
  id: string;
  description: string;
}

interface TaskList {
  [key: string]: Task[];
}

enum ColumnID {
  ToDo = 'todo',
  InProgress = 'inProgress',
  Done = 'done',
}

enum ColumnTitle {
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Done = 'Done',
}

const initialTasks: TaskList = {
  todo: [
    { id: uuidv4(), description: "Limpiar la heladera" },
    { id: uuidv4(), description: "Secar los platos" },
    { id: uuidv4(), description: "Secar la ropa" },
  ],
  inProgress: [
    { id: uuidv4(), description: "Sacar la basura" },
    { id: uuidv4(), description: "Lavar los platos" },
  ],
  done: [
    { id: uuidv4(), description: "Hacer la cama" },
    { id: uuidv4(), description: "Lavar la ropa" },
  ],
};

const Board: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setModalOpen] = useState(false);

  const onDrop = (evt: any, columnID: string) => {
    evt.preventDefault();
    const itemID = evt.dataTransfer.getData("itemID");
    for(let column in tasks) {
      const index = tasks[column].findIndex((task) => task.id === itemID);
      if(index !== -1) {
        // obtiene la tarea y la columna
        const task = tasks[column][index];

        // Crea copias de los arrays
        const newTasks = {...tasks};
        newTasks[column] = tasks[column].slice();

        // elimina/agrega la tarea.
        newTasks[column].splice(index, 1);
        newTasks[columnID] = [...newTasks[columnID], task];

        // Actualiza newTasks con las nuevas copias de los arrays.
        setTasks(newTasks);
        break;        
      }
    }
  };

  const handleAddTask = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmitTask = (description: string, column: string) => {
    const newTask = { id: uuidv4(), description };
    setTasks(prevTasks => {
      const newTasks = { ...prevTasks, [column]: [...prevTasks[column], newTask] };
      return newTasks;
    });
  };

  return (
  <>
    <Toolbar handleAddTask={handleAddTask} />
    <div className="board-container">
      <Column title={ColumnTitle.ToDo} tasks={tasks.todo} onDrop={onDrop} columnID={ColumnID.ToDo} />
      <Column title={ColumnTitle.InProgress} tasks={tasks.inProgress} onDrop={onDrop} columnID={ColumnID.InProgress} />
      <Column title={ColumnTitle.Done} tasks={tasks.done} onDrop={onDrop} columnID={ColumnID.Done} />
    </div>
    {isModalOpen && <TaskModal onClose={handleCloseModal} onSubmit={handleSubmitTask} />}
  </>
  );
  
};

export default Board;
