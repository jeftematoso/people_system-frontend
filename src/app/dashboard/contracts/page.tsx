"use client";

import { useEffect, useState } from "react";

import { contractService } from "@/services/contract.service";

import CreateContractModal from "./components/CreateContractModal";

export default function ContractsPage() {

const [contracts, setContracts] = useState<any[]>([]);

const [openCreate, setOpenCreate] =
useState(false);

useEffect(() => {


loadContracts();

console.log("CONTRATOS", contracts);

}, []);

async function loadContracts() {


try {

  const data =
    await contractService.getAll();

  setContracts(data);

} catch (error) {

  console.error(error);

}


}

return (


<div>

  <div className="mb-8 flex items-center justify-between">

    <div>

      <h1 className="text-4xl font-bold text-gray-800">
        Contratos
      </h1>

      <p className="text-gray-500 mt-2">
        Gestão de contratos
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
      Novo Contrato
    </button>

  </div>

  <CreateContractModal
    open={openCreate}
    onClose={() => setOpenCreate(false)}
    onCreated={loadContracts}
  />

  <div className="bg-white rounded-2xl shadow-md p-6">

    <table className="w-full">

      <thead>

        <tr className="border-b text-left">

          <th className="p-3">
            Aprendiz
          </th>

          <th className="p-3">
            Empresa
          </th>

          <th className="p-3">
            Salário
          </th>

          <th className="p-3">
            Status
          </th>

          <th className="p-3">
            Início
          </th>

          <th className="p-3">
            Fim
          </th>

        </tr>

      </thead>

      <tbody>

        {contracts.map((contract) => (

          <tr
            key={contract.id}
            className="border-b"
          >

            <td className="p-3">
              {contract.apprentice?.person?.name}
            </td>

            <td className="p-3">
              {contract.company?.corporateName}
            </td>

            <td className="p-3">
              R$ {contract.salary}
            </td>

            <td className="p-3">
              {contract.status}
            </td>

            <td className="p-3">

              {contract.startDate
                ? new Date(
                    contract.startDate
                  ).toLocaleDateString("pt-BR")
                : "-"}

            </td>

            <td className="p-3">

              {contract.endDate
                ? new Date(
                    contract.endDate
                  ).toLocaleDateString("pt-BR")
                : "-"}

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>


);

}
