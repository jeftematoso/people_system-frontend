"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/services/api";

interface Lesson {

  id: string;

  classRoomId: string;

  title: string;

  lessonDate: string;

  content?: string;

  classRoom: {

    id: string;

    name: string;

  };

}

interface Classroom {

  id: string;

  name: string;

}

export default function AulasPage() {

  const [loading, setLoading] =
    useState(true);

  const [lessons, setLessons] =
    useState<Lesson[]>([]);

  const [classrooms, setClassrooms] =
    useState<Classroom[]>([]);

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editing, setEditing] =
    useState<Lesson | null>(null);

  const [classRoomId, setClassRoomId] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [lessonDate, setLessonDate] =
    useState("");

  const [content, setContent] =
    useState("");

  async function loadData() {

    try {

      setLoading(true);

      const [

        lessonRes,

        classroomRes,

      ] = await Promise.all([

        api.get("/lesson"),

        api.get("/classroom"),

        
      ]);

      console.log(
        "RESPOSTA API CLASSROOM:",
        classroomRes.data
      );


      setLessons(lessonRes.data);

      setClassrooms(classroomRes.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  async function createLesson() {

    try {

      await api.post("/lesson", {

        classRoomId,

        title,

        lessonDate,

        content,

      });

      alert("Aula cadastrada com sucesso!");

      setShowModal(false);

      setClassRoomId("");

      setTitle("");

      setLessonDate("");

      setContent("");

      loadData();

    } catch (error) {

      console.error(error);

      alert("Erro ao cadastrar aula.");

    }

  }

  async function updateLesson() {

    if (!editing) return;

    try {

      await api.put(`/lesson/${editing.id}`, {

        classRoomId,

        title,

        lessonDate,

        content,

      });

      alert("Aula atualizada.");

      setEditing(null);

      setShowModal(false);

      setClassRoomId("");

      setTitle("");

      setLessonDate("");

      setContent("");

      loadData();

    } catch (error) {

      console.error(error);

      alert("Erro ao atualizar.");

    }

  }

  async function deleteLesson(id: string) {

    if (!confirm("Deseja excluir esta aula?"))

      return;

    try {

      await api.delete(`/lesson/${id}`);

      loadData();

    } catch (error) {

      console.error(error);

      alert("Erro ao excluir.");

    }

  }

  useEffect(() => {

    loadData();

  }, []); 

  console.log("CLASSROOMS:", classrooms);

  const filteredLessons = useMemo(() => {

    return lessons.filter((lesson) => {

      const value = search.toLowerCase();

      return (

        lesson.title
          .toLowerCase()
          .includes(value)

        ||

        lesson.classRoom?.name
          .toLowerCase()
          .includes(value)

      );

    });

  }, [lessons, search]);

  const totalLessons =
    lessons.length;

  const classroomsWithLessons =
    new Set(

      lessons.map(
        lesson => lesson.classRoomId
      )

    ).size;

  const lastLesson =
    lessons.length > 0
      ? lessons[0]
      : null;

  function openCreateModal() {

    setEditing(null);

    setClassRoomId("");

    setTitle("");

    setLessonDate("");

    setContent("");

    setShowModal(true);

  }

  function openEditModal(
    lesson: Lesson
  ) {

    setEditing(lesson);

    setClassRoomId(
      lesson.classRoomId
    );

    setTitle(
      lesson.title
    );

    setLessonDate(
      lesson.lessonDate.substring(0,10)
    );

    setContent(
      lesson.content || ""
    );

    setShowModal(true);

  }

  return (

    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">

            Aulas

          </h1>

          <p className="text-gray-500 mt-2">

            Cadastro e gerenciamento das aulas ministradas.

          </p>

        </div>

        <button

          onClick={openCreateModal}

          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
          "

        >

          Nova Aula

        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-gray-500">

            Total de Aulas

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {totalLessons}

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-gray-500">

            Turmas com aulas

          </p>

          <h2 className="text-4xl font-bold mt-2">

            {classroomsWithLessons}

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-gray-500">

            Última Aula

          </p>

          <h2 className="text-lg font-bold mt-2">

            {lastLesson?.title || "-"}

          </h2>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex justify-between items-center mb-6">

          <input

            value={search}

            onChange={(e)=>

              setSearch(e.target.value)

            }

            placeholder="Pesquisar aula..."

            className="
              border
              rounded-xl
              px-4
              py-3
              w-96
            "

          />

        </div>

        {loading ? (

          <div className="py-20 text-center text-gray-500">

            Carregando aulas...

          </div>

        ) : (

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left pb-4">

                  Turma

                </th>

                <th className="text-left pb-4">

                  Aula

                </th>

                <th className="text-left pb-4">

                  Data

                </th>

                <th className="text-left pb-4">

                  Conteúdo

                </th>

                <th className="text-center pb-4">

                  Ações

                </th>

              </tr>

            </thead>

            <tbody>

              {filteredLessons.map((lesson) => (

                <tr

                  key={lesson.id}

                  className="border-b hover:bg-gray-50"

                >

                  <td className="py-4">

                    {lesson.classRoom?.name}

                  </td>

                  <td className="py-4">

                    {lesson.title}

                  </td>

                  <td className="py-4">

                    {new Date(

                      lesson.lessonDate

                    ).toLocaleDateString("pt-BR")}

                  </td>

                  <td className="py-4">

                    {lesson.content || "-"}

                  </td>

                  <td className="py-4">

                    <div className="flex justify-center gap-2">

                      <button

                        onClick={()=>

                          openEditModal(lesson)

                        }

                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"

                      >

                        Editar

                      </button>

                      <button

                        onClick={()=>

                          deleteLesson(lesson.id)

                        }

                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"

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

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl shadow-xl w-[650px] p-8">

            <h2 className="text-2xl font-bold mb-6">

              {editing

                ? "Editar Aula"

                : "Nova Aula"}

            </h2>

            <div className="space-y-4">

              <select

                value={classRoomId}

                onChange={(e)=>

                  setClassRoomId(e.target.value)

                }

                className="border rounded-xl p-3 w-full"

              >

                <option value="">

                  Selecione a turma

                </option>

                {classrooms.map((classroom)=>(

                  <option

                    key={classroom.id}

                    value={classroom.id}

                  >

                    {classroom.name}

                  </option>

                ))}

              </select>

              <input

                value={title}

                onChange={(e)=>

                  setTitle(e.target.value)

                }

                placeholder="Título da aula"

                className="border rounded-xl p-3 w-full"

              />

              <input

                type="date"

                value={lessonDate}

                onChange={(e)=>

                  setLessonDate(e.target.value)

                }

                className="border rounded-xl p-3 w-full"

              />

              <textarea

                rows={8}

                value={content}

                onChange={(e)=>

                  setContent(e.target.value)

                }

                placeholder="Conteúdo ministrado"

                className="border rounded-xl p-3 w-full"

              />

            </div>

            <div className="flex justify-end gap-3 mt-8">

              <button

                onClick={()=>{

                  setShowModal(false);

                  setEditing(null);

                }}

                className="border rounded-xl px-5 py-3"

              >

                Cancelar

              </button>

              <button

                onClick={

                  editing

                    ? updateLesson

                    : createLesson

                }

                disabled={

                  !classRoomId ||

                  !title ||

                  !lessonDate

                }

                className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  rounded-xl
                  px-5
                  py-3
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "

              >

                {editing

                  ? "Atualizar Aula"

                  : "Salvar Aula"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}