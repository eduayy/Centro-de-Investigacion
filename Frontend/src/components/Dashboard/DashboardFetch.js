import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

export const getResearcherInfo = async () => {
  try {
    const [LineRes, ProyectRes, StudentRes, EventRes, ArticleRes] =
      await Promise.all([
        axios.get(`${BASE_URL}detlineas-api/`, { withCredentials: true }),
        axios.get(`${BASE_URL}detproy-api/`, { withCredentials: true }),
        axios.get(`${BASE_URL}estudiantes-api/`, { withCredentials: true }),
        axios.get(`${BASE_URL}deteventos-api/`, { withCredentials: true }),
        axios.get(`${BASE_URL}detart-api/`, { withCredentials: true }),
      ]);
    return {
      proyects: ProyectRes.data.count || ProyectRes.data.length,
      lines: LineRes.data.count || LineRes.data.length,
      articles: ArticleRes.data.count || ArticleRes.data.length,
      students: StudentRes.data.count || StudentRes.data.length,
      events: EventRes.data.count || EventRes.data.length,
    };
  } catch (error) {
    console.error(
      "Error obtaining data:",
      error.response?.config?.url || error
    );
    throw new Error("Load failed.");
  }
};
