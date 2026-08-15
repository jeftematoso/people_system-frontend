"use client";

import { useEffect, useState } from "react";

import { api } from "@/services/api";

import {

  calculateAverage,

  getAverageBadge,

  getAverageColor,

  getScoreColor,

} from "./utils/evaluationUtils";

import EvaluationDistributionChart from "./components/EvaluationDistributionChart";

import { EvaluationDashboard } from "./components/EvaluationDashboard";

import EvaluationFilters from "./components/EvaluationFilters";

import ApprenticeEvolutionChart from "./components/ApprenticeEvolutionChart";

import ApprenticeRadarChart from "./components/ApprenticeRadarChart";

import PedagogicalInsights from "./components/PedagogicalInsights";

import { usePedagogicalInsights } from "./hooks/usePedagogicalInsights";

import { usePedagogicalAI } from "./hooks/usePedagogicalAI";

import {

  Classroom,

  Lesson,

  Student,

  EvaluationItem,

} from "./types";

import ClassEvolutionChart from "./components/ClassEvolutionChart";

import ClassRanking from "./components/ClassRanking";

import CompetencyEvolutionChart from "./components/CompetencyEvolutionChart";


export default function EvaluationPage() {

  const [loading, setLoading] = useState(false);

  const [classrooms, setClassrooms] = useState<Classroom[]>([]);

  const [lessons, setLessons] = useState<Lesson[]>([]);

  const [students, setStudents] = useState<Student[]>([]);

  const [selectedClassroom, setSelectedClassroom] = useState("");

  const [selectedLesson, setSelectedLesson] = useState("");

  const [evaluations, setEvaluations] = useState<Record<string, EvaluationItem>>({});

  const [selectedApprentice, setSelectedApprentice] = useState<any>(null);

  const pedagogicalSummary = usePedagogicalAI(selectedApprentice?.id);

  const [history, setHistory] = useState<any[]>([]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [classroomHistory, setClassroomHistory] = useState<any[]>([]);
  

  useEffect(() => {

    loadClassrooms();

  }, []);

  async function loadClassrooms() {

    try {

      const response = await api.get("/classroom");

      setClassrooms(response.data);

    } catch (error) {

      console.error(error);

    }

  }

  async function loadLessons(classRoomId: string) {

    try {

      const response = await api.get("/lesson");

      const filtered = response.data.filter(

        (lesson: Lesson) =>

          lesson.classRoomId === classRoomId

      );

      setLessons(filtered);

      setSelectedLesson("");

      setStudents([]);

    } catch (error) {

      console.error(error);

    }

  }

  async function loadStudents(classRoomId: string) {

    try {

      const response = await api.get(

        `/enrollment/classroom/${classRoomId}`

      );

      setStudents(response.data);

      const initial: Record<string, EvaluationItem> = {};

      response.data.forEach((student: Student) => {

        initial[student.apprenticeId] = {

          communication: 0,

          behavior: 0,

          attendance: 0,

          performance: 0,

          comments: "",

        };

      });

      setEvaluations(initial);

    } catch (error) {

      console.error(error);

    }

  }

async function loadClassroomEvolution(classRoomId: string) {

  try {

    const response = await api.get(
      `/evaluation/classroom/${classRoomId}/evolution`
    );

    setClassroomHistory(response.data);

  } catch (error) {

    console.error(
      "Erro ao carregar evolução da turma",
      error
    );

  }

}

  async function loadHistory(apprenticeId: string) {

    try {

      const response = await api.get(

        `/evaluation?apprenticeId=${apprenticeId}`

      );

      setHistory(response.data);

    } catch (error) {

      console.error(error);

    }

  }

  function updateEvaluation(

    apprenticeId: string,

    field: keyof EvaluationItem,

    value: number | string

  ) {

    setEvaluations((prev) => ({

      ...prev,

      [apprenticeId]: {

        ...prev[apprenticeId],

        [field]: value,

      },

    }));

  }

  async function saveEvaluations() {

    try {

      setLoading(true);

      for (const student of students) {

        const evaluation = evaluations[student.apprenticeId];

        await api.post("/evaluation", {

          apprenticeId: student.apprenticeId,

          lessonId: selectedLesson,

          communication: evaluation.communication,

          behavior: evaluation.behavior,

          attendance: evaluation.attendance,

          performance: evaluation.performance,

          comments: evaluation.comments,

        });

      }

      alert("Avaliações salvas com sucesso!");

    } catch (error) {

      console.error(error);

      alert("Erro ao salvar avaliações.");

    } finally {

      setLoading(false);

    }

  }


async function loadHistory(apprenticeId: string) {
  try {
    const response = await api.get(
      `/evaluation?apprenticeId=${apprenticeId}`
    );

    setHistory(response.data);
  } catch (error) {
    console.error(error);
    setHistory([]);
  }
}

const totalStudents = students.length;

const lessonSelected = lessons.find(

  (lesson) => lesson.id === selectedLesson

);

const totalFilled = students.filter((student) => {

  const item = evaluations[student.apprenticeId];

  if (!item) return false;

  return (

    item.communication > 0 ||

    item.behavior > 0 ||

    item.attendance > 0 ||

    item.performance > 0

  );

}).length;

const progressPercent =

  totalStudents === 0

    ? 0

    : (totalFilled / totalStudents) * 100;

const averages = students

  .map((student) =>

    calculateAverage(

      evaluations[student.apprenticeId]

    )

  )

  .filter((avg) => avg > 0);

const classAverage =

  averages.length

    ? (

        averages.reduce(

          (sum, avg) => sum + avg,

          0

        ) / averages.length

      ).toFixed(1)

    : "0.0";

const excellent = averages.filter(

  (avg) => avg >= 9

).length;

const good = averages.filter(

  (avg) => avg >= 7 && avg < 9

).length;

const warning = averages.filter(

  (avg) => avg >= 5 && avg < 7

).length;

const critical = averages.filter(

  (avg) => avg < 5

).length;

const ranking = students
  .map((student) => {

    const average = calculateAverage(
      evaluations,
      student.apprenticeId
    );

    return {

      apprenticeId: student.apprenticeId,

      name:
        student.person?.name ??
        "Sem nome",

      average,

    };

  })
  .filter((student) => student.average > 0)
  .sort((a, b) => b.average - a.average);


const insights = usePedagogicalInsights(

  students,

  evaluations,

  calculateAverage

);

function getProgressColor(percent: number) {

  if (percent < 40)

    return "bg-red-500";

  if (percent < 70)

    return "bg-yellow-500";

  if (percent < 90)

    return "bg-blue-500";

  return "bg-green-500";

}

return (

<div className="p-8">

  <div className="flex justify-between items-center mb-8">

    <div>

      <h1 className="text-4xl font-bold">

        Avaliações Pedagógicas

      </h1>

      <p className="text-gray-500 mt-2">

        Lançamento das avaliações pedagógicas.

      </p>

    </div>

  </div>

  <EvaluationDashboard

    totalStudents={totalStudents}

    totalFilled={totalFilled}

    classAverage={classAverage}

    excellent={excellent}

    good={good}

    warning={warning}

    critical={critical}

  />

  <div className="bg-white rounded-2xl shadow p-6 mb-8">

    <div className="flex justify-between items-center mb-3">

      <h2 className="font-semibold">

        Progresso das Avaliações

      </h2>

      <span className="font-bold">

        {totalFilled} / {totalStudents}

      </span>

    </div>

    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

      <div

        className={`

          h-4

          rounded-full

          transition-all

          duration-700

          ${getProgressColor(progressPercent)}

        `}

        style={{

          width: `${progressPercent}%`,

        }}

      />

    </div>

    <div className="flex justify-between mt-3 text-sm text-gray-500">

      <span>

        {progressPercent.toFixed(0)}%

      </span>

      <span>

        {totalStudents - totalFilled}

        {" "}pendentes

      </span>

    </div>

  </div>


  <EvaluationDistributionChart

    excellent={excellent}

    good={good}

    warning={warning}

    critical={critical}

  />


  <PedagogicalInsights

    insights={insights}

  />

  <EvaluationFilters

    classrooms={classrooms}

    lessons={lessons}

    selectedClassroom={selectedClassroom}

    selectedLesson={selectedLesson}

    onClassroomChange={(id) => {

      setSelectedClassroom(id);

      loadLessons(id);

      loadClassroomEvolution(id);

    }}

    onLessonChange={(id) => {

      setSelectedLesson(id);

      loadStudents(selectedClassroom);

    }}

  />

  <ClassEvolutionChart
    history={classroomHistory}
  />

  <div className="mt-8">
    <ClassRanking
      ranking={ranking}
    />
  </div>

{
  lessonSelected && (

    <div className="bg-white rounded-2xl shadow p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold">

            {lessonSelected.title}

          </h2>

          <p className="text-gray-500">

            {new Date(

              lessonSelected.lessonDate

            ).toLocaleDateString("pt-BR")}

          </p>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">

                Aprendiz

              </th>

              <th className="text-center">

                Comunicação

              </th>

              <th className="text-center">

                Comportamento

              </th>

              <th className="text-center">

                Frequência

              </th>

              <th className="text-center">

                Desempenho

              </th>

              <th className="text-center">

                Média

              </th>

              <th>

                Observações

              </th>

            </tr>

          </thead>

          <tbody>

            {students.map((student) => {

              const evaluation =

                evaluations[student.apprenticeId];

              const average =

                calculateAverage(evaluation);

              const badge =

                getAverageBadge(average);

              return (

                <tr

                  key={student.apprenticeId}

                  className="border-b"

                >

                  <td className="py-3">

                    <button

                      onClick={async () => {

                        setSelectedApprentice(student);

                        await loadHistory(

                          student.apprenticeId

                        );

                        setDrawerOpen(true);

                      }}

                      className="hover:text-blue-600 hover:underline font-medium"

                    >

                      {

                        student.apprentice?.person?.name

                      }

                    </button>

                  </td>

                  {(

                    [

                      "communication",

                      "behavior",

                      "attendance",

                      "performance",

                    ] as const

                  ).map((field) => (

                    <td

                      key={field}

                      className="text-center"

                    >

                      <select

                        value={evaluation[field]}

                        onChange={(e) =>

                          updateEvaluation(

                            student.apprenticeId,

                            field,

                            Number(e.target.value)

                          )

                        }

                        className={`

                          border

                          rounded-xl

                          px-3

                          py-2

                          font-bold

                          ${getScoreColor(

                            evaluation[field]

                          )}

                        `}

                      >

                        {[

                          0,

                          1,

                          2,

                          3,

                          4,

                          5,

                          6,

                          7,

                          8,

                          9,

                          10,

                        ].map((nota) => (

                          <option

                            key={nota}

                            value={nota}

                          >

                            {nota}

                          </option>

                        ))}

                      </select>

                    </td>

                  ))}

                  <td className="text-center">

                    <div className="flex flex-col items-center gap-2">

                      <span

                        className={`

                          font-bold

                          text-xl

                          ${getAverageColor(

                            average

                          )}

                        `}

                      >

                        {average}

                      </span>

                      <span

                        className={`

                          px-3

                          py-1

                          rounded-full

                          text-xs

                          font-semibold

                          ${badge.color}

                        `}

                      >

                        {badge.text}

                      </span>

                    </div>

                  </td>

                  <td>

                    <input

                      value={evaluation.comments}

                      onChange={(e) =>

                        updateEvaluation(

                          student.apprenticeId,

                          "comments",

                          e.target.value

                        )

                      }

                      className="border rounded p-2 w-full"

                    />

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

      <div className="mt-8 flex justify-end">

        <button

          disabled={loading}

          onClick={saveEvaluations}

          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"

        >

          {

            loading

              ? "Salvando..."

              : "Salvar Avaliações"

          }

        </button>

      </div>

    </div>

  )

}

{

  drawerOpen && (

    <div className="fixed inset-0 z-50 flex">

      <div

        className="flex-1 bg-black/40"

        onClick={() =>

          setDrawerOpen(false)

        }

      />

      <div className="w-[460px] bg-white shadow-2xl p-8 overflow-y-auto">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">

            Evolução do Aprendiz

          </h2>

          <button

            onClick={() =>

              setDrawerOpen(false)

            }

          >

            ✕

          </button>

        </div>

        {

          selectedApprentice && (

            <>

              <h3 className="text-xl font-bold mb-6">

                {

                  selectedApprentice.apprentice

                    ?.person?.name

                }

              </h3>

              <div className="space-y-4">

                {

                  history.map((item) => {

                    const avg = (

                      (

                        Number(item.communication) +

                        Number(item.behavior) +

                        Number(item.attendance) +

                        Number(item.performance)

                      ) / 4

                    ).toFixed(1);

                    return (

                      <div

                        key={item.id}

                        className="border rounded-xl p-4"

                      >

                        <div className="flex justify-between">

                          <strong>

                            {

                              item.lesson?.title ??

                              "Aula"

                            }

                          </strong>

                          <span>

                            {avg}

                          </span>

                        </div>

                        <p className="text-sm text-gray-500 mt-2">

                          {

                            item.comments ||

                            "Sem observações"

                          }

                        </p>

                      </div>

                    );

                  })

                }

              </div>

            </>

          )

        }

      </div>

    </div>

  )

}

{drawerOpen && (

  <div className="fixed inset-0 z-50 flex">

    <div
      className="flex-1 bg-black/40"
      onClick={() => setDrawerOpen(false)}
    />

    <div className="w-[480px] bg-white shadow-2xl overflow-y-auto">

      <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold">

            {selectedApprentice?.apprentice?.person?.name}

          </h2>

          <p className="text-gray-500">

            Histórico Pedagógico

          </p>

        </div>

        <button
          onClick={() => setDrawerOpen(false)}
          className="text-2xl hover:text-red-500"
        >
          ✕
        </button>

      </div>

      <div className="p-6">
        <ApprenticeEvolutionChart
          history={history}
        />

        <CompetencyEvolutionChart
          history={history}
        />

        {pedagogicalSummary && (

          <div className="bg-white rounded-2xl shadow p-6 mb-8">

            <h2 className="text-2xl font-bold mb-4">

              🤖 Parecer Pedagógico da IA

            </h2>

            <p className="text-gray-700 leading-7">

              {pedagogicalSummary}

            </p>

          </div>

        )}

        <ApprenticeRadarChart

          evaluation={history[history.length-1]}

        />

        {history.length === 0 ? (

          <div className="text-center py-10 text-gray-400">

            Nenhuma avaliação encontrada.

          </div>

        ) : (

          history.map((item: any) => (

            <div
              key={item.id}
              className="border rounded-xl p-5 mb-5 shadow-sm"
            >

              <div className="flex justify-between items-center mb-3">

                <div>

                  <h3 className="font-bold">

                    {item.lesson?.title}

                  </h3>

                  <p className="text-gray-500 text-sm">

                    {new Date(
                      item.evaluationDate
                    ).toLocaleDateString("pt-BR")}

                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${

                    getAverageBadge(

                      calculateAverage({

                        communication: item.communication,

                        behavior: item.behavior,

                        attendance: item.attendance,

                        performance: item.performance,

                      })

                    ).color

                  }`}
                >

                  {

                    calculateAverage({

                      communication: item.communication,

                      behavior: item.behavior,

                      attendance: item.attendance,

                      performance: item.performance,

                    })

                  }

                </span>

              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">

                <div>Comunicação: <strong>{item.communication}</strong></div>

                <div>Comportamento: <strong>{item.behavior}</strong></div>

                <div>Frequência: <strong>{item.attendance}</strong></div>

                <div>Desempenho: <strong>{item.performance}</strong></div>

              </div>

              {item.comments && (

                <div className="mt-4 border-t pt-3">

                  <p className="text-gray-500 text-sm">

                    Observações

                  </p>

                  <p className="mt-1">

                    {item.comments}

                  </p>

                </div>

              )}

            </div>

          ))

        )}

      </div>

    </div>

  </div>

)}

</div>

);

}