"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type RiskData = {
  level: string;
  total: number;
};

const CORES: Record<string, string> = {

  LOW: "#22c55e",

  MEDIUM: "#eab308",

  HIGH: "#f97316",

  CRITICAL: "#ef4444",

};

const LABELS: Record<string, string> = {

  LOW: "Baixo",

  MEDIUM: "Médio",

  HIGH: "Alto",

  CRITICAL: "Crítico",

};

export default function GraficoRisco({
  dados,
  onSelect,
}: {
  dados: any[];

  onSelect: (level: string) => void;
}) {

  const dadosGrafico = dados.map((item) => ({

    ...item,

    nome:
      LABELS[item.level] ||

      item.level,

  }));

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">

        Distribuição de Risco

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
                  key={entry.level}
                  fill={
                    CORES[entry.level] ||
                    "#3b82f6"
                  }
                />

              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}