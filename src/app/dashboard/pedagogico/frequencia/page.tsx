"use client";

import { useEffect, useState } from "react";

import { api } from "@/services/api";

import {
  lessonAttendanceService,
} from "@/services/lessonAttendance.service";

export default function FrequenciaPage() {

  const [lessons, setLessons] =
    useState<any[]>([]);

  const [lessonId, setLessonId] =
    useState("");

  const [students, setStudents] =
    useState<any[]>([]);

  async function loadLessons() {

    try {

      const lessonRes =
        await api.get("/lesson");

      console.log("LESSONS STATUS:");
      console.log(lessonRes.status);

      console.log("LESSONS DATA:");
      console.log(lessonRes.data);

      setLessons(
        lessonRes.data
      );

    } catch (error: any) {

      console.error("ERRO LESSON");

      console.log(
        "STATUS:",
        error?.response?.status
      );

      console.log(
        "DATA:",
        error?.response?.data
      );

    }

  }

  async function loadStudents() {

    if (!lessonId) return;

    const lesson =
      lessons.find(
        (l) => l.id === lessonId
      );

    if (!lesson) return;

    const enrollments =
      await api.get(
        `/enrollment/classroom/${lesson.classRoomId}`
      );

    setStudents(enrollments.data);

  }

  async function saveAttendance(
    apprenticeId: string,
    present: boolean
  ) {

    await lessonAttendanceService.save(
      lessonId,
      apprenticeId,
      present
    );

    alert("Frequência salva");

  }

  useEffect(() => {

    loadLessons();

  }, []);

  useEffect(() => {

    loadStudents();

  }, [lessonId]);

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">

        Frequência

      </h1>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

        <select
          value={lessonId}
          onChange={(e) =>
            setLessonId(
              e.target.value
            )
          }
          className="
            border
            p-3
            rounded-xl
            w-full
          "
        >

          <option value="">

            Selecione uma aula

          </option>

          {lessons.map(
            (lesson) => (

              <option
                key={lesson.id}
                value={lesson.id}
              >

                {lesson.title}

              </option>

            )
          )}

        </select>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left pb-4">

                Aprendiz

              </th>

              <th className="text-left pb-4">

                Presente

              </th>

              <th className="text-left pb-4">

                Falta

              </th>

            </tr>

          </thead>

          <tbody>

            {students.map(
              (student) => (

                <tr
                  key={student.id}
                  className="border-b"
                >

                  <td className="py-4">

                    {
                      student.apprentice
                        ?.person?.name
                    }

                  </td>

                  <td>

                    <button

                      onClick={() =>
                        saveAttendance(
                          student.apprenticeId,
                          true
                        )
                      }

                      className="
                        bg-green-500
                        text-white
                        px-4
                        py-2
                        rounded-xl
                      "
                    >

                      Presente

                    </button>

                  </td>

                  <td>

                    <button

                      onClick={() =>
                        saveAttendance(
                          student.apprenticeId,
                          false
                        )
                      }

                      className="
                        bg-red-500
                        text-white
                        px-4
                        py-2
                        rounded-xl
                      "
                    >

                      Falta

                    </button>

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