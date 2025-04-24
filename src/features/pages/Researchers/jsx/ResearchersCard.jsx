import React from "react";
import "../style/researchers.css";

const ResearchersCard = ({ investigador }) => {
  if (!investigador) return null;

  return (
    <main className="background-container">
      <div className="researcher-card">
        <div className="researcher-data-header">
          <h3>Detalles del Investigador</h3>
          <button onClick={onclose}>X</button>
        </div>
        <section className="about-researcher">
          <img src="src\assets\images\PERFIL-VACIO.png" alt="empty-photo"></img>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
            omnis modi sit ratione, pariatur non quibusdam rem cumque est
            architecto, iusto facere eaque inventore voluptatem.
          </p>
        </section>
        <section className="researcher-info">
          <p>
            <strong>ID:</strong> {investigador.idinvestigadores}
          </p>
          <p>
            <strong>Nombre:</strong> {investigador.nombre}
          </p>
          <p>
            <strong>Email:</strong> {investigador.email}
          </p>
          <p>
            <strong>Puesto:</strong> {investigador.puesto}
          </p>
          <p>
            <strong>Area:</strong>
            {investigador.area}
          </p>
        </section>
      </div>
    </main>
  );
};

export default ResearchersCard;
