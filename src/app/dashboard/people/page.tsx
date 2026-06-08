"use client";

import { useEffect, useState } from "react";
import { peopleService } from "@/services/people.service";
import CreatePersonModal from "./components/CreatePersonModal";
import EditPersonModal from "./components/EditPersonModal";

export default function PeoplePage() {

const [people, setPeople] = useState<any[]>([]);
const [loading, setLoading] = useState(false);
const [openCreate, setOpenCreate] = useState(false);
const [openEdit, setOpenEdit] = useState(false);
const [selectedPerson, setSelectedPerson] = useState<any>(null);


async function loadPeople() {

setLoading(true);

try {

  const data = await peopleService.list();
  setPeople(data);

} catch (error) {

  console.log(error);

} finally {

  setLoading(false);

}

}

async function handleDelete(id: string) {

try {

  await peopleService.remove(id);
  loadPeople();

} catch (error) {

  console.log(error);

}

}

useEffect(() => {

loadPeople();

}, []);

return (


<div className="space-y-6">

  <CreatePersonModal
    open={openCreate}
    onClose={() => setOpenCreate(false)}
    onCreated={loadPeople}
  />
  
  <EditPersonModal
    open={openEdit}
    onClose={() => setOpenEdit(false)}
    onUpdated={loadPeople}
    person={selectedPerson}
  />

  <div className="flex items-center justify-between">

    <h1 className="text-3xl font-bold">
      Pessoas
    </h1>

    <button
      onClick={() => setOpenCreate(true)}
      className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-4
        py-2
        rounded-lg
      "
    >
      Nova Pessoa
    </button>

  </div>

  <div className="bg-white rounded-xl shadow">

    {loading ? (

      <div className="p-6">
        Carregando...
      </div>

    ) : (

      <table className="w-full text-sm">

        <thead className="bg-gray-50">

          <tr className="text-left">

            <th className="p-4">
              Nome
            </th>

            <th className="p-4">
              E-mail
            </th>

            <th className="p-4">
              Perfil
            </th>

            <th className="p-4">
              Ações
            </th>

          </tr>

        </thead>

        <tbody>

          {people.map((p) => (

            <tr
              key={p.id}
              className="
                border-t
                hover:bg-gray-50
                transition
              "
            >

              <td className="p-4 font-medium">
                {p.name}
              </td>

              <td className="p-4 text-gray-600">
                {p.email}
              </td>

              <td className="p-4">
                {p.role}
              </td>

              <td className="p-4 flex gap-4">

                <button
                  onClick={() => {

                    setSelectedPerson(p);
                    setOpenEdit(true);

                  }}
                  className="
                   text-blue-600
                   hover:text-blue-800
                   font-medium
                  "
                >
                  Editar
                </button>
                
             
                <button
                  onClick={() => handleDelete(p.id)}
                  className="
                    text-red-600
                    hover:text-red-800
                    font-medium
                  "
                >
                  Excluir
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    )}

  </div>

</div>

);

}
