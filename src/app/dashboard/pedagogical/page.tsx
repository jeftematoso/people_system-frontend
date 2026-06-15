"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function PedagogicalDashboard() {

  const [

    summary,

    setSummary,

  ] = useState<any>(null);

  const [

    ranking,

    setRanking,

  ] = useState<any[]>([]);

  const [

    risks,

    setRisks,

  ] = useState<any[]>([]);

  useEffect(() => {

    async function loadData() {

      try {

        const summaryRes =
          await api.get(
            "/pedagogical-dashboard"
          );

        console.log(
          "SUMMARY:",
          summaryRes.data
        );

        setSummary(
          summaryRes.data
        );

        const rankingRes =
          await api.get(
            "/pedagogical-dashboard/ranking"
          );

        console.log(
          "RANKING:",
          rankingRes.data
        );

        console.log(
          "PRIMEIRO RANKING JSON:",
          JSON.stringify(
            rankingRes.data[0],
            null,
            2
          )
        );

        console.table(
          rankingRes.data
        );

        setRanking(
          rankingRes.data
        );

        const riskRes =
          await api.get(
            "/pedagogical-dashboard/risks"
          );

        console.log(
          "RISKS:",
          riskRes.data
        );

        setRisks(
          riskRes.data
        );

      } catch (error) {

        console.error(
          "ERRO PEDAGOGICO COMPLETO:",
          error
        );

      }

    }

    loadData();

  }, []);

  if (!summary) {

    return (

      <div className="p-6">

        Carregando...

      </div>

    );

  }

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">

        Dashboard Pedagógico

      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-5">

          <div className="text-gray-500">

            Aprendizes

          </div>

          <div className="text-3xl font-bold">

            {summary.totalApprentices}

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <div className="text-gray-500">

            Frequência Média

          </div>

          <div className="text-3xl font-bold">

            {summary.averageAttendance}%

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <div className="text-gray-500">

            Média Geral

          </div>

          <div className="text-3xl font-bold">

            {summary.averageGrade}

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <div className="text-gray-500">

            Riscos Pedagógicos

          </div>

          <div className="text-3xl font-bold">

            {risks.length}

          </div>

        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="font-bold text-lg mb-4">

            Ranking Pedagógico

          </h2>

          {

            ranking.map(

              (item) => (

                <div

                  key={item.apprenticeId}

                  className="border-b py-2"

                >

                  <div className="font-semibold">

                    {item.name}

                  </div>

                  <div>

                    Nota:
                    {item.average}

                  </div>

                </div>

              )

            )

          }

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="font-bold text-lg mb-4">

            Riscos Pedagógicos

          </h2>

          {

            risks.map(

              (item) => (

                <div

                  key={item.apprenticeId}

                  className="border-b py-2"

                >

                  <div className="font-semibold">

                    {item.name}

                  </div>

                  <div>

                    Risco:
                    {item.level}

                  </div>

                </div>

              )

            )

          }

        </div>

      </div>

    </div>

  );

}