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

  if (loading) return <div className="loading">Loading Researchers...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="investigadores-page">
      <Sidebar />
      <div className="investigadores-content">
        <h2>Gestión de Investigadores</h2>
        <button className="btn-add" onClick={() => setShowAddForm(true)}>
          + Nuevo Investigador
        </button>

        {showAddForm && (
          <ResearchersForm
            isEditing={false}
            formData={newInvestigador}
            options={options}
            onChange={handleInputChange}
            onCancel={() => setShowAddForm(false)}
            onSubmit={handleAdd}
          />
        )}

        {editingInvestigador && (
          <ResearchersForm
            isEditing={true}
            formData={editingInvestigador}
            options={options}
            onChange={(e) => handleInputChange(e, true)}
            onCancel={() => setEditingInvestigador(null)}
            onSubmit={handleUpdate}
          />
        )}

        <ResearchersTable
          investigadores={investigadores}
          options={options}
          onEdit={setEditingInvestigador}
          onDelete={handleDelete}
          onSelect={setSelectedResearcher}
        />

        {selectedResearcher && (
          <ResearchersCard
            investigador={selectedResearcher}
            selectedResearcher={selectedResearcher}
            onClose={() => setSelectedResearcher(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Researchers;
