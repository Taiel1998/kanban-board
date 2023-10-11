import React from 'react';
import '../../styles/Toolbar.css';  // Importa el archivo CSS

interface ToolbarProps {
    handleAddTask: () => void;
}
  
const Toolbar: React.FC<ToolbarProps> = ({ handleAddTask }) => {
  return (
    <div className="toolbar">
      <button onClick={handleAddTask}>Agregar Tarea</button>
    </div>
  );
};

export default Toolbar;