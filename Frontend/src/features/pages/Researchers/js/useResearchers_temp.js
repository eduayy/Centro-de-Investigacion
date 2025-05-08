import { useEffect, useState } from "react";
import * as api from "./apiResearchers_temp.js";

export const useResearchers = () => {
  const [investigadores, setInvestigadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingInvestigador, setEditingInvestigador] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [options, setOptions] = useState({ nivelEdu: [], areas: [] });
  const [selectedResearcher, setSelectedResearcher] = useState(null);

  const initialInvestigadorState = {
    nombre: "",
    email: "",
    puesto: "Investigador",
    idniveledu: "",
    idarea: "",
  };

  const [newInvestigador, setNewInvestigador] = useState({
    initialInvestigadorState,
    lineas: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.fetchInitialData();
        console.log(data);
        if (!data.lineas) {
          console.warn("La API no devolvió líneas de investigación");
          data.lineas = [];
        }
        const investigadoresConLineas = data.investigadores.map(
          (investigador) => {
            const lineasIds = investigador.lineas || [];
            const nombresLineas = lineasIds
              .map((id) => {
                const linea = data.lineas.find((l) => l.idlinea === id);
                return linea ? linea.nombrelinea : null;
              })
              .filter(Boolean);

            return {
              ...investigador,
              lineasNombres: nombresLineas.join(", ") || "No especificado",
            };
          }
        );
        setInvestigadores(investigadoresConLineas);
        setOptions({
          nivelesEdu: data.nivelEdu,
          areas: data.areas,
          lineas: data.lineas,
        });
      } catch (err) {
        setError(`Error loading data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const { nombre, email, puesto, idniveledu, idarea } = newInvestigador;

    if (!nombre || !email || !puesto || !idniveledu || !idarea) {
      setError("Please complete the missing fields.");
      return;
    }

    try {
      const nuevo = await api.addInvestigador({
        ...newInvestigador,
        idniveledu: Number(idniveledu),
        idarea: Number(idarea),
      });
      setInvestigadores((prev) => [...prev, nuevo]);
      setNewInvestigador(initialInvestigadorState);
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      setError(`Register error: ${err.response?.data?.detail || err.message}`);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const actualizado = await api.updateInvestigador({
        ...editingInvestigador,
        idniveledu: Number(editingInvestigador.idniveledu),
        idarea: Number(editingInvestigador.idarea),
      });

      setInvestigadores((prev) =>
        prev.map((i) =>
          i.idinvestigadores === actualizado.idinvestigadores ? actualizado : i
        )
      );
      setEditingInvestigador(null);
      setError(null);
    } catch (err) {
      setError(`Update error: ${err.response?.data?.detail || err.message}`);
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
      setError(`Delete error: ${err.response?.data?.detail || err.message}`);
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
    selectedResearcher,
    setSelectedResearcher,
  };
};
