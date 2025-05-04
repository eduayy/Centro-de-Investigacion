import React from "react";
import Sidebar from "@/components/sidebar/sidebar.jsx";
import CareersForm from "./jsx/CareersForm";
import CareersTable from "./jsx/CareersTable";
import useCareers from "./js/useCareers";
import "./style/careers.css";

const Careers = () => {
  const {
    carreras,
    loading,
    error,
    editingCarrera,
    showAddForm,
    newCarrera,
    setShowAddForm,
    setEditingCarrera,
    setNewCarrera,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleInputChange,
  } = useCareers();

  if (loading) return <div className="loading">Cargando carreras...</div>;
  if (error) return <div className="error-message">{error}</div>;

  console.log(setNewCarrera);

  return (
    <div className="carreras-page">
      <Sidebar />
      <div className="carreras-content">
        <h2>LISTADO DE CARRERAS</h2>

        <button className="btn-add" onClick={() => setShowAddForm(true)}>
          + Nueva Carrera
        </button>

        {showAddForm && (
          <CareersForm
            title="Nueva Carrera"
            carrera={newCarrera}
            onChange={handleInputChange}
            onSubmit={handleAdd}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {editingCarrera && (
          <CareersForm
            title="Editar Carrera"
            carrera={editingCarrera}
            onChange={(e) => handleInputChange(e, true)}
            onSubmit={handleUpdate}
            onCancel={() => setEditingCarrera(null)}
          />
        )}

        <CareersTable
          carreras={carreras}
          onEdit={setEditingCarrera}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Careers;
