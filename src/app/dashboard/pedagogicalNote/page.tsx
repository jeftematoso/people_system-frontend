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

} catch (error) {

  console.error(error);

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

              {
                apprentice.person
                  ?.name
              }

            </option>

          )
        )}

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

  <div className="bg-white rounded-2xl shadow-md p-6">

    <h2 className="text-2xl font-bold mb-6">

      Histórico

    </h2>

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

        </tr>

      </thead>

      <tbody>

        {notes.map(
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

            </tr>

          )
        )}

      </tbody>

    </table>

  </div>

</div>


);

}
