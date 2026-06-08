"use client";

import { useEffect, useState } from "react";
import { reportService } from "@/services/report.service";

export default function ReportsPage() {

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await reportService.getSummary();
      setData(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Loading reports...</p>;
  }

  return (

    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Reports
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        <Card title="People" value={data?.totalPeople} />
        <Card title="Candidates" value={data?.totalCandidates} />
        <Card title="Apprentices" value={data?.totalApprentices} />
        <Card title="Contracts" value={data?.totalContracts} />
        <Card title="Absences" value={data?.totalAbsences} />
        <Card title="Warnings" value={data?.totalWarnings} />

      </div>

    </div>

  );

}

// 👇 FORA do componente principal (IMPORTANTE)
function Card({ title, value }: any) {
  return (
    <div className="p-4 bg-white shadow rounded">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}