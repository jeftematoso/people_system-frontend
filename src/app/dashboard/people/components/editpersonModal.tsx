"use client";

import { useEffect, useState } from "react";
import { peopleService } from "@/services/people.service";

interface Props {
open: boolean;
onClose: () => void;
onUpdated: () => void;
person: any;
}

export default function EditPersonModal({
open,
onClose,
onUpdated,
person,
}: Props) {

const [form, setForm] = useState({
name: "",
email: "",
role: "CANDIDATE",
});

useEffect(() => {

if (person) {

  setForm({
    name: person.name || "",
    email: person.email || "",
    role: person.role || "CANDIDATE",
  });

}


}, [person]);

async function handleUpdate() {

try {

  await peopleService.update(
    person.id,
    form
  );

  onUpdated();
  onClose();

} catch (error) {

  console.log(error);

}


}

if (!open) return null;

return (


<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

  <div className="bg-white rounded-2xl p-6 w-full max-w-md">

    <h2 className="text-2xl font-bold mb-4">
      Editar Pessoa
    </h2>

    <div className="space-y-3">

      <input
        className="border p-2 w-full rounded-lg"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />

      <input
        className="border p-2 w-full rounded-lg"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <select
        className="border p-2 w-full rounded-lg"
        value={form.role}
        onChange={(e) =>
          setForm({
            ...form,
            role: e.target.value,
          })
        }
      >
        <option value="CANDIDATE">
          Candidato
        </option>

        <option value="APPRENTICE">
          Aprendiz
        </option>

        <option value="ADMIN">
          Administrador
        </option>

      </select>

    </div>

    <div className="flex justify-end gap-3 mt-6">

      <button
        onClick={onClose}
        className="px-4 py-2 border rounded-lg"
      >
        Cancelar
      </button>

      <button
        onClick={handleUpdate}
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
