"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function PedagogicalNotePage() {

const [apprentices, setApprentices] =
useState<any[]>([]);

const [notes, setNotes] =
useState<any[]>([]);

const [apprenticeId, setApprenticeId] =
useState("");

const [title, setTitle] =
useState("");

const [description, setDescription] =
useState("");

const [filterApprentice, setFilterApprentice] =
  useState("");

async function loadData() {


try {

  const apprenticeRes =
    await api.get("/apprentice");

  setApprentices(
    apprenticeRes.data
  );

  const noteRes =
    await api.get("/pedagogical-note");

  setNotes(
    noteRes.data
  );

} catch (error: any) {

  console.log("PEDAGOGICAL NOTE ERROR", error);

  console.log(error.response);

  console.log(error.response?.data);

  alert(
    error.response?.data?.error ||
    error.message
  );

}


}

async function createNote() {


try {

  await api.post(
    "/pedagogical-note",
    {

      apprenticeId,

      title,

      description,

      createdBy:
        "ADMIN",

    }
  );

  alert(
    "Observação registrada!"
  );

  setApprenticeId("");

  setTitle("");

  setDescription("");

  loadData();

} catch (error) {

  console.error(error);

  alert(
    "Erro ao salvar observação"
  );

}


}

useEffect(() => {


loadData();


}, []);

const filteredNotes =

  filterApprentice

    ? notes.filter(

        note =>

          note.apprenticeId ===
          filterApprentice

      )

    : notes;

return (

<div className="p-8">

  <h1 className="text-4xl font-bold mb-8">

    Observações Pedagógicas

  </h1>

  <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

    <div className="grid gap-4">

      <select
        value={apprenticeId}
        onChange={(e) =>
          setApprenticeId(e.target.value)
        }
        className="border p-3 rounded-xl mb-4"
      >

        <option value="">
          Selecione um aprendiz
        </option>

        {apprentices.map((apprentice) => (
          <option
            key={apprentice.id}
            value={apprentice.id}
          >
            {apprentice.person?.name}
          </option>
        ))}

      </select>

      <input
        placeholder="Título"
        value={title}
        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
        className="border p-3 rounded-xl"
      />

      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        rows={5}
        className="border p-3 rounded-xl"
      />

    </div>

    <button
      onClick={
        createNote
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

      Registrar Observação

    </button>

  </div>


  <div className="grid grid-cols-3 gap-4 mb-8">

    <div className="bg-white rounded-2xl shadow-md p-6">

      <p className="text-gray-500 text-sm">

        Total Observações

      </p>

      <h2 className="text-3xl font-bold">

        {notes.length}

      </h2>

    </div>

    <div className="bg-white rounded-2xl shadow-md p-6">

      <p className="text-gray-500 text-sm">

        Aprendizes Monitorados

      </p>

      <h2 className="text-3xl font-bold">

        {

          new Set(

            notes.map(
              note =>
                note.apprenticeId
            )

          ).size

        }

      </h2>

    </div>

    <div className="bg-white rounded-2xl shadow-md p-6">

      <p className="text-gray-500 text-sm">

        Observações Filtradas

      </p>

      <h2 className="text-3xl font-bold">

        {filteredNotes.length}

      </h2>

    </div>

  </div>

  <div className="bg-white rounded-2xl shadow-md p-6">

    <h2 className="text-2xl font-bold mb-6">

      Histórico

    </h2>

    <select
      value={filterApprentice}
      onChange={(e) =>
        setFilterApprentice(
          e.target.value
        )
      }
      className="border p-3 rounded-xl mb-6"
    >

      <option value="">
        Todos os aprendizes
      </option>

      {apprentices.map(
        apprentice => (

          <option
            key={apprentice.id}
            value={apprentice.id}
          >

            {apprentice.person?.name}

          </option>

        )
      )}

    </select>


    <table className="w-full">

      <thead>

        <tr className="border-b">

          <th className="text-left pb-4">

            Aprendiz

          </th>

          <th className="text-left pb-4">

            Título

          </th>

          <th className="text-left pb-4">

            Descrição

          </th>

          <th className="text-left pb-4">
            
            Data

          </th>

        </tr>

      </thead>

      <tbody>

        {filteredNotes.map(
          (note) => (

            <tr
              key={note.id}
              className="border-b"
            >

              <td className="py-4">

                {note.apprentice?.person?.name}

              </td>

              <td className="py-4">

                {note.title}

              </td>

              <td className="py-4">

                {note.description}

              </td>

              <td className="py-4">

                {

                  note.noteDate

                    ? new Date(
                        note.noteDate
                      ).toLocaleDateString(
                        "pt-BR"
                      )

                    : "-"

                }

              </td>

              <td className="py-4">

                {note.createdBy || "-"}

              </td>


              <td className="py-4">
                {
                  new Date(
                    note.noteDate
                  ).toLocaleDateString("pt-BR")
                }
              </td>

              <th className="text-left pb-4">
                Criado por
              </th>

              <td className="py-4">
                {note.createdBy}
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
