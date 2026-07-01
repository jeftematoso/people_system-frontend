"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/services/api";

interface Course {
  id: string;
  name: string;
}

interface Enrollment {
  id: string;
}

interface Classroom {
  id: string;
  name: string;
  courseId: string;
  startDate: string;
  endDate?: string | null;
  createdAt: string;
  course?: Course;
  enrollments?: Enrollment[];
}

export default function TurmasPage() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Classroom | null>(null);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [apprentices, setApprentices] = useState<any[]>([]);
  const [selectedApprentice, setSelectedApprentice] = useState("");
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const availableApprentices = apprentices.filter(
    (apprentice: any) =>
      !enrollments.some(
        (enrollment: any) => enrollment.apprenticeId === apprentice.id
      )
  );

  async function loadData() {
    try {
      setLoading(true);
      const [classroomRes, courseRes, apprenticeRes] = await Promise.all([
        api.get("/classroom"),
        api.get("/course"),
        api.get("/apprentice"),
      ]);

      setClassrooms(classroomRes.data);
      setCourses(courseRes.data);
      setApprentices(apprenticeRes.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const filteredClassrooms = useMemo(() => {
    return classrooms.filter((item) => {
      const value = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(value) ||
        item.course?.name?.toLowerCase().includes(value)
      );
    });
  }, [classrooms, search]);

  const activeClassrooms = useMemo(() => {
    return classrooms.filter(
      (classroom) =>
        !classroom.endDate || new Date(classroom.endDate) >= new Date()
    ).length;
  }, [classrooms]);

  const totalStudents = useMemo(() => {
    return classrooms.reduce(
      (acc, classroom) => acc + (classroom.enrollments?.length || 0),
      0
    );
  }, [classrooms]);

  function resetForm() {
    setName("");
    setCourseId("");
    setStartDate("");
    setEndDate("");
    setEditing(null);
  }

  function openNewModal() {
    resetForm();
    setShowModal(true);
  }

  function openEditModal(classroom: Classroom) {
    setEditing(classroom);
    setName(classroom.name);
    setCourseId(classroom.courseId);
    setStartDate(classroom.startDate.substring(0, 10));
    setEndDate(classroom.endDate ? classroom.endDate.substring(0, 10) : "");
    setShowModal(true);
  }

  async function openEnrollmentModal(classroom: Classroom) {
    setSelectedClassroom(classroom);
    setEnrollments(classroom.enrollments || []);
    setSelectedApprentice("");
    setShowEnrollmentModal(true);
  }

  async function createClassroom() {
    try {
      await api.post("/classroom", {
        name,
        courseId,
        startDate,
        endDate,
      });
      alert("Turma cadastrada com sucesso!");
      setShowModal(false);
      resetForm();
      loadData();
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar turma.");
    }
  }

  async function updateClassroom() {
    if (!editing) return;
    try {
      await api.put(`/classroom/${editing.id}`, {
        name,
        courseId,
        startDate,
        endDate,
      });
      alert("Turma atualizada com sucesso!");
      setShowModal(false);
      resetForm();
      loadData();
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar turma.");
    }
  }

  async function deleteClassroom(id: string) {
    if (!confirm("Deseja realmente excluir esta turma?")) return;
    try {
      await api.delete(`/classroom/${id}`);
      alert("Turma removida.");
      loadData();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir turma.");
    }
  }

  async function createEnrollment() {
    if (!selectedClassroom || !selectedApprentice) return;
    try {
      await api.post("/enrollment", {
        classRoomId: selectedClassroom.id,
        apprenticeId: selectedApprentice,
      });
      await loadData();
      const classroomUpdated = classrooms.find(
        (c) => c.id === selectedClassroom.id
      );
      if (classroomUpdated) {
        setEnrollments(classroomUpdated.enrollments || []);
        setSelectedClassroom(classroomUpdated);
      }
      setSelectedApprentice("");
    } catch (error) {
      console.error(error);
      alert("Erro ao matricular.");
    }
  }
  ////////

  async function removeEnrollment(
    enrollmentId: string
  ) {

    if (
      !confirm(
        "Deseja remover esta matrícula?"
      )
    ) return;

    try {

      await api.delete(
        `/enrollment/${enrollmentId}`
      );

      if (!selectedClassroom) return;

      const response =
        await api.get("/classroom");

      setClassrooms(response.data);

      const updated =
        response.data.find(
          (c: any) =>
            c.id === selectedClassroom.id
        );

      if (updated) {

        setSelectedClassroom(updated);

        setEnrollments(
          updated.enrollments || []
        );

      }

    } catch (error) {

      console.error(error);

      alert("Erro ao remover matrícula.");

    }

  }
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Turmas</h1>
          <p className="text-gray-500 mt-2">Gestão das turmas pedagógicas</p>
        </div>
        <button
          onClick={openNewModal}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl shadow"
        >
          + Nova Turma
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Total de Turmas</p>
          <h2 className="text-4xl font-bold mt-2">{classrooms.length}</h2>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Turmas Ativas</p>
          <h2 className="text-4xl font-bold mt-2 text-green-600">
            {activeClassrooms}
          </h2>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Aprendizes Matriculados</p>
          <h2 className="text-4xl font-bold mt-2 text-blue-600">
            {totalStudents}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar turma..."
            className="border rounded-xl px-4 py-3 w-96"
          />
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-500">
            Carregando turmas...
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-4">Turma</th>
                <th className="text-left pb-4">Curso</th>
                <th className="text-left pb-4">Início</th>
                <th className="text-left pb-4">Fim</th>
                <th className="text-center pb-4">Aprendizes</th>
                <th className="text-center pb-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClassrooms.map((classroom) => (
                <tr
                  key={classroom.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4 font-medium">{classroom.name}</td>
                  <td className="py-4"> {classroom.course?.name}</td>
                  <td className="py-4">
                    {new Date(classroom.startDate).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="py-4">
                    {classroom.endDate
                      ? new Date(classroom.endDate).toLocaleDateString("pt-BR")
                      : "-"}
                  </td>
                  <td className="text-center py-4">
                    <button
                      onClick={() => openEnrollmentModal(classroom)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                    >
                      {classroom.enrollments?.length || 0} Matriculados
                    </button>
                  </td>
                  <td className="py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => openEditModal(classroom)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteClassroom(classroom.id)}
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
          <div className="bg-white rounded-2xl shadow-xl w-[600px] p-8">
            <h2 className="text-2xl font-bold mb-6">
              {editing ? "Editar Turma" : "Nova Turma"}
            </h2>
            <div className="space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome da Turma"
                className="border rounded-xl p-3 w-full"
              />
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="border rounded-xl p-3 w-full"
              >
                <option value="">Selecione um curso</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded-xl p-3 w-full"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded-xl p-3 w-full"
              />
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="border rounded-xl px-5 py-3"
              >
                Cancelar
              </button>
              <button
                onClick={editing ? updateClassroom : createClassroom}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-3"
              >
                {editing ? "Atualizar" : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEnrollmentModal && selectedClassroom && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[700px] p-8">
            <h2 className="text-2xl font-bold mb-2">Matrículas</h2>
            <p className="text-gray-500 mb-6">
              Turma: <strong> {selectedClassroom.name}</strong>
            </p>
            <div className="space-y-3 max-h-72 overflow-auto border rounded-xl p-4">
              {enrollments.length === 0 ? (
                <p className="text-gray-500">Nenhum aprendiz matriculado.</p>
              
              ) : (

                <div className="mt-6">

                  <div className="flex justify-between items-center mb-4">

                    <h3 className="text-lg font-semibold">

                      Aprendizes Matriculados

                    </h3>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">

                      {enrollments.length} matriculado(s)

                    </span>

                  </div>

                  <div className="border rounded-xl overflow-hidden">

                    <table className="w-full">

                      <thead className="bg-gray-100">

                        <tr>

                          <th className="text-left p-3">

                            Nome

                          </th>

                          <th className="text-left p-3">

                            CPF

                          </th>

                          <th className="text-center p-3">

                            Ações

                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {enrollments.map((item: any) => (

                          <tr
                            key={item.id}
                            className="border-t hover:bg-gray-50 transition"
                          >

                            <td className="p-3 font-medium">

                              {item.apprentice?.person?.name}

                            </td>

                            <td className="p-3">

                              {item.apprentice?.person?.cpf || "-"}

                            </td>

                            <td className="p-3 text-center">

                              <button
                                onClick={() => removeEnrollment(item.id)}
                                className="
                                  bg-red-600
                                  hover:bg-red-700
                                  text-white
                                  px-4
                                  py-2
                                  rounded-lg
                                  transition
                                "
                              >

                                Remover

                              </button>

                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                </div>

              )}

            </div>
            <div className="mt-6">
              <select
                value={selectedApprentice}
                onChange={(e) => setSelectedApprentice(e.target.value)}
                className="border rounded-xl p-3 w-full"
              >
                <option value="">Selecionar aprendiz...</option>
                {availableApprentices.map((apprentice: any) => (
                  <option key={apprentice.id} value={apprentice.id}>
                    {apprentice.person?.name}
                  </option>
                ))}
              </select>
              {availableApprentices.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Todos os aprendizes já estão matriculados nesta turma.
                </p>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowEnrollmentModal(false)}
                className="border rounded-xl px-5 py-3"
              >
                Fechar
              </button>
              <button
                disabled={!selectedApprentice}
                onClick={createEnrollment}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Matricular
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}