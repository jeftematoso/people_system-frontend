"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function CursosPage() {

const [courses, setCourses] =
useState<any[]>([]);

const [name, setName] =
useState("");

const [hours, setHours] =
useState("");

const [institution, setInstitution] =
useState("");

async function loadCourses() {


  const res =
    await api.get("/course");
  
  console.log(
   "CURSOS RECEBIDOS:",
  res.data

  );

  setCourses(res.data);


}

async function createCourse() {


await api.post("/course", {

  name,

  theoreticalHours:
    Number(hours),

  institutionName:
    institution,

});

setName("");
setHours("");
setInstitution("");

loadCourses();

}

useEffect(() => {


loadCourses();


}, []);

   console.log(
     "COURSES STATE:",
     courses
   );


return (


<div className="p-8">

  <h1 className="text-4xl font-bold mb-8">

    Cursos

  </h1>

  <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

    <div className="grid md:grid-cols-3 gap-4">

      <input
        placeholder="Nome"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="border p-3 rounded-xl"
      />

      <input
        placeholder="Horas"
        value={hours}
        onChange={(e) =>
          setHours(e.target.value)
        }
        className="border p-3 rounded-xl"
      />

      <input
        placeholder="Instituição"
        value={institution}
        onChange={(e) =>
          setInstitution(e.target.value)
        }
        className="border p-3 rounded-xl"
      />

    </div>

    <button
      onClick={createCourse}
      className="
        mt-4
        bg-blue-600
        text-white
        px-6
        py-3
        rounded-xl
      "
    >

      Salvar

    </button>

  </div>

  <div className="bg-white rounded-2xl shadow-md p-6">

    <table className="w-full">

      <thead>

        <tr className="border-b">

          <th className="text-left pb-4">
            Curso
          </th>

          <th className="text-left pb-4">
            Horas
          </th>

          <th className="text-left pb-4">
            Instituição
          </th>

        </tr>

      </thead>

      <tbody>

        {courses.map((course) => (

          <tr
            key={course.id}
            className="border-b"
          >

            <td className="py-4">

              {course.name}

            </td>

            <td className="py-4">

              {course.theoreticalHours}

            </td>

            <td className="py-4">

              {course.institutionName}

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>


);

}
