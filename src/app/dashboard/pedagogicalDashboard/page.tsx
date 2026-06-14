"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function PedagogicalDashboardPage() {

const [summary, setSummary] =
useState<any>(null);

const [ranking, setRanking] =
useState<any[]>([]);

const [risks, setRisks] =
useState<any[]>([]);

async function loadData() {


try {

  const [
    summaryRes,
    rankingRes,
    risksRes,
  ] = await Promise.all([

    api.get(
      "/pedagogical-dashboard"
    ),

    api.get(
      "/pedagogical-dashboard/ranking"
    ),

    api.get(
      "/pedagogical-dashboard/risks"
    ),

  ]);

  setSummary(
    summaryRes.data
  );

  setRanking(
    rankingRes.data
  );

  setRisks(
    risksRes.data
  );

} catch (error) {

  console.error(error);

}


}

useEffect(() => {


loadData();


}, []);

return (


<div className="p-8">

  <h1 className="text-4xl font-bold mb-8">

    Dashboard Pedagógico

  </h1>

  {summary && (

    <div className="grid md:grid-cols-5 gap-4 mb-10">

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-gray-500 text-sm">

          Turmas

        </h2>

        <p className="text-3xl font-bold">

          {
            summary.totalClassrooms
          }

        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-gray-500 text-sm">

          Matrículas

        </h2>

        <p className="text-3xl font-bold">

          {
            summary.totalEnrollments
          }

        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-gray-500 text-sm">

          Aulas

        </h2>

        <p className="text-3xl font-bold">

          {
            summary.totalLessons
          }

        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-gray-500 text-sm">

          Avaliações

        </h2>

        <p className="text-3xl font-bold">

          {
            summary.totalEvaluations
          }

        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-gray-500 text-sm">

          Observações

        </h2>

        <p className="text-3xl font-bold">

          {
            summary.totalPedagogicalNotes
          }

        </p>

      </div>

    </div>

  )}

  <div className="grid lg:grid-cols-2 gap-8">

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">

        Ranking Pedagógico

      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left pb-4">

              Aprendiz

            </th>

            <th className="text-left pb-4">

              Média

            </th>

          </tr>

        </thead>

        <tbody>

          {ranking.map(
            (item, index) => (

              <tr
                key={index}
                className="border-b"
              >

                <td className="py-4">

                  {
                    item.apprentice
                  }

                </td>

                <td className="py-4">

                  {
                    item.average
                  }

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">

        Alunos em Risco

      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left pb-4">

              Aprendiz

            </th>

            <th className="text-left pb-4">

              Comunicação

            </th>

            <th className="text-left pb-4">

              Comportamento

            </th>

            <th className="text-left pb-4">

              Frequência

            </th>

            <th className="text-left pb-4">

              Desempenho

            </th>

          </tr>

        </thead>

        <tbody>

          {risks.map(
            (item, index) => (

              <tr
                key={index}
                className="border-b"
              >

                <td className="py-4">

                  {
                    item.apprentice
                  }

                </td>

                <td className="py-4">

                  {
                    item.communication
                  }

                </td>

                <td className="py-4">

                  {
                    item.behavior
                  }

                </td>

                <td className="py-4">

                  {
                    item.attendance
                  }

                </td>

                <td className="py-4">

                  {
                    item.performance
                  }

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  </div>

</div>


);

}
