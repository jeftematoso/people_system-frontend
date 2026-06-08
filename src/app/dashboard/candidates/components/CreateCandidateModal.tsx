"use client";

import { useEffect, useState } from "react";
import { candidateService } from "@/services/candidate.service";
import { peopleService } from "@/services/people.service";

interface Props {
open: boolean;
onClose: () => void;
onCreated: () => void;
}

export default function CreateCandidateModal({
open,
onClose,
onCreated,
}: Props) {

const [people, setPeople] = useState<any[]>([]);

const [form, setForm] = useState({
personId: "",
status: "TRIAGEM",
notes: "",
});

useEffect(() => {


if (open) {

  loadPeople();

}


}, [open]);

async function loadPeople() {


try {

  const data =
    await peopleService.list();

  setPeople(data);

} catch (error) {

  console.log(error);

}


}

async function handleCreate() {


try {

  await candidateService.create(
    form
  );

  onCreated();
  onClose();

  setForm({
    personId: "",
    status: "TRIAGEM",
    notes: "",
  });

} catch (error) {

  console.log(error);

}


}

if (!open) return null;

return (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

  <div className="bg-white rounded-2xl p-6 w-full max-w-md">

    <h2 className="text-2xl font-bold mb-4">
      Novo Candidato
    </h2>

    <div className="space-y-3">

      <select
        className="border p-2 w-full rounded-lg"
        value={form.personId}
        onChange={(e) =>
          setForm({
            ...form,
            personId: e.target.value,
          })
        }
      >

        <option value="">
          Selecione uma pessoa
        </option>

        {people.map((person) => (

          <option
            key={person.id}
            value={person.id}
          >
            {person.name}
          </option>

        ))}

      </select>

      <select
        className="border p-2 w-full rounded-lg"
        value={form.status}
        onChange={(e) =>
          setForm({
            ...form,
            status: e.target.value,
          })
        }
      >

        <option value="TRIAGEM">
          TRIAGEM
        </option>

        <option value="ENTREVISTA">
          ENTREVISTA
        </option>

        <option value="APROVADO">
          APROVADO
        </option>

        <option value="REPROVADO">
          REPROVADO
        </option>

      </select>

      <textarea
        className="border p-2 w-full rounded-lg"
        placeholder="Observações"
        value={form.notes}
        onChange={(e) =>
          setForm({
            ...form,
            notes: e.target.value,
          })
        }
      />

    </div>

    <div className="flex justify-end gap-3 mt-6">

      <button
        onClick={onClose}
        className="px-4 py-2 border rounded-lg"
      >
        Cancelar
      </button>

      <button
        onClick={handleCreate}
        className="
          bg-blue-600
          hover:bg-blue-700
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
