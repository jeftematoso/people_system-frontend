"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function TurmasPage() {

  const [classrooms, setClassrooms] =
    useState<any[]>([]);

  const [courses, setCourses] =
    useState<any[]>([]);

  const [name, setName] =
    useState("");

  const [courseId, setCourseId] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  async function loadData() {

    const [
      classroomRes,
      courseRes,
    ] = await Promise.all([

      api.get("/classroom"),

      api.get("/course"),

    ]);

    setClassrooms(
      classroomRes.data
    );

    setCourses(
      courseRes.data
    );

  }

  async function createClassroom() {

    await api.post(
      "/classroom",
      {

        name,

        courseId,

        startDate,

        endDate,

      }
    );

    setName("");
    setCourseId("");
    setStartDate("");
    setEndDate("");

    loadData();

  }

  useEffect(() => {

    loadData();

  }, []);

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">

        Turmas

      </h1>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

        <div className="grid md:grid-cols-2 gap-4">

          <input
            placeholder="Nome da turma"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="border p-3 rounded-xl"
          />

          <select
            value={courseId}
            onChange={(e) =>
              setCourseId(
                e.target.value
              )
            }
            className="border p-3 rounded-xl"
          >

            <option value="">

              Selecione o curso

            </option>

            {courses.map(
              (course) => (

                <option
                  key={course.id}
                  value={course.id}
                >

                  {course.name}

                </option>

              )
            )}

          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(
                e.target.value
              )
            }
            className="border p-3 rounded-xl"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(
                e.target.value
              )
            }
            className="border p-3 rounded-xl"
          />

        </div>

        <button
          onClick={
            createClassroom
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

          Salvar Turma

        </button>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left pb-4">

                Turma

              </th>

              <th className="text-left pb-4">

                Curso

              </th>

              <th className="text-left pb-4">

                Início

              </th>

              <th className="text-left pb-4">

                Fim

              </th>

            </tr>

          </thead>

          <tbody>

            {classrooms.map(
              (classroom) => (

                <tr
                  key={
                    classroom.id
                  }
                  className="border-b"
                >

                  <td className="py-4">

                    {
                      classroom.name
                    }

                  </td>

                  <td className="py-4">

                    {
                      classroom.course
                        ?.name
                    }

                  </td>

                  <td className="py-4">

                    {
                      new Date(
                        classroom.startDate
                      ).toLocaleDateString(
                        "pt-BR"
                      )
                    }

                  </td>

                  <td className="py-4">

                    {
                      classroom.endDate
                        ? new Date(
                            classroom.endDate
                          ).toLocaleDateString(
                            "pt-BR"
                          )
                        : "-"
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