"use client";

import { useEffect, useState } from "react";
import { apprenticeService } from "@/services/apprentice.service";

export default function ApprenticesPage() {

  const [apprentices, setApprentices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {

    try {

      const data = await apprenticeService.list();
      setApprentices(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {
    load();
  }, []);

  return (

    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Apprentices
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (

        <table className="w-full border">

          <thead>
            <tr className="border-b text-left">
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Company</th>
            </tr>
          </thead>

          <tbody>

            {apprentices.map((a) => (

              <tr key={a.id} className="border-t">

                <td>{a.person?.name}</td>
                <td>{a.person?.email}</td>
                <td>{a.status}</td>
                <td>{a.company?.name ?? "-"}</td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );

}