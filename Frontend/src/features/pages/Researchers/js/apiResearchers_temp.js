import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

export const fetchInitialData = async () => {
  const [investigadoresRes, nivelEdu, areasRes, lineasRes] = await Promise.all([
    axios.get(`${BASE_URL}investigadores-api/`, { withCredentials: true }),
    axios.get(`${BASE_URL}nivel-edu-api/`),
    axios.get(`${BASE_URL}areas-api/`, { withCredentials: true }),
    axios.get(`${BASE_URL}detlineas-api/`, { withCredentials: true }),
  ]);

  return {
    investigadores: investigadoresRes.data,
    nivel: nivelEdu.data,
    areas: areasRes.data,
    lineas: lineasRes.data,
  };
};

export const addInvestigador = async (data) => {
  const res = await axios.post(`${BASE_URL}investigadores-api/`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const updateInvestigador = async (data) => {
  const res = await axios.put(
    `${BASE_URL}investigadores-api/${data.idinvestigadores}/`,
    data,
    { withCredentials: true }
  );
  return res.data;
};

export const deleteInvestigador = async (id) => {
  await axios.delete(`${BASE_URL}investigadores-api/${id}/`, {
    withCredentials: true,
  });
};
