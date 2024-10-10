import React, { useState, useEffect } from "react";

export const Todolistfetch = () => {
  const [nuevoTodo, setnuevoTodo] = useState("");
  const [todo, setTodo] = useState([]);

  // Función para obtener las tareas desde la API
  const fetchTodos = async () => {
    try {
      const response = await fetch("https://playground.4geeks.com/todo");
      if (!response.ok) {
        throw new Error("Error al obtener las tareas");
      }
      const data = await response.json();
      setTodo(data); 
    } catch (error) {
      console.log("Error al obtener tareas:", error);
    }
  };

  
  useEffect(() => {
    fetchTodos();
  }, []);

  // Función para agregar una nueva tarea
  const handleClick = async () => {
    if (nuevoTodo.trim() === "") return; // 
    const nuevaTarea = { label: nuevoTodo, done: false };

    try {
      const response = await fetch("https://playground.4geeks.com/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaTarea),
      });

      if (response.ok) {
        const data = await response.json(); // Obtener la tarea creada 
        setTodo([...todo, data]); // Agregar la nueva tarea al estado
        setnuevoTodo(""); // Limpiar el campo de entrada
      }
    } catch (error) {
      console.log("Error al agregar tarea:", error);
    }
  };

  // Función para eliminar una tarea
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const listaNueva = todo.filter((_, i) => i !== id); // Filtrar las tareas
        setTodo(listaNueva); // Actualizar el estado
      }
    } catch (error) {
      console.log("Error al eliminar tarea:", error);
    }
  };

  // Actualizar el valor de nuevoTodo al cambiar el input
  const handleChange = (event) => {
    setnuevoTodo(event.target.value);
  };

  return (
    <div className="text-center">
      <h1 className="mt-5 textecondary text-center">Agregar Tareas</h1>
      <div className="container">
        <div className="gap-2 d-flex">
          <input
            value={nuevoTodo}
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="Nueva Tarea"
          />
          <button onClick={handleClick} className="btn btn-success" type="button">
            Agregar
          </button>
        </div>
        <ul>
          {todo.map((todos, indice) => (
            <li
              key={indice}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {todos.label}{" "}
              <button
                onClick={() => deleteTodo(indice)}
                type="button"
                className="btn btn-outline-danger btn-sm"
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
