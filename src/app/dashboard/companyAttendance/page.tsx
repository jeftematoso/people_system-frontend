"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function CompanyAttendancePage() {

const [apprentices, setApprentices] =
useState<any[]>([]);

const [attendances, setAttendances] =
useState<any[]>([]);

const [apprenticeId, setApprenticeId] =
useState("");

const [attendanceDate, setAttendanceDate] =
useState("");

const [present, setPresent] =
useState(true);

const [justified, setJustified] =
useState(false);

const [justification, setJustification] =
useState("");

async function loadData() {


try {

  const apprenticeRes =
    await api.get("/apprentice");

  setApprentices(
    apprenticeRes.data
  );

  const attendanceRes =
    await api.get(
      "/company-attendance"
    );

  setAttendances(
    attendanceRes.data
  );

} catch (error) {

  console.error(error);

}


}

async function saveAttendance() {


try {

  await api.post(
    "/company-attendance",
    {

      apprenticeId,

      attendanceDate,

      present,

      justified,

      justification,

    }
  );

  alert(
    "Frequência registrada!"
  );

  setAttendanceDate("");

  setJustified(false);

  setJustification("");

  loadData();

} catch (error) {

  console.error(error);

  alert(
    "Erro ao salvar frequência"
  );

}


}

useEffect(() => {


loadData();


}, []);

return (


<div className="p-8">

  <h1 className="text-4xl font-bold mb-8">

    Frequência na Empresa

  </h1>

  <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

    <div className="grid md:grid-cols-2 gap-4">

      <select
        value={apprenticeId}
        onChange={(e) =>
          setApprenticeId(
            e.target.value
          )
        }
        className="border p-3 rounded-xl"
      >

        <option value="">
          Selecione o aprendiz
        </option>

        {apprentices.map(
          (apprentice) => (

            <option
              key={apprentice.id}
              value={apprentice.id}
            >

              {apprentice.person?.name}

            </option>

          )
        )}

      </select>

      <input
        type="date"
        value={attendanceDate}
        onChange={(e) =>
          setAttendanceDate(
            e.target.value
          )
        }
        className="border p-3 rounded-xl"
      />

    </div>

    <div className="mt-4 flex gap-6">

      <label>

        <input
          type="radio"
          checked={present}
          onChange={() =>
            setPresent(true)
          }
        />

        <span className="ml-2">

          Presente

        </span>

      </label>

      <label>

        <input
          type="radio"
          checked={!present}
          onChange={() =>
            setPresent(false)
          }
        />

        <span className="ml-2">

          Ausente

        </span>

      </label>

    </div>

    {!present && (

      <div className="mt-4">

        <label className="block mb-2">

          <input
            type="checkbox"
            checked={justified}
            onChange={(e) =>
              setJustified(
                e.target.checked
              )
            }
          />

          <span className="ml-2">

            Falta Justificada

          </span>

        </label>

        <textarea
          value={justification}
          onChange={(e) =>
            setJustification(
              e.target.value
            )
          }
          placeholder="Justificativa"
          rows={4}
          className="w-full border p-3 rounded-xl"
        />

      </div>

    )}

    <button
      onClick={
        saveAttendance
      }
      className="
        mt-6
        bg-blue-600
        text-white
        px-6
        py-3
        rounded-xl
      "
    >

      Salvar Frequência

    </button>

  </div>

  <div className="bg-white rounded-2xl shadow-md p-6">

    <h2 className="text-2xl font-bold mb-6">

      Histórico

    </h2>

    <table className="w-full">

      <thead>

        <tr className="border-b">

          <th className="text-left pb-4">

            Aprendiz

          </th>

          <th className="text-left pb-4">

            Data

          </th>

          <th className="text-left pb-4">

            Presença

          </th>

          <th className="text-left pb-4">

            Justificada

          </th>

        </tr>

      </thead>

      <tbody>

        {attendances.map(
          (item) => (

            <tr
              key={item.id}
              className="border-b"
            >

              <td className="py-4">

                {
                  item.apprentice?.person?.name
                }

              </td>

              <td className="py-4">

                {
                  new Date(
                    item.attendanceDate
                  ).toLocaleDateString(
                    "pt-BR"
                  )
                }

              </td>

              <td className="py-4">

                {
                  item.present
                    ? "Presente"
                    : "Ausente"
                }

              </td>

              <td className="py-4">

                {
                  item.justified
                    ? "Sim"
                    : "Não"
                }

              </td>

            </tr>

          )
        )}

      </tbody>

    </table>

  </div>

</div>


);

}
