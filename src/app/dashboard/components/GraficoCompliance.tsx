"use client";

import {

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  ResponsiveContainer,

} from "recharts";

export default function GraficoCompliance({
  dados,
}: {
  dados: any[];
}) {

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">

        Top Empresas Compliance

      </h2>

      <div
        style={{
          height: 400,
        }}
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={dados}
          >

            <XAxis
              dataKey="company"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="score"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}