"use client";

import {

  ResponsiveContainer,

  LineChart,

  Line,

  XAxis,

  YAxis,

  Tooltip,

  CartesianGrid,

} from "recharts";

interface Props {

  history: any[];

}

export default function ApprenticeEvolutionChart( {

  history,

}: Props) {

  if (!history.length) return null;

  const data = history

    .slice()

    .reverse()

    .map((item) => ({

      aula:

        item.lesson?.title ||

        new Date(item.evaluationDate)

          .toLocaleDateString("pt-BR"),

      media: Number(

        (

          (

            item.communication +

            item.behavior +

            item.attendance +

            item.performance

          ) / 4

        ).toFixed(1)

      ),

    }));

  return (

    <div className="bg-gray-50 rounded-xl p-5 mb-6">

      <h3 className="font-bold mb-4">

        Evolução da Média

      </h3>

      <ResponsiveContainer

        width="100%"

        height={250}

      >

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="aula" />

          <YAxis domain={[0,10]} />

          <Tooltip />

          <Line

            type="monotone"

            dataKey="media"

            stroke="#2563eb"

            strokeWidth={3}

          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}