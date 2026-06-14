  "use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function MatriculasPage() {

  const [classrooms, setClassrooms] =
    useState<any[]>([]);

  const [apprentices, setApprentices] =
    useState<any[]>([]);

  const [enrollments, setEnrollments] =
    useState<any[]>([]);

  const [classroomId, setClassroomId] =
    useState("");

  const [apprenticeId, setApprenticeId] =
    useState("");

  async function loadData() {

    try {

      const classroomRes =
        await api.get("/classroom");

      console.log(
        "CLASSROOMS:",
        classroomRes.data
      );

      setClassrooms(
        classroomRes.data
      );

    } catch (error) {

      console.error(
        "ERRO CLASSROOM"
      );

      console.error(error);

    }

    try {

      const apprenticeRes =
        await api.get("/apprentice");

      console.log(
        "APPRENTICES:",
        apprenticeRes.data
      );

      setApprentices(
        apprenticeRes.data
      );

    } catch (error) {

      console.error(
        "ERRO APPRENTICE"
      );

      console.error(error);

    }

    try {

      const enrollmentRes =
        await api.get("/enrollment");

      console.log(
        "ENROLLMENTS:",
        enrollmentRes.data
      );

      setEnrollments(
        enrollmentRes.data
      );

    } catch (error) {

      console.error(
        "ERRO ENROLLMENT"
      );

      console.error(error);

    }

  }

  async function createEnrollment() {

    try {

      console.log("ENVIANDO:", {
        apprenticeId,
        classRoomId: classroomId,
      });
      
      console.log("CLASSROOM:", classroomId);
      console.log("APPRENTICE:", apprenticeId);

      const response = await api.post(
        "/enrollment",
        {
          apprenticeId,
          classRoomId: classroomId,
        }
      );

      console.log(
        "SUCESSO:",
        response.data
      );

      alert("Matrícula criada!");

      loadData();

    } catch (error: any) {

      console.error(
        "ERRO MATRICULA:"
      );

      console.error(error);

      console.log(
        "STATUS:",
        error?.response?.status
      );

      console.log(
        "DATA JSON:",
        JSON.stringify(
          error?.response?.data,
          null,
          2
        )
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

    loadData();

  }, []);

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">

        Matrículas

      </h1>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

        <div className="grid md:grid-cols-2 gap-4">

          <select
            value={classroomId}
            onChange={(e) =>
              setClassroomId(
                e.target.value
              )
            }
            className="border p-3 rounded-xl"
          >

            <option value="">
              Selecione a turma
            </option>

            {classrooms.map(
              (classroom) => (

                <option
                  key={classroom.id}
                  value={classroom.id}
                >

                  {classroom.name}

                </option>

              )
            )}

          </select>

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

        </div>

        <button
          onClick={
            createEnrollment
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

          Matricular

        </button>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left pb-4">
                Aprendiz
              </th>

              <th className="text-left pb-4">
                Turma
              </th>

            </tr>

          </thead>

          <tbody>

            {enrollments.map(
              (item) => (

                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="py-4">

                    {item.apprentice?.person?.name}

                  </td>

                  <td className="py-4">

                    {item.classRoom?.name}

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