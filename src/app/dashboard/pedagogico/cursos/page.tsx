"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/services/api";

interface Course {
  id: string;
  name: string;
  theoreticalHours: number;
  institutionName: string;
  createdAt: string;
}

export default function CursosPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [hours, setHours] = useState("");
  const [institution, setInstitution] = useState("");

  const [editing, setEditing] = useState<Course | null>(null);

  const [showModal, setShowModal] = useState(false);

  async function loadCourses() {
    try {
      setLoading(true);

      const response = await api.get("/course");

      setCourses(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar cursos.");
    } finally {
      setLoading(false);
    }
  }

async function createCourse() {
  try {
    await api.post("/course", {
      name,
      theoreticalHours: Number(hours),
      institutionName: institution,
    });

    alert("Curso cadastrado com sucesso!");

    setShowModal(false);

    setName("");
    setHours("");
    setInstitution("");

    loadCourses();
  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar curso.");
  }
}

async function updateCourse() {
  if (!editing) return;

  try {
    await api.put(`/course/${editing.id}`, {
      name,
      theoreticalHours: Number(hours),
      institutionName: institution,
    });

    alert("Curso atualizado!");

    setShowModal(false);

    setEditing(null);

    setName("");
    setHours("");
    setInstitution("");

    loadCourses();
  } catch (error) {
    console.error(error);
    alert("Erro ao atualizar.");
  }
}

async function deleteCourse(id: string) {
  if (!confirm("Deseja realmente excluir este curso?")) return;

  try {
    await api.delete(`/course/${id}`);

    alert("Curso excluído.");

    loadCourses();
  } catch (error) {
    console.error(error);
    alert("Erro ao excluir.");
  }
}

  useEffect(() => {
    loadCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const value = search.toLowerCase();

      return (
        course.name.toLowerCase().includes(value) ||
        course.institutionName.toLowerCase().includes(value)
      );
    });
  }, [courses, search]);

  const totalHours = useMemo(() => {
    return courses.reduce(
      (acc, item) => acc + item.theoreticalHours,
      0
    );
  }, [courses]);

  const totalInstitutions = useMemo(() => {
    return new Set(
      courses.map((c) => c.institutionName)
    ).size;
  }, [courses]);

  function openCreateModal() {
    setEditing(null);

    setName("");
    setHours("");
    setInstitution("");

    setShowModal(true);
  }

  function openEditModal(course: Course) {
    setEditing(course);

    setName(course.name);
    setHours(course.theoreticalHours.toString());
    setInstitution(course.institutionName);

    setShowModal(true);
  }

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Cursos
          </h1>

          <p className="text-gray-500 mt-2">
            Cadastro e gerenciamento dos cursos.
          </p>

        </div>

        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl shadow"
        >
          + Novo Curso
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-gray-500">
            Cursos cadastrados
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {courses.length}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-gray-500">
            Total de Horas
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalHours}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-gray-500">
            Instituições
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {totalInstitutions}
          </h2>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex justify-between items-center mb-6">

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Pesquisar curso..."
            className="border rounded-xl px-4 py-3 w-96"
          />

        </div>

                {loading ? (
          <div className="py-20 text-center text-gray-500">
            Carregando cursos...
          </div>
        ) : (
          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left pb-4">Curso</th>

                <th className="text-left pb-4">Horas</th>

                <th className="text-left pb-4">Instituição</th>

                <th className="text-center pb-4">Ações</th>

              </tr>

            </thead>

            <tbody>

              {filteredCourses.map((course) => (

                <tr
                  key={course.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="py-4 font-medium">
                    {course.name}
                  </td>

                  <td className="py-4">
                    {course.theoreticalHours}
                  </td>

                  <td className="py-4">
                    {course.institutionName}
                  </td>

                  <td className="py-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          openEditModal(course)
                        }
                        className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() =>
                          deleteCourse(course.id)
                        }
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                      >
                        Excluir
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

      </div>

      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl shadow-xl w-[550px] p-8">

            <h2 className="text-2xl font-bold mb-6">

              {editing
                ? "Editar Curso"
                : "Novo Curso"}

            </h2>

            <div className="space-y-4">

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Nome do curso"
                className="border rounded-xl p-3 w-full"
              />

              <input
                value={hours}
                onChange={(e) =>
                  setHours(e.target.value)
                }
                placeholder="Carga Horária"
                className="border rounded-xl p-3 w-full"
              />

              <input
                value={institution}
                onChange={(e) =>
                  setInstitution(e.target.value)
                }
                placeholder="Instituição"
                className="border rounded-xl p-3 w-full"
              />

            </div>

            <div className="flex justify-end gap-3 mt-8">

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="px-5 py-3 rounded-xl border"
              >
                Cancelar
              </button>

              <button
                onClick={
                  editing
                    ? updateCourse
                    : createCourse
                }
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
              >
                Salvar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}