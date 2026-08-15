"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  history: {
    lesson: string;
    average: number;
  }[];
}

export default function ClassEvolutionChart({
  history,
}: Props) {

  if (!history?.length) return null;

  return (

    <div className="bg-white rounded-2xl shadow p-6 mb-8">

      <h2 className="text-2xl font-bold mb-6">

        Evolução da Turma

      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={history}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="lesson" />

          <YAxis domain={[0, 10]} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="average"
            stroke="#2563eb"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}