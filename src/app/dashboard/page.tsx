"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { reportService } from "@/services/report.service";
import GraficoStatus from "./components/GraficoStatus";
import AlertCard from "./components/AlertCard";

interface SummaryData {
  totalPeople: number;
  totalCandidates: number;
  totalApprentices: number;
  totalContracts: number;
  totalCompanies: number;
  totalAbsences: number;
  totalWarnings: number;
}

export default function DashboardPage() {

  const [data, setData] = useState<SummaryData | null>(null);

  const [chartData, setChartData] = useState([]);

  const [complianceRanking, setComplianceRanking,] = useState<any[]>([]);

  const [quotaData, setQuotaData] = useState<any>(null);

  const [expiringContracts, setExpiringContracts] = useState<any[]>([]);

  const [alerts, setAlerts] = useState<any[]>([]); 
  

  useEffect(() => {

  async function loadDashboard() {

    try {

      console.log("Carregando dashboard...");

      // CORRIGIDO
      const res = await api.get("/dashboard");

      console.log("Resumo:", res.data);

      setData(res.data);

      try {

        const contracts =
          await reportService.getContractsStatus();

        console.log(
          "CHART DATA:",
          contracts
        );

        setChartData(contracts);

      } catch (error) {

        console.error("Erro contratos:", error);

      }

      try {

        const ranking =
          await api.get("/compliance/ranking");

        setComplianceRanking(ranking.data);

      } catch (error) {

        console.error("Erro ranking:", error);

      }

      try {

        const alertsRes =
          await api.get("/alerts");

        setAlerts(alertsRes.data);

      } catch (error: any) {

         console.error("ERRO DASHBOARD");

         console.log("STATUS:");
         console.log(error?.response?.status);

        console.log("DATA:");
        console.log(error?.response?.data);

      }

      try {

        const expiring =
          await reportService.getContractsExpiringSoon();

        setExpiringContracts(expiring);

      } catch (error) {

        console.error("Erro expiring:", error);

      }

    } catch (error: any) {

      console.error("ERRO DASHBOARD:", error);

      if (error.response) {

        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);

      }

    }

  }

  loadDashboard();

}, []);

  if (!data) {

    return (

      <div className="p-6">
        <p>Carregando dashboard...</p>
      </div>

    );

  }

  return (

    <div>

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Visão geral do sistema
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500 text-sm">
            Pessoas
          </h2>

          <p className="text-5xl font-bold text-blue-600 mt-4">
            {data.totalPeople}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500 text-sm">
            Candidatos
          </h2>

          <p className="text-5xl font-bold text-green-600 mt-4">
            {data.totalCandidates}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500 text-sm">
            Aprendizes
          </h2>

          <p className="text-5xl font-bold text-purple-600 mt-4">
            {data.totalApprentices}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500 text-sm">
            Contratos
          </h2>

          <p className="text-5xl font-bold text-orange-600 mt-4">
            {data.totalContracts}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500 text-sm">
            Faltas
          </h2>

          <p className="text-5xl font-bold text-red-600 mt-4">
            {data.totalAbsences}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500 text-sm">
            Advertências
          </h2>

          <p className="text-5xl font-bold text-yellow-600 mt-4">
            {data.totalWarnings}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500 text-sm">
            Empresas
          </h2>

          <p className="text-5xl font-bold text-cyan-600 mt-4">
            {data.totalCompanies}
          </p>

        </div>

      </div>
      <div className="space-y-6 mt-8">

      {quotaData?.isRisk && (

          <AlertCard
             title="Risco MTE"
             description={
               `
                 Déficit de ${quotaData.deficit}
                 aprendizes.
                 Multa estimada:
                 R$ ${quotaData.estimatedFine}
               `
             }
              color="border-red-300"
          />

        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          {alerts.map((alert, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-red-500"
            >

             <h2 className="text-lg font-bold text-gray-800">
             {alert.title}
            </h2>

            <p className="text-gray-500 mt-2">
             {alert.description}
            </p>

            <span className="text-sm text-red-600 font-semibold mt-4 block">
              {alert.severity}
            </span>

          </div>

        ))}

      </div>
      
      </div>

      <div className="mt-8">

        <GraficoStatus dados={chartData} />

      </div>

      <div className="bg-white rounded-3xl shadow-md p-6 mt-8">

  <h2 className="text-2xl font-bold mb-6">

    Contratos vencendo

  </h2>

  <div className="overflow-x-auto">

        <table className="w-full">

        <thead>

            <tr className="text-left border-b">

             <th className="pb-4">
               Aprendiz
             </th>

             <th className="pb-4">
               Empresa
             </th>

              <th className="pb-4">
                 Vencimento
              </th>

           </tr>

         </thead>

         <tbody>

           {expiringContracts.map((contract) => (

                <tr
                  key={contract.id}
                  className="border-b hover:bg-gray-50"
                >

                <td className="py-4">

                  {contract.apprentice}

                </td>

                
                <td className="py-4">

                 {contract.company}

                </td>

               <td className="py-4 text-red-500 font-semibold">

                 {
                   new Date(
                     contract.endDate
                   ).toLocaleDateString("pt-BR")
                 }

               </td>

             </tr>

           ))}

         </tbody>

       </table>

    </div>

    </div>
    
    <div className="bg-white rounded-3xl shadow-md p-6 mt-8">

    <div className="flex items-center justify-between mb-6">

      <h2 className="text-2xl font-bold">

        Central de Alertas

      </h2>

      <span className="text-sm text-gray-500">

        {alerts.length} alertas

      </span>

    </div>

    <div className="space-y-4">

      {alerts.map((alert) => (

        <div
          key={alert.id}
          className="
            border
            border-red-200
            bg-red-50
            rounded-2xl
            p-4
          "
        >

          <div className="flex justify-between">

            <h3 className="font-bold text-red-700">

              {alert.title}

            </h3>

            <span className="
              text-xs
              bg-red-200
              text-red-800
              px-2
              py-1
              rounded-full
            ">

              {alert.severity}

            </span>

          </div>

          <p className="text-gray-600 mt-2">

            {alert.description}

          </p>

        </div>

      ))}

    </div>

    </div>

      <div className="bg-white rounded-3xl shadow-md p-6 mt-8">

        <h2 className="text-2xl font-bold mb-6">

          Ranking Compliance

        </h2>

      <div className="space-y-4">

        {complianceRanking.map((item) => (

          <div
            key={item.company}
            className="
              flex
              items-center
              justify-between
              border-b
              pb-4
            "
          >

            <div>

              <h3 className="font-bold text-lg">

                {item.company}

              </h3>

              <p className="text-gray-500">

                Risco {item.riskLevel}

              </p>

            </div>

            <div
              className={`
                text-2xl
                font-bold

                ${
                  item.score >= 80
                    ? "text-green-600"

                  : item.score >= 50
                    ? "text-yellow-500"

                  : "text-red-500"
                }
              `}
            >

              {item.score}

            </div>

          </div>

        ))}

      </div>

  </div>


    </div>

  );

}