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

export default function GraficoTendenciaRisco({
  dados,
}: {
  dados: any[];
}) {

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">

        Tendência de Riscos

      </h2>

      <div
        style={{
          width: "100%",
          height: 350,
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

              dataKey="critical"

              name="Crítico"

              stroke="#ef4444"

              strokeWidth={3}

            />

            <Line

              type="monotone"

              dataKey="high"

              name="Alto"

              stroke="#f97316"

              strokeWidth={3}

            />

            <Line

              type="monotone"

              dataKey="medium"

              name="Médio"

              stroke="#eab308"

              strokeWidth={3}

            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}