import "./Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard({ stats }) {
  const data = [
    { name: "Proyectos", Value: stats.proyects },
    { name: "Líneas", Value: stats.lines },
    { name: "Artículos", Value: stats.articles },
    { name: "Estudiantes", Value: stats.students },
    { name: "Eventos", Value: stats.events },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard de CIATEQ</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "white" }} />
          <YAxis allowDecimals={false} />
          <Tooltip
            formatter={(value) => `${value} elementos`}
            contentStyle={{
              backgroundColor: "white",
              border: "none",
              color: "black",
              borderRadius: "5px",
            }}
          />
          <Legend />
          <Bar
            dataKey="Value"
            fill="red"
            radius={[5, 5, 0, 0]}
            activeBar={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Dashboard;
