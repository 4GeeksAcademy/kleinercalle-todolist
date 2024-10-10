import React from "react";
import { Todolistfetch } from "./Todolistfetch"; // Importamos el componente corregido

const Home = () => {
  return (
    <div>
      <h1>Bienvenido a la App de Tareas</h1>
      <Todolistfetch />
    </div>
  );
};

export default Home;

