"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function LessonAttendancePage() {

  const [classrooms, setClassrooms] =
    useState<any[]>([]);

  const [lessons, setLessons] =
    useState<any[]>([]);

  const [filteredLessons, setFilteredLessons] =
    useState<any[]>([]);

  const [students, setStudents] =
    useState<any[]>([]);

  const [attendance, setAttendance] =
    useState<any>({});

  const [savedAttendance, setSavedAttendance] =
  useState<any[]>([]);

  const [classRoomId, setClassRoomId] =
    useState("");

  const [lessonId, setLessonId] =
    useState("");

  async function loadData() {

    try {

      const [classroomRes, lessonRes] =
        await Promise.all([

          api.get("/classroom"),

          api.get("/lesson"),

        ]);

      setClassrooms(classroomRes.data);

      setLessons(lessonRes.data);

    } catch (error) {

      console.error(error);

    }

  }

  function handleClassroomChange(
    id: string
  ) {

    setClassRoomId(id);

    setLessonId("");

    setStudents([]);

    setAttendance({});

    const list =
      lessons.filter(

        lesson =>

          lesson.classRoomId === id

      );

    setFilteredLessons(list);

  }

  async function loadStudents(
    selectedLessonId: string
  ) {

    try {

      const lesson =
        lessons.find(
          item => item.id === selectedLessonId
        );

      if (!lesson) return;

      const [

        enrollmentRes,

        attendanceRes,

      ] = await Promise.all([

        api.get(
          `/enrollment/classroom/${lesson.classRoomId}`
        ),

        api.get(
          `/lesson-attendance?lessonId=${selectedLessonId}`
        ),

      ]);

      setStudents(
        enrollmentRes.data
      );

      setSavedAttendance(
        attendanceRes.data
      );

      const initialAttendance:any = {};

      enrollmentRes.data.forEach(
        (student:any) => {

          const existing =
            attendanceRes.data.find(
              (item:any)=>

                item.apprenticeId ===
                student.apprenticeId

            );

          initialAttendance[
            student.apprenticeId
          ] = existing
              ? existing.present
              : true;

        }
      );

      setAttendance(
        initialAttendance
      );

    }

    catch(error){

      console.error(error);

    }

  }
  ///////
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

      alert("Frequência salva com sucesso!");

    } catch (error) {

      console.error(error);

      alert("Erro ao salvar frequência.");

    }

  }

  useEffect(() => {

    loadData();

  }, []);

  return (

  <div className="p-8">

    <h1 className="text-3xl font-bold mb-8">

      Frequência das Aulas

    </h1>

    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="grid md:grid-cols-2 gap-4 mb-6">

        <select

          value={classRoomId}

          onChange={(e) =>

            handleClassroomChange(

              e.target.value

            )

          }

          className="border p-3 rounded-xl"

        >

          <option value="">

            Selecione a turma

          </option>

          {classrooms.map((classroom) => (

            <option

              key={classroom.id}

              value={classroom.id}

            >

              {classroom.name}

            </option>

          ))}

        </select>

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

          className="border p-3 rounded-xl"

          disabled={!classRoomId}

        >

          <option value="">

            Selecione a aula

          </option>

          {filteredLessons.map((lesson) => (

            <option

              key={lesson.id}

              value={lesson.id}

            >

              {lesson.title} •{" "}

              {new Date(

                lesson.lessonDate

              ).toLocaleDateString(

                "pt-BR"

              )}

            </option>

          ))}

        </select>

      </div>

      {students.length > 0 && (

        <>

          <div className="mb-6 flex justify-between">

            <div>

              <h2 className="text-xl font-bold">

                Aprendizes

              </h2>

              <p className="text-gray-500">

                Marque a presença da aula.

              </p>

            </div>

            <div className="text-right">

              <p>

                Presentes:{" "}

                <strong>

                  {

                    Object.values(

                      attendance

                    ).filter(Boolean)

                      .length

                  }

                </strong>

              </p>

              <p>

                Ausentes:{" "}

                <strong>

                  {

                    students.length -

                    Object.values(

                      attendance

                    ).filter(Boolean)

                      .length

                  }

                </strong>

              </p>

            </div>

          </div>

          <div className="space-y-3">

            {students.map((item: any) => (

              <div

                key={item.id}

                className="

                  flex

                  justify-between

                  items-center

                  border

                  rounded-xl

                  p-4

                "

              >

                <div>

                  <p className="font-semibold">

                    {

                      item.apprentice

                        ?.person?.name

                    }

                  </p>

                </div>

                <label className="flex items-center gap-3">

                  <span

                    className={

                      attendance[

                        item.apprenticeId

                      ]

                        ? "text-green-600 font-semibold"

                        : "text-red-600 font-semibold"

                    }

                  >

                    {attendance[

                      item.apprenticeId

                    ]

                      ? "Presente"

                      : "Ausente"}

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

                </label>

              </div>

            ))}

          </div>

          <button

            onClick={saveAttendance}

            className="

              mt-8

              bg-blue-600

              hover:bg-blue-700

              text-white

              px-6

              py-3

              rounded-xl

            "

          >

            Salvar Frequência

          </button>

        </>

      )}

    </div>

  </div>

);

}