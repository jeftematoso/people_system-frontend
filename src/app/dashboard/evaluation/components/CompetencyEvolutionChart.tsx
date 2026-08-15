"use client";

import {

  ResponsiveContainer,

  LineChart,

  Line,

  CartesianGrid,

  XAxis,

  YAxis,

  Tooltip,

  Legend,

} from "recharts";

interface Props {

  history: any[];

}

export default function CompetencyEvolutionChart({

  history,

}: Props) {

  if (!history?.length) return null;

  const data = history

    .slice()

    .reverse()

    .map((item) => ({

      aula:

        item.lesson?.title ||

        new Date(

          item.evaluationDate

        ).toLocaleDateString("pt-BR"),

      communication:

        item.communication,

      behavior:

        item.behavior,

      attendance:

        item.attendance,

      performance:

        item.performance,

    }));

  return (

    <div className="bg-white rounded-2xl shadow p-6 mb-8">

      <h2 className="text-2xl font-bold mb-6">

        Evolução por Competência

      </h2>

      <ResponsiveContainer

        width="100%"

        height={350}

      >

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis dataKey="aula"/>

          <YAxis domain={[0,10]}/>

          <Tooltip/>

          <Legend/>

          <Line

            dataKey="communication"

            stroke="#2563eb"

            strokeWidth={3}

          />

          <Line

            dataKey="behavior"

            stroke="#dc2626"

            strokeWidth={3}

          />

          <Line

            dataKey="attendance"

            stroke="#16a34a"

            strokeWidth={3}

          />

          <Line

            dataKey="performance"

            stroke="#f59e0b"

            strokeWidth={3}

          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}