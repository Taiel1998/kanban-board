import React, { useState } from "react";
import "../../styles/TaskModal.css";

interface TaskModalProps {
  onClose: () => void;
  onSubmit: (description: string, column: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose, onSubmit }) => {
  const [description, setDescription] = useState("");
  const [column, setColumn] = useState("todo"); // Default value

  const handleSubmit = () => {
    // Verifica si el campo de descripción está vacío
    if (description.trim() === "") {
      // Si está vacío, puede mostrar una alerta y salir de la función
      alert("El campo de descripción no puede estar vacío");
      return;
    }
    onSubmit(description, column);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <label>
          Descripción:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Columna:
          <select value={column} onChange={(e) => setColumn(e.target.value)}>
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>
        <div className="button-center">
          <button onClick={handleSubmit}>Agregar</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
