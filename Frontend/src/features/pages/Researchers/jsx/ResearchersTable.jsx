import React from "react";

const ResearchersTable = ({ investigadores, onSelect }) => (
  <div className="table-container">
    <table className="investigadores-table">
      <thead>
        <tr>
          <th>Número de Investigador (ID)</th>
          <th>Nombre del Investigador</th>
          <th>Línea del Investigador</th>
        </tr>
      </thead>
      <tbody>
        {investigadores.map((i) => (
          <tr key={i.idinvestigadores} onClick={() => onSelect(i)}>
            <td>{i.idinvestigadores}</td>
            <td>{i.nombre}</td>
            <td>{i.lineasNombres || `No especificado`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ResearchersTable;
