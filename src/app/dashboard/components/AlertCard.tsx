"use client";

import { AlertTriangle } from "lucide-react";

interface AlertCardProps {
  title: string;
  description: string;
  color: string;
}

export default function AlertCard({
  title,
  description,
  color,
}: AlertCardProps) {

  return (

    <div
      className={`rounded-3xl border-2 p-6 shadow-sm bg-white ${color}`}
    >

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center">

            <AlertTriangle className="text-red-500" />

          </div>

          <div>

            <h3 className="text-xl font-bold">
              {title}
            </h3>

            <p className="text-gray-600 mt-2">
              {description}
            </p>

          </div>

        </div>

        <button className="px-4 py-2 rounded-xl bg-white shadow hover:bg-gray-100 transition">

          Visualizar

        </button>

      </div>

    </div>

  );

}