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
    universidades,
    setShowAddForm,
    setEditingCarrera,
    setNewCarrera,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleInputChange,
  } = useCareers();

  if (loading) return <div className="loading-spinner">Cargando...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="careers-container">
      <Sidebar />
      <main className="careers-main">
        <header className="careers-header">
          <h1>Administración de Carreras</h1>
          <p>Gestiona las carreras universitarias registradas en el sistema</p>
        </header>

        <div className="careers-actions">
          <button
            className="primary-button"
            onClick={() => setShowAddForm(true)}
          >
            <span className="plus-icon">+</span> Agregar Carrera
          </button>
        </div>

        {showAddForm && (
          <div className="modal-overlay">
            <CareersForm
              title="Nueva Carrera"
              carrera={newCarrera}
              onChange={handleInputChange}
              onSubmit={handleAdd}
              onCancel={() => setShowAddForm(false)}
              universidades={universidades}
            />
          </div>
        )}

        {editingCarrera && (
          <div className="modal-overlay">
            <CareersForm
              title="Editar Carrera"
              carrera={editingCarrera}
              onChange={(e) => handleInputChange(e, true)}
              onSubmit={handleUpdate}
              onCancel={() => setEditingCarrera(null)}
              universidades={universidades}
            />
          </div>
        )}

        <section className="careers-data">
          <CareersTable
            carreras={carreras}
            onEdit={setEditingCarrera}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
};

export default Careers;
