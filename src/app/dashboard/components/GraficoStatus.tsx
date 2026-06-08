"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type StatusData = {
  status: string;
  total: number;
};

const CORES: Record<string, string> = {
  ACTIVE: "#22c55e",
  EXPIRED: "#eab308",
  CANCELLED: "#ef4444",

  ativo: "#22c55e",
  vencido: "#eab308",
  cancelado: "#ef4444",
};

const LABELS: Record<string, string> = {
  ACTIVE: "Ativos",
  EXPIRED: "Vencidos",
  CANCELLED: "Cancelados",

  ativo: "Ativos",
  vencido: "Vencidos",
  cancelado: "Cancelados",
};

export default function GraficoStatus({
  dados,
}: {
  dados: StatusData[];
}) {

  console.log(
    "DADOS GRAFICO:",
    dados
  );

  const dadosGrafico = dados.map((d) => ({
    ...d,
    nome: LABELS[d.status] || d.status,
  }));

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">
        Status dos Contratos
      </h2>

      <div
        className="w-full"
        style={{
          height: 400,
          minHeight: 400,
        }}
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={dadosGrafico}
              dataKey="total"
              nameKey="nome"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >

              {dadosGrafico.map((entry) => (

                <Cell
                  key={entry.status}
                  fill={
                    CORES[entry.status] ||
                    "#3b82f6"
                  }
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}