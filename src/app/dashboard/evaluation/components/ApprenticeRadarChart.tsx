"use client";

import {

  Radar,

  RadarChart,

  PolarGrid,

  PolarAngleAxis,

  PolarRadiusAxis,

  ResponsiveContainer,

} from "recharts";

interface Props {

  evaluation: any;

}

export default function ApprenticeRadarChart({

  evaluation,

}: Props) {

  if (!evaluation) return null;

  const data = [

    {

      subject: "Comunicação",

      value: evaluation.communication,

    },

    {

      subject: "Comportamento",

      value: evaluation.behavior,

    },

    {

      subject: "Frequência",

      value: evaluation.attendance,

    },

    {

      subject: "Desempenho",

      value: evaluation.performance,

    },

  ];

  return (

    <div className="bg-gray-50 rounded-xl p-5 mb-6">

      <h3 className="font-bold mb-4">

        Perfil Pedagógico

      </h3>

      <ResponsiveContainer

        width="100%"

        height={300}

      >

        <RadarChart data={data}>

          <PolarGrid />

          <PolarAngleAxis

            dataKey="subject"

          />

          <PolarRadiusAxis

            domain={[0,10]}

          />

          <Radar

            dataKey="value"

            stroke="#2563eb"

            fill="#3b82f6"

            fillOpacity={0.5}

          />

        </RadarChart>

      </ResponsiveContainer>

    </div>

  );

}