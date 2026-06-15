"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function EvaluationsPage() {

  const [

    ranking,

    setRanking,

  ] = useState<any[]>([]);

  useEffect(() => {

    async function loadData() {

      try {

        const res =
          await api.get(
            "/pedagogical-dashboard/ranking"
          );

        setRanking(
          res.data
        );

      } catch (error) {

        console.error(error);

      }

    }

    loadData();

  }, []);

  const getStatus = (
    score: number
  ) => {

    if (score >= 18)
      return "Excelente";

    if (score >= 12)
      return "Bom";

    if (score >= 8)
      return "Atenção";

    return "Crítico";

  };

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">

        Avaliações Pedagógicas

      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">

                Aprendiz

              </th>

              <th className="p-3 text-left">

                Score

              </th>

              <th className="p-3 text-left">

                Status

              </th>

            </tr>

          </thead>

          <tbody>

            {

              ranking.map(

                (item) => (

                  <tr
                    key={
                      item.apprenticeId
                    }
                    className="border-b"
                  >

                    <td className="p-3">

                      {item.apprentice}

                    </td>

                    <td className="p-3">

                      {item.average}

                    </td>

                    <td className="p-3">

                      {getStatus(
                        item.average
                      )}

                    </td>

                  </tr>

                )

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}