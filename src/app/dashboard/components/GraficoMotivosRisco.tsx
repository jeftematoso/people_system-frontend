"use client";

import {

  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,

} from "recharts";

export default function GraficoMotivosRisco({
  dados,
}: {
  dados: any[];
}) {

  return (

    <div className="bg-white rounded-xl shadow-md p-5">

      <h3 className="text-lg font-bold mb-4">

        Top Motivos de Risco

      </h3>

      <div
        style={{
          width: "100%",
          height: 350,
        }}
      >

        <ResponsiveContainer>

          <BarChart

            data={dados}

            layout="vertical"

          >

            <XAxis
              type="number"
            />

            <YAxis

              dataKey="reason"

              type="category"

            />

            <Tooltip />

            <Bar

              dataKey="total"

              fill="#ef4444"

            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}