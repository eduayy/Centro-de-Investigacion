import "./Dashboard.css";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6C5CE7", "#00B894", "#FAB1A0", "#0984E3"];

const renderCustomLabel = ({ percent, name }) =>
  `${name} (${(percent * 100).toFixed(0)}%)`;

function Dashboard({ stats }) {
  const data = [
    { name: "Proyectos", value: stats.proyects },
    { name: "Líneas", value: stats.lines },
    { name: "Artículos", value: stats.articles },
    { name: "Estudiantes", value: stats.students },
  ];

  console.log(stats);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "2rem",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: "1rem", color: "#2d3436" }}
      >
        Grafica del Investigador
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            label={renderCustomLabel}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: "8px", fontSize: "0.9rem" }}
            formatter={(value) => `${value} elementos`}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            height={36}
            wrapperStyle={{ fontSize: "0.85rem" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Dashboard;
