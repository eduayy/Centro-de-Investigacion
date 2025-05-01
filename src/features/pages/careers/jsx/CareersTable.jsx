import React from "react";

const CareersTable = ({ carreras }) => {
  return (
    <div className="table-container">
      <table className="carreras-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Carrera</th>
            <th>Universidad</th>
          </tr>
        </thead>
        <tbody>
          {carreras.map((carrera) => (
            <tr key={carrera.idcarreras}>
              <td>{carrera.idcarreras}</td>
              <td>{carrera.nombrecarrera}</td>
              <td>{carrera.nombreuniversidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CareersTable;
