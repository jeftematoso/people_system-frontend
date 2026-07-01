"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";


import {

  ResponsiveContainer,

  LineChart,

  Line,

  XAxis,

  YAxis,

  CartesianGrid,

  Tooltip,

} from "recharts";


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

const [filterApprentice, setFilterApprentice] =
  useState("");

const [selectedApprentice, setSelectedApprentice] =
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

    const averageScore = evaluations.length
      ? (
          evaluations.reduce(
            (acc, item) =>
              acc +
              (
                (item.communication || 0) +
                (item.behavior || 0) +
                (item.attendance || 0) +
                (item.performance || 0)
              ),
            0
          ) /
          evaluations.length
        ).toFixed(1)
      : "0";

    const topEvaluation =
      evaluations.length > 0
        ? [...evaluations].sort(
            (a, b) =>
              (
                (b.communication || 0) +
                (b.behavior || 0) +
                (b.attendance || 0) +
                (b.performance || 0)
              ) -
              (
                (a.communication || 0) +
                (a.behavior || 0) +
                (a.attendance || 0) +
                (a.performance || 0)
              )
          )[0]
        : null;

    const evaluationHistory =

      evaluations

        .filter(item =>

          selectedApprentice

            ? item.apprenticeId === selectedApprentice

            : true

        )

        .sort(

          (a, b) =>

            new Date(
              a.evaluationDate
            ).getTime()

            -

            new Date(
              b.evaluationDate
            ).getTime()

        )

        .map(item => ({

          date:

            new Date(
              item.evaluationDate
            ).toLocaleDateString("pt-BR"),

          average:

            Number(

              (

                (

                  (item.communication || 0) +

                  (item.behavior || 0) +

                  (item.attendance || 0) +

                  (item.performance || 0)

                ) / 4

              ).toFixed(1)

            ),

        }));

    return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">

        Avaliações Pedagógicas

      </h1>

      <div className="grid grid-cols-3 gap-4 mb-8">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-sm text-gray-500">

            Total Avaliações

          </p>

          <h2 className="text-3xl font-bold">

            {evaluations.length}

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-sm text-gray-500">

            Média Geral

          </p>

          <h2 className="text-3xl font-bold">

            {averageScore}

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <p className="text-sm text-gray-500">

            Melhor Avaliação

          </p>

          <h2 className="text-lg font-bold">

            {

              topEvaluation?.apprentice?.person?.name ||

              "-"

            }

          </h2>

        </div>

      </div>

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

                    apprentice.person?.name

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

      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

        <h2 className="text-2xl font-bold mb-6">

          Evolução Pedagógica

        </h2>

        <select
          value={selectedApprentice}
          onChange={(e) =>
            setSelectedApprentice(
              e.target.value
            )
          }
          className="border p-3 rounded-xl mb-6"
        >

          <option value="">

            Todos os aprendizes

          </option>

          {apprentices.map(
            apprentice => (

              <option
                key={apprentice.id}
                value={apprentice.id}
              >

                {apprentice.person?.name}

              </option>

            )
          )}

        </select>

        {
          evaluationHistory.length > 0 ? (

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <LineChart data={evaluationHistory}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />

                <YAxis domain={[0, 10]} />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#2563eb"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          ) : (

            <div className="p-8 text-center text-gray-500">

              Nenhuma avaliação encontrada para exibir evolução.

            </div>

          )
        }

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

              <th className="text-left pb-4">
                Média
              </th>

              <th className="text-left pb-4">
                Comentários
              </th>

              <th className="text-left pb-4">
                Data
              </th>

            </tr>

          </thead>

          <tbody>

            {evaluations.map((item) => (

              <tr
                key={item.id}
                className="border-b"
              >

                <td className="py-4">
                  {item.apprentice?.person?.name}
                </td>

                <td className="py-4">
                  {item.communication}
                </td>

                <td className="py-4">
                  {item.behavior}
                </td>

                <td className="py-4">
                  {item.attendance}
                </td>

                <td className="py-4">
                  {item.performance}
                </td>

                <td className="py-4">

                  {

                    (

                      (

                        (item.communication || 0) +

                        (item.behavior || 0) +

                        (item.attendance || 0) +

                        (item.performance || 0)

                      ) / 4

                    ).toFixed(1)

                  }

                </td>

                <td className="py-4">
                  {item.comments || "-"}
                </td>

                <td className="py-4">

                  {

                    item.evaluationDate

                      ? new Date(
                          item.evaluationDate
                        ).toLocaleDateString("pt-BR")

                      : "-"

                  }

                </td>

              </tr>

            ))}

          </tbody>

        </table>

  </div>

</div>


);

}
