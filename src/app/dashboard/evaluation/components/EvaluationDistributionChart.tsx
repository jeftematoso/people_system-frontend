"use client";

import {

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  ResponsiveContainer,

  Cell,

} from "recharts";

interface Props {

  excellent: number;

  good: number;

  warning: number;

  critical: number;

}

export default function EvaluationDistributionChart({

  excellent,

  good,

  warning,

  critical,

}: Props) {

  const data = [

    {

      name: "Excelente",

      value: excellent,

      color: "#22c55e",

    },

    {

      name: "Bom",

      value: good,

      color: "#3b82f6",

    },

    {

      name: "Atenção",

      value: warning,

      color: "#f59e0b",

    },

    {

      name: "Crítico",

      value: critical,

      color: "#ef4444",

    },

  ];

  return (

    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">

        Distribuição da Turma

      </h2>

      <ResponsiveContainer

        width="100%"

        height={300}

      >

        <BarChart data={data}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="value">

            {data.map((item) => (

              <Cell

                key={item.name}

                fill={item.color}

              />

            ))}

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}