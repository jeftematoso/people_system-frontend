"use client";

import { useEffect, useState } from "react";
import { warningService } from "@/services/warning.service";

export default function WarningsPage() {

  const [warnings, setWarnings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    apprenticeId: "",
    type: "LEVE",
    reason: "",
    date: "",
  });

  const [open, setOpen] = useState(false);

  async function load() {

    try {

      const data = await warningService.list();
      setWarnings(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  }

  async function handleCreate() {

    try {

      await warningService.create(form);

      setOpen(false);

      setForm({
        apprenticeId: "",
        type: "LEVE",
        reason: "",
        date: "",
      });

      load();

    } catch (err) {

      console.log(err);

    }

  }

  useEffect(() => {
    load();
  }, []);

  return (

    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Warnings
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Warning
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
                <th>Reason</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {warnings.map((w) => (

                <tr key={w.id} className="border-t">

                  <td>{w.apprentice?.person?.name}</td>
                  <td>{w.type}</td>
                  <td>{w.reason}</td>
                  <td>{w.date}</td>

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
              New Warning
            </h2>

            <input
              className="border p-2 w-full"
              placeholder="Apprentice ID"
              value={form.apprenticeId}
              onChange={(e) =>
                setForm({ ...form, apprenticeId: e.target.value })
              }
            />

            <select
              className="border p-2 w-full"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >

              <option value="LEVE">Leve</option>
              <option value="MEDIA">Média</option>
              <option value="GRAVE">Grave</option>

            </select>

            <input
              className="border p-2 w-full"
              placeholder="Reason"
              value={form.reason}
              onChange={(e) =>
                setForm({ ...form, reason: e.target.value })
              }
            />

            <input
              type="date"
              className="border p-2 w-full"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />

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