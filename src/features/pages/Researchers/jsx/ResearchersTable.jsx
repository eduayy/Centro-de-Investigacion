import React from "react";

const ResearchersTable = ({ investigadores, options, onEdit, onDelete }) => (
  <div className="table-container">
    <table className="investigadores-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Puesto</th>
          {/* <th>Nivel Educativo</th> */}
          <th>Área</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {investigadores.map((i) => (
          <tr key={i.idinvestigadores}>
            <td>{i.idinvestigadores}</td>
            <td>{i.nombre}</td>
            <td>{i.email}</td>
            <td>{i.puesto}</td>
            {/* <td>
              {options.nivelesEdu.find((n) => n.idniveledu === i.idniveledu)
                ?.nombrenivel || "-"}
            </td> */}
            <td>
              {options.areas.find((a) => a.idarea === i.idarea)?.nombrearea ||
                "-"}
            </td>
            <td>
              <button className="btn-edit" onClick={() => onEdit(i)}>
                Editar
              </button>
              <button
                className="btn-delete"
                onClick={() => onDelete(i.idinvestigadores)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ResearchersTable;
