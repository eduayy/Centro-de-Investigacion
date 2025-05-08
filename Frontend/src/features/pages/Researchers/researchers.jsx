import React from "react";
import Sidebar from "@/components/sidebar/sidebar";
import ResearchersForm from "./JSX/ResearchersForm.jsx";
import ResearchersTable from "./JSX/ResearchersTable.jsx";
import ResearchersCard from "./jsx/ResearchersCard.jsx";
import { useResearchers } from "./js/useResearchers_temp.js";
import "./style/researchers.css";

const Researchers = () => {
  const {
    investigadores,
    options,
    error,
    loading,
    showAddForm,
    editingInvestigador,
    newInvestigador,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleInputChange,
    setShowAddForm,
    setEditingInvestigador,
    selectedResearcher,
    setSelectedResearcher,
  } = useResearchers();

  if (loading)
    return (
      <div className="investigadores-page">
        <Sidebar />
        <div className="investigadores-content">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Cargando investigadores...</p>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="investigadores-page">
        <Sidebar />
        <div className="investigadores-content">
          <div className="error-message">
            <i className="error-icon">⚠️</i>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="investigadores-page">
      <Sidebar />
      <div className="investigadores-content">
        <div className="investigadores-header">
          <h2>Gestión de Investigadores</h2>
          <p>Administra los investigadores en el sistema</p>
        </div>

        <button className="btn-add" onClick={() => setShowAddForm(true)}>
          <i className="icon-plus">+</i> Nuevo Investigador
        </button>
        {showAddForm && (
          <div className="modal-overlay">
            <div className="modal-container">
              <ResearchersForm
                isEditing={false}
                formData={newInvestigador}
                options={options}
                onChange={handleInputChange}
                onCancel={() => setShowAddForm(false)}
                onSubmit={handleAdd}
              />
            </div>
          </div>
        )}
        {editingInvestigador && (
          <div className="modal-overlay">
            <div className="modal-container">
              <ResearchersForm
                isEditing={true}
                formData={editingInvestigador}
                options={options}
                onChange={(e) => handleInputChange(e, true)}
                onCancel={() => setEditingInvestigador(null)}
                onSubmit={handleUpdate}
              />
            </div>
          </div>
        )}

        <div className="table-container">
          <ResearchersTable
            investigadores={investigadores}
            options={options}
            onEdit={setEditingInvestigador}
            onDelete={handleDelete}
            onSelect={setSelectedResearcher}
          />
        </div>
        {selectedResearcher && (
          <div className="modal-overlay">
            <div className="modal-container">
              <ResearchersCard
                investigador={selectedResearcher}
                onClose={() => setSelectedResearcher(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Researchers;
