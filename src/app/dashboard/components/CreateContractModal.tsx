"use client";

import { useEffect, useState } from "react";

import { apprenticeService } from "@/services/apprentice.service";
import { companyService } from "@/services/company.service";
import { contractService } from "@/services/contract.service";

interface Props {
open: boolean;
onClose: () => void;
onCreated: () => void;
}

export default function CreateContractModal({
open,
onClose,
onCreated,
}: Props) {

const [apprentices, setApprentices] = useState<any[]>([]);
const [companies, setCompanies] = useState<any[]>([]);

const [form, setForm] = useState({
apprenticeId: "",
companyId: "",
startDate: "",
endDate: "",
salary: 0,
workload: 0,
});

useEffect(() => {


if (!open) return;

loadData();


}, [open]);

async function loadData() {


try {

  const apprenticeData =
    await apprenticeService.list();

  const companyData =
    await companyService.list();
  
  console.log("APRENTICES", apprenticeData);
  console.log("COMPANIES", companyData);

  setApprentices(apprenticeData);
  setCompanies(companyData);

} catch (error) {

  console.log(error);

}


}

async function handleSave() {

console.log("FORM ENVIADO", form);

try {

  const result =
    await contractService.create(form);

    console.log("CONTRATO CRIADO", result);

    onCreated();
    onClose();

  } catch (error) {

    console.error("ERRO AO SALVAR CONTRATO", error);



  }

}

if (!open) return null;

return (


<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

  <div className="bg-white rounded-2xl p-6 w-full max-w-xl space-y-4">

    <h2 className="text-2xl font-bold">
      Novo Contrato
    </h2>

    <select
      className="border p-2 w-full"
      value={form.apprenticeId}
      onChange={(e) =>
        setForm({
          ...form,
          apprenticeId: e.target.value,
        })
      }
    >

      <option value="">
        Selecione o Aprendiz
      </option>

      {apprentices.map((a) => (

        <option
          key={a.id}
          value={a.id}
        >
          {a.person?.name}
        </option>

      ))}

    </select>

    <select
      className="border p-2 w-full"
      value={form.companyId}
      onChange={(e) =>
        setForm({
          ...form,
          companyId: e.target.value,
        })
      }
    >

      <option value="">
        Selecione a Empresa
      </option>

      {companies.map((c) => (

        <option
         key={c.id}
         value={c.id}
        >
          {c.corporateName}
        </option>

      ))}

    </select>

    <input
      type="date"
      className="border p-2 w-full"
      value={form.startDate}
      onChange={(e) =>
        setForm({
          ...form,
          startDate: e.target.value,
        })
      }
    />

    <input
      type="date"
      className="border p-2 w-full"
      value={form.endDate}
      onChange={(e) =>
        setForm({
          ...form,
          endDate: e.target.value,
        })
      }
    />

    <input
      type="number"
      placeholder="Salário"
      className="border p-2 w-full"
      value={form.salary}
      onChange={(e) =>
        setForm({
          ...form,
          salary: Number(e.target.value),
        })
      }
    />

    <input
      type="number"
      placeholder="Carga Horária"
      className="border p-2 w-full"
      value={form.workload}
      onChange={(e) =>
        setForm({
          ...form,
          workload: Number(e.target.value),
        })
      }
    />

    <div className="flex justify-end gap-3">

      <button
        onClick={onClose}
        className="px-4 py-2 border rounded-lg"
      >
        Cancelar
      </button>

      <button
        onClick={handleSave}
        className="
          bg-blue-600
          text-white
          px-4
          py-2
          rounded-lg
        "
      >
        Salvar
      </button>

    </div>

  </div>

</div>


);

}
