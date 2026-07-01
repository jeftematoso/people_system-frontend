"use client";

import { useEffect, useState } from "react";
import { absenceService } from "@/services/absence.service";
import { apprenticeService } from "@/services/apprentice.service";

export default function AbsencePage() {

  const [absences, setAbsences] = useState<any[]>([]);
  const [apprentices, setApprentices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  const [form, setForm] = useState({
    apprenticeId: "",
    type: "TEORICO",
    justified: false,
    date: new Date().toISOString().split("T")[0],
  });

  const [open, setOpen] = useState(false);

  async function load() {

    try {

      const data =
        await absenceService.list();

      setAbsences(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  }

  async function handleCreate() {

  try {

    await absenceService.create({
          apprenticeId: form.apprenticeId,
          type: form.type,
          justified: form.justified,
          date: form.date,
        });

        setOpen(false);

        setForm({
          apprenticeId: "",
          type: "TEORICO",
          justified: false,
          date: "",
        });

        load();

      } catch (err) {

        console.log(err);

      }

    } // <-- ESTA CHAVE ESTAVA FALTANDO

    async function loadApprentices() {

      try {

        const data =
          await apprenticeService.list();

        setApprentices(data);

      } catch (err) {

        console.log(err);

      }

    }


  async function loadApprentices() {

    try {

      const data =
        await apprenticeService.list();

      setApprentices(data);

    } catch (err) {

      console.log(err);

    }

  }


  useEffect(() => {

  load();

  loadApprentices();

  }, []);

  return (

    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Absences
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Absence
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white p-4 rounded shadow">

        {loading ? (
          <p>Loading...</p>
        ) : (

          <table className="w-full">

            <thead>
              <tr className="text-left border-b">
                <th>Apprentice</th>
                <th>Type</th>
                <th>Justified</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {absences.map((a) => (

                <tr key={a.id} className="border-t">

                  <td>{a.apprentice?.person?.name}</td>
                  <td>{a.type}</td>
                  <td>{a.justified ? "Yes" : "No"}</td>
                  <td>{new Date(a.date).toLocaleDateString("pt-BR",{timeZone: "America/Sao_Paulo",})}</td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* MODAL */}
      {open && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded w-96 space-y-3">

            <h2 className="text-xl font-bold">
              New Absence
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
                Select Apprentice
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

            <select
              className="border p-2 w-full"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >

              <option value="TEORICO">Teorico</option>
              <option value="PRATICO">Pratico</option>

            </select>

            <input
              type="date"
              className="border p-2 w-full"
              value={form.date}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e.target.value,
                })
              }
            />

            <label className="flex items-center gap-2">

              <input
                type="checkbox"
                checked={form.justified}
                onChange={(e) =>
                  setForm({ ...form, justified: e.target.checked })
                }
              />

              Justified

            </label>

            <div className="flex justify-end gap-2">

              <button onClick={() => setOpen(false)}>
                Cancel
              </button>

              <button
                onClick={handleCreate}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}