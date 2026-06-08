"use client";

import { useEffect, useState } from "react";
import { candidateService } from "@/services/candidate.service";
import CreateCandidateModal from "./components/CreateCandidateModal";

export default function CandidatesPage() {

const [candidates, setCandidates] = useState<any[]>([]);
const [openCreate, setOpenCreate] = useState(false);

useEffect(() => {


loadCandidates();


}, []);

async function loadCandidates() {


try {

  const data = await candidateService.list();

  setCandidates(data);

} catch (error) {

  console.error(error);

}


}

async function handleHire(id: string) {


try {

  await candidateService.hire(id);

  loadCandidates();

} catch (error) {

  console.error(error);

}


}

return (


<div>

  <div className="mb-8 flex items-center justify-between">

    <div>

      <h1 className="text-4xl font-bold text-gray-800">
        Candidatos
      </h1>

      <p className="text-gray-500 mt-2">
        Gestão de candidatos
      </p>

    </div>

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
      Novo Candidato
    </button>

  </div>

  <CreateCandidateModal
    open={openCreate}
    onClose={() => setOpenCreate(false)}
    onCreated={loadCandidates}
  />

  <div className="bg-white rounded-2xl shadow-md p-6">

    <table className="w-full">

      <thead>

        <tr className="border-b text-left">

          <th className="p-3">
            Nome
          </th>

          <th className="p-3">
            Status
          </th>

          <th className="p-3">
            Observações
          </th>

          <th className="p-3">
            Ações
          </th>

        </tr>

      </thead>

      <tbody>

        {candidates.map((candidate) => (

          <tr
            key={candidate.id}
            className="border-b"
          >

            <td className="p-3">
              {candidate.person?.name}
            </td>

            <td className="p-3">
              {candidate.status}
            </td>

            <td className="p-3">
              {candidate.notes}
            </td>

            <td className="p-3">

              {candidate.status !== "CONTRATADO" && (

                <button
                  onClick={() =>
                    handleHire(candidate.id)
                  }
                  className="
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    px-3
                    py-1
                    rounded-lg
                  "
                >
                  Contratar
                </button>

              )}

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>


);

}
