"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function AttendancePage() {

  const [
    schoolAttendance,
    setSchoolAttendance
  ] = useState<any[]>([]);

  useEffect(() => {

    async function loadData() {

      try {

        const response =
          await api.get(
            "/pedagogical-dashboard/attendance"
          );

        console.log(
           "PRIMEIRO ATTENDANCE:",
           JSON.stringify(
             response.data[0],
              null,
             2
           )
        );

        setSchoolAttendance(
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    }

    loadData();

  }, []);

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">

        Frequência Pedagógica

      </h1>
      
      <pre>
        {JSON.stringify(
          schoolAttendance[0],
          null,
          2
        )}
      </pre>


      <div className="bg-white rounded-xl shadow overflow-hidden">

       <div className="grid grid-cols-3 gap-4 mb-6">

       <div className="bg-white p-4 rounded-xl shadow">

           <h3 className="text-sm text-gray-500">

           Aprendizes Monitorados

           </h3>

           <p className="text-3xl font-bold">

           {schoolAttendance.length}

           </p>

       </div>

       <div className="bg-white p-4 rounded-xl shadow">

           <h3 className="text-sm text-gray-500">

           Presença Média

           </h3>

           <p className="text-3xl font-bold">

           {

               schoolAttendance.length

               ? Math.round(

                   schoolAttendance.reduce(

                       (acc, item) =>

                       acc +

                       (
                            item.presents
                           /
                            item.totalLessons
                       ) * 100,

                       0

                   ) /

                   schoolAttendance.length

                   )

               : 0

           }%

           </p>

       </div>

        <div className="bg-white p-4 rounded-xl shadow">

            <h3 className="text-sm text-gray-500">

            Ausências Totais

            </h3>

            <p className="text-3xl font-bold">

            {

                schoolAttendance.reduce(

                (acc, item) =>

                    acc + item.absences,

                0

                )

            }

            </p>

        </div>

        </div>

        <table className="w-full">

        <thead className="bg-gray-100">

        <tr>

            <th className="p-3 text-left">
            Aprendiz
            </th>

            <th className="p-3 text-left">
            Aulas
            </th>

            <th className="p-3 text-left">
            Presenças
            </th>

            <th className="p-3 text-left">
            Ausências
            </th>

            <th className="p-3 text-left">
            Frequência
            </th>

            <th className="p-3 text-left">
            Status
            </th>

        </tr>

        </thead>

        <tbody>

          {

            schoolAttendance.map(

              (item) => {

                const status =

                  item.overallRate >= 90

                    ? "🟢 Excelente"

                    : item.overallRate >= 75

                      ? "🟡 Bom"

                      : item.overallRate >= 60

                        ? "🟠 Atenção"

                        : "🔴 Crítico";

                return (

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
                      {item.schoolRate}%
                    </td>

                    <td className="p-3">
                      {item.companyRate}%
                    </td>

                    <td className="p-3">
                      {item.overallRate}%
                    </td>

                    <td className="p-3">
                      {status}
                    </td>

                  </tr>

                );

              }

            )

          }

        </tbody>

        </table>

      </div>

    </div>

  );

}