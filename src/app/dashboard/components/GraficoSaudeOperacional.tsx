"use client";

import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,

} from "recharts";

export default function GraficoSaudeOperacional({
  dados,
}: {
  dados: any[];
}) {

  return (

    <div className="bg-white rounded-xl shadow-md p-5 mb-6">

      <h2 className="text-xl font-bold mb-4">

        Evolução da Saúde Operacional

      </h2>

      <div
        style={{
          width: "100%",
          height: 300,
        }}
      >

        <ResponsiveContainer>

          <LineChart
            data={dados}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
            />

            <YAxis />

            <Tooltip />

            <Line

              type="monotone"

              dataKey="health"

              stroke="#22c55e"

              strokeWidth={3}

            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}