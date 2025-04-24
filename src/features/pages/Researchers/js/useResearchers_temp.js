import { useEffect, useState } from "react";
import * as api from "./apiResearchers.js";

export const useResearchers = () => {
  const [investigadores, setInvestigadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingInvestigador, setEditingInvestigador] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [options, setOptions] = useState({ nivelesEdu: [], areas: [] });

  const initialInvestigadorState = {
    nombre: "",
    email: "",
    puesto: "Investigador",
    idniveledu: "",
    idarea: "",
  };

  const [newInvestigador, setNewInvestigador] = useState(
    initialInvestigadorState
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { investigadores, nivelesEdu, areas } =
          await api.fetchInitialData();
        setInvestigadores(investigadores);
        setOptions({ nivelesEdu, areas });
      } catch (err) {
        setError(`Error al cargar datos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const nuevo = await api.addInvestigador(newInvestigador);
      setInvestigadores((prev) => [...prev, nuevo]);
      setNewInvestigador(initialInvestigadorState);
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      setError(`Error al registrar: ${err.message}`);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const actualizado = await api.updateInvestigador(editingInvestigador);
      setInvestigadores((prev) =>
        prev.map((i) =>
          i.idinvestigadores === actualizado.idinvestigadores ? actualizado : i
        )
      );
      setEditingInvestigador(null);
      setError(null);
    } catch (err) {
      setError(`Error al actualizar: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este investigador?")) return;
    try {
      await api.deleteInvestigador(id);
      setInvestigadores((prev) =>
        prev.filter((i) => i.idinvestigadores !== id)
      );
      setError(null);
    } catch (err) {
      setError(`Error al eliminar: ${err.message}`);
    }
  };

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingInvestigador((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewInvestigador((prev) => ({ ...prev, [name]: value }));
    }
  };

  return {
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
  };
};
