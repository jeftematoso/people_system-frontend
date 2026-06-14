"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function EvaluationPage() {

const [apprentices, setApprentices] =
useState<any[]>([]);

const [evaluations, setEvaluations] =
useState<any[]>([]);

const [apprenticeId, setApprenticeId] =
useState("");

const [communication, setCommunication] =
useState("");

const [behavior, setBehavior] =
useState("");

const [attendance, setAttendance] =
useState("");

const [performance, setPerformance] =
useState("");

const [comments, setComments] =
useState("");

async function loadData() {


try {

  const apprenticeRes =
    await api.get("/apprentice");

  setApprentices(
    apprenticeRes.data
  );

  const evaluationRes =
    await api.get("/evaluation");

  setEvaluations(
    evaluationRes.data
  );

} catch (error) {

  console.error(error);

}


}

async function createEvaluation() {


try {

  await api.post(
    "/evaluation",
    {

      apprenticeId,

      communication:
        communication
          ? Number(
              communication
            )
          : null,

      behavior:
        behavior
          ? Number(
              behavior
            )
          : null,

      attendance:
        attendance
          ? Number(
              attendance
            )
          : null,

      performance:
        performance
          ? Number(
              performance
            )
          : null,

      comments,

    }
  );

  alert(
    "Avaliação cadastrada com sucesso!"
  );

  setApprenticeId("");

  setCommunication("");

  setBehavior("");

  setAttendance("");

  setPerformance("");

  setComments("");

  loadData();

} catch (error) {

  console.error(error);

  alert(
    "Erro ao salvar avaliação"
  );

}


}

useEffect(() => {


loadData();


}, []);

return (


<div className="p-8">

  <h1 className="text-4xl font-bold mb-8">

    Avaliações Pedagógicas

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

              {
                apprentice.person
                  ?.name
              }

            </option>

          )
        )}

      </select>

      <input
        type="number"
        min="0"
        max="10"
        placeholder="Comunicação"
        value={communication}
        onChange={(e) =>
          setCommunication(
            e.target.value
          )
        }
        className="border p-3 rounded-xl"
      />

      <input
        type="number"
        min="0"
        max="10"
        placeholder="Comportamento"
        value={behavior}
        onChange={(e) =>
          setBehavior(
            e.target.value
          )
        }
        className="border p-3 rounded-xl"
      />

      <input
        type="number"
        min="0"
        max="10"
        placeholder="Frequência"
        value={attendance}
        onChange={(e) =>
          setAttendance(
            e.target.value
          )
        }
        className="border p-3 rounded-xl"
      />

      <input
        type="number"
        min="0"
        max="10"
        placeholder="Desempenho"
        value={performance}
        onChange={(e) =>
          setPerformance(
            e.target.value
          )
        }
        className="border p-3 rounded-xl"
      />

    </div>

    <textarea
      placeholder="Observações"
      value={comments}
      onChange={(e) =>
        setComments(
          e.target.value
        )
      }
      className="
        border
        p-3
        rounded-xl
        w-full
        mt-4
      "
      rows={4}
    />

    <button
      onClick={
        createEvaluation
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

      Salvar Avaliação

    </button>

  </div>

  <div className="bg-white rounded-2xl shadow-md p-6">

    <h2 className="text-2xl font-bold mb-6">

      Histórico de Avaliações

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

        {evaluations.map(
          (item) => (

            <tr
              key={item.id}
              className="border-b"
            >

              <td className="py-4">

                {item.apprentice?.person?.name}

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


);

}
