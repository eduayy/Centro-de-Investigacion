import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/";

const initialCarreraState = {
  nombrecarrera: "",
  nombreuniversidad: "",
};

const useCareers = () => {
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCarrera, setEditingCarrera] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCarrera, setNewCarrera] = useState(initialCarreraState);

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/carreras-api/`, {
          withCredentials: true,
        });
        setCarreras(response.data || []);
      } catch (error) {
        setError(`Error al cargar carreras: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchCarreras();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/carreras-api/`,
        newCarrera,
        { withCredentials: true }
      );
      setCarreras([...carreras, response.data]);
      setNewCarrera(initialCarreraState);
      setShowAddForm(false);
      setError(null);
    } catch (error) {
      setError(`Error al crear: ${error.message}`);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}api/carreras-api/${editingCarrera.idcarreras}/`,
        editingCarrera,
        { withCredentials: true }
      );
      setCarreras(
        carreras.map((c) =>
          c.idcarreras === editingCarrera.idcarreras ? response.data : c
        )
      );
      setEditingCarrera(null);
      setError(null);
    } catch (error) {
      setError(`Error al actualizar: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta carrera?")) return;

    try {
      await axios.delete(`${API_BASE_URL}api/carreras-api/${id}/`, {
        withCredentials: true,
      });
      setCarreras(carreras.filter((c) => c.idcarreras !== id));
      setError(null);
    } catch (error) {
      setError(`Error al eliminar: ${error.message}`);
    }
  };

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingCarrera((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewCarrera((prev) => ({ ...prev, [name]: value }));
    }
  };

  return {
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
  };
};

export default useCareers;
