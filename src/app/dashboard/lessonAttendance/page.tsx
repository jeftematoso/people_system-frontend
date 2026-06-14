"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function LessonAttendancePage() {

const [lessons, setLessons] =
useState<any[]>([]);

const [lessonId, setLessonId] =
useState("");

const [students, setStudents] =
useState<any[]>([]);

const [attendance, setAttendance] =
useState<any>({});

async function loadLessons() {


try {

  const response =
    await api.get("/lesson");

  setLessons(response.data);

} catch (error) {

  console.error(error);

}


}

async function loadStudents(
selectedLessonId: string
) {


try {

  const lesson =
    lessons.find(
      (item) =>
        item.id === selectedLessonId
    );

  if (!lesson) return;

  const response =
    await api.get(
      `/enrollment/classroom/${lesson.classRoomId}`
    );

  setStudents(response.data);

  const initialAttendance: any = {};

  response.data.forEach(
    (student: any) => {

      initialAttendance[
        student.apprenticeId
      ] = true;

    }
  );

  setAttendance(
    initialAttendance
  );

} catch (error) {

  console.error(error);

}


}

async function saveAttendance() {


try {

  for (const student of students) {

    await api.post(
      "/lesson-attendance",
      {

        lessonId,

        apprenticeId:
          student.apprenticeId,

        present:
          attendance[
            student.apprenticeId
          ],

        justified: false,

        justification: null,

      }
    );

  }

  alert(
    "Frequência salva com sucesso!"
  );

} catch (error: any) {

    console.error(error);

    console.log(
      "STATUS:",
      error?.response?.status
    );

    console.log(
      "DATA:",
      error?.response?.data
    );

    alert(
      JSON.stringify(
        error?.response?.data,
        null,
        2
      )

    );

}


}

useEffect(() => {


loadLessons();


}, []);

return (


<div className="p-8">

  <h1 className="text-3xl font-bold mb-8">

    Frequência de Aula

  </h1>

  <div className="bg-white rounded-2xl shadow-md p-6">

    <select
      value={lessonId}
      onChange={(e) => {

        setLessonId(
          e.target.value
        );

        loadStudents(
          e.target.value
        );

      }}
      className="border p-3 rounded-xl w-full mb-6"
    >

      <option value="">
        Selecione a aula
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

    {students.length > 0 && (

      <div>

        {students.map(
          (item: any) => (

            <div
              key={item.id}
              className="
                flex
                justify-between
                items-center
                border-b
                py-3
              "
            >

              <span>

                {
                  item.apprentice
                    ?.person?.name
                }

              </span>

              <input
                type="checkbox"
                checked={
                  attendance[
                    item.apprenticeId
                  ] || false
                }
                onChange={(e) =>

                  setAttendance({

                    ...attendance,

                    [item.apprenticeId]:
                      e.target.checked,

                  })

                }
              />

            </div>

          )
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

    )}

  </div>

</div>


);

}
