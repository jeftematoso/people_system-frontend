"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function PedagogicalRisksPage() {

  const [

    risks,

    setRisks,

  ] = useState<any[]>([]);

  useEffect(() => {

    async function loadRisks() {

      try {

        const res =
          await api.get(
            "/pedagogical-dashboard/risks"
          );

          console.log(
            "PEDAGOGICAL RISKS:",
            res.data
          );

        setRisks(
          res.data
        );

      } catch (error) {

        console.error(
          error
        );

      }

    }

    loadRisks();

  }, []);

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">

        Riscos Pedagógicos

      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">

                Aprendiz

              </th>

              <th className="p-3 text-left">

                Risco

              </th>

              <th className="p-3 text-left">

                Motivo

              </th>

            </tr>

          </thead>

        <tbody>

        {

            risks.length === 0

            ? (

                <tr>

                <td
                    colSpan={3}
                    className="p-6 text-center text-gray-500"
                >

                    Nenhum risco pedagógico encontrado

                </td>

                </tr>

            )

            : (

                risks.map(

                (risk, index) => (

                    <tr
                    key={index}
                    className="border-b"
                    >

                    <td className="p-3">

                        {risk.name}

                    </td>

                    <td className="p-3">

                        {risk.level}

                    </td>

                    <td className="p-3">

                        {risk.reason}

                    </td>

                    </tr>

                )

                )

            )

        }

        </tbody>

        </table>

      </div>

    </div>

  );

}