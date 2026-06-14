"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { reportService } from "@/services/report.service";
import GraficoStatus from "./components/GraficoStatus";
import GraficoRisco from "./components/GraficoRisco";
import GraficoCompliance from "./components/GraficoCompliance";
import AlertCard from "./components/AlertCard";
import GraficoTendenciaRisco from "./components/GraficoTendenciaRisco";
import GraficoMotivosRisco from "./components/GraficoMotivosRisco";
import GraficoSaudeOperacional from "./components/GraficoSaudeOperacional";
import {exportExecutivePdf} from "@/utils/exportExecutivePdf";


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

  const [quotaData, setQuotaData] = useState<any>(null);

  const [expiringContracts, setExpiringContracts] = useState<any[]>([]);

  const [alerts, setAlerts] = useState<any[]>([]); 

  const [pedagogicalSummary, setPedagogicalSummary] =
  useState<any>(null);

  const [pedagogicalRanking, setPedagogicalRanking] =
  useState<any[]>([]);

  const [pedagogicalRisks, setPedagogicalRisks] =
  useState<any[]>([]);

  const [predictiveRisk, setPredictiveRisk] =
  useState<any[]>([]);
  
  const [complianceRanking, setComplianceRanking] =
  useState<any[]>([]);

  const [selectedRisk, setSelectedRisk] = 
  useState<string | null>(null);

  const [riskFilter, setRiskFilter] =
  useState<string | null>(null);

  const [selectedCompany, setSelectedCompany] =
  useState<string | null>(null);

  const [riskHistory, setRiskHistory] =
  useState<any[]>([]);

  const [contractRisk, setContractRisk] =
  useState<any[]>([]);

  const [aiPredictions, setAiPredictions,] =
  useState<any[]>([]);

  const [executiveReport, setExecutiveReport,] =
  useState<any>();


  useEffect(() => {

  async function loadDashboard() {

    try {

      console.log("Carregando dashboard...");

      // CORRIGIDO
      const res = await api.get("/dashboard");

      console.log("Resumo:", res.data);
 
      setData(res.data);

      try {

        const risk =
        await api.get(
         "/predictive-risk"
        );

        setPredictiveRisk(
          risk.data
        );

        const history =
          await api.get(
            "/predictive-risk/history"
          );

        setRiskHistory(
          history.data
        );

        const compliance =
        await api.get(
         "/compliance/ranking"
        );

        setComplianceRanking(
        compliance.data
        );

        const contractRisk =
        await api.get(
          "/contract-risk"
        );
      
        setContractRisk(
        contractRisk.data
        );

        const ai =
          await api.get(
            "/ai-predictions"
          );

        setAiPredictions(
          ai.data
        );

        const report =
          await api.get(
            "/executive-report"
          );

        setExecutiveReport(
          report.data
        );

        
      } catch (error) {

        console.error(
        "Erro predictive risk:",
        error
      );

    }

      try {

        const pedagogical =
          await api.get(
            "/pedagogical-dashboard"
          );

        setPedagogicalSummary(
          pedagogical.data
        );

        const ranking =
          await api.get(
            "/pedagogical-dashboard/ranking"
        );

        setPedagogicalRanking(
          ranking.data
        );

        const risks =
          await api.get(
            "/pedagogical-dashboard/risks"
        );

        setPedagogicalRisks(
          risks.data
        );

      } catch (error) {

        console.log(
          "Erro módulo pedagógico",
        error
        );
      }


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

        setAlerts(
          alertsRes.data
        );

        const risk =
          await api.get(
            "/predictive-risk"
          );

        console.log(
          "PREDICTIVE RISK:",
          risk.data
        );

        setPredictiveRisk(
          risk.data
        );

      } catch (error) {

        console.error(error);

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

  const generateExecutiveReport = async () => {

    try {

      const report =
        await api.get(
          "/executive-report"
        );

      setExecutiveReport(
        report.data
      );

    } catch (error) {

      console.error(
        "Erro ao gerar relatório",
        error
      );

    }

  };

  const riscoAgrupado = [

      {
        level: "LOW",

        total:
          predictiveRisk.filter(
          r => r.level === "LOW"
        ).length,
      },

      {
        level: "MEDIUM",

        total:
          predictiveRisk.filter(
          r => r.level === "MEDIUM"
        ).length,
      },

      { 
        level: "HIGH",

        total:
          predictiveRisk.filter(
            r => r.level === "HIGH"
        ).length,
      },

      {
        level: "CRITICAL",

        total:
          predictiveRisk.filter(
          r => r.level === "CRITICAL"
        ).length,
      },

    ];

    const filteredRisk =

      predictiveRisk.filter((r) => {

        const levelMatch =

          riskFilter

            ? r.level === riskFilter

            : true;

        const companyMatch =

          selectedCompany

            ? r.company === selectedCompany

            : true;

        return (

          levelMatch &&
          companyMatch

        );

      });

    const criticalCompanies =

      predictiveRisk.filter(

        (r) =>

          r.level === "CRITICAL"

      );

    const highCompanies =

      predictiveRisk.filter(

        (r) =>  

          r.level === "HIGH"

      );

    const riskReasons = {

      quota:

        predictiveRisk.reduce(

          (acc, item) =>

            acc + (item.details?.quota || 0),

          0

        ),

      warnings:

        predictiveRisk.reduce(

          (acc, item) =>

            acc + (item.details?.warnings || 0),

          0

        ),

      attendance:

        predictiveRisk.reduce(

          (acc, item) =>

            acc + (item.details?.attendance || 0),

          0

        ),

      journeys:

        predictiveRisk.reduce(

          (acc, item) =>

            acc + (item.details?.journeys || 0),

          0

        ),

    };

    const riskReasonsChart = [

      {
        reason: "Quota",
        total: riskReasons.quota,
      },

      {
        reason: "Advertências",
        total: riskReasons.warnings,
      },

      {
        reason: "Frequência",
        total: riskReasons.attendance,
      },

      {
        reason: "Jornada",
        total: riskReasons.journeys,
      },

    ];

    const activeContracts =

      chartData.find(
        c => c.status === "ACTIVE"
      )?.total || 0;

    const criticalCount =
      criticalCompanies.length;

    const highCount =
      highCompanies.length;

    const complianceAverage =

      complianceRanking.length

        ? Math.round(

            complianceRanking.reduce(

              (acc, item) =>

                acc + item.score,

              0

            ) /

            complianceRanking.length

          )

        : 0;

    const executiveStatus =

      criticalCount > 0

        ? "CRITICAL"

        : highCount > 3

          ? "ATTENTION"

          : "HEALTHY";

      const contractsExpiringSoon =

        expiringContracts.length;

      const criticalPercentage =

        predictiveRisk.length

          ? Math.round(

              (
                criticalCount
                /
                predictiveRisk.length
              ) * 100

            )

          : 0;

    const operationalHealth =

      Math.max(

        0,

        Math.round(

          complianceAverage

          -

          (criticalCount * 10)

          -

          (highCount * 5)

          -

          contractsExpiringSoon

        )

      );


    const platformMaturity =

      Math.round(

        (

          operationalHealth +

          complianceAverage

        ) / 2

      );


    const operationalLevel =

      operationalHealth >= 80

        ? "HEALTHY"

        : operationalHealth >= 50

          ? "ATTENTION"

          : "CRITICAL";

          const operationalHistory = [

          {
            month: "Jan",
            health:
              Math.max(
                operationalHealth + 15,
                0
              ),
          },

          {
            month: "Fev",
            health:
              Math.max(
                operationalHealth + 10,
                0
              ),
          },

          {
            month: "Mar",
            health:
              Math.max(
                operationalHealth + 6,
                0
              ),
          },

          {
            month: "Abr",
            health:
              Math.max(
                operationalHealth + 3,
                0
              ),
          },

          {
            month: "Mai",
            health:
              operationalHealth,
          },

        ];

        const predictedCriticalCompanies =

          criticalCount +

          Math.ceil(
            highCount * 0.3
          );

        const predictedContractsAtRisk =

          contractRisk.filter(

            item =>
              item.score >= 50

          ).length;

        const predictedCompliance =

          Math.max(

            complianceAverage - 5,

            0

          );


  if (!data) {
  
    return (

      <div className="p-6">
        <p>Carregando dashboard...</p>
      </div>

    );

  }

  return (

    <div
      id="executive-dashboard"
    >
    
      <div className="flex justify-end mb-6">

        <button

          onClick={
            exportExecutivePdf
          }

          className="
            bg-indigo-600
            text-white
            px-4
            py-2
            rounded
            hover:bg-indigo-700
          "
        >

          Exportar Pdf Executivo

        </button>

      </div>

      {executiveReport && (

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

          ...
          
        </div>

      )}

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


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        <div className="bg-white rounded-xl shadow-md p-5">

          <h3 className="text-lg font-bold text-red-600 mb-4">

            Empresas Críticas

          </h3>

          {

            criticalCompanies.length === 0

              ? (

                <p>

                  Nenhuma empresa crítica

                </p>

              )

              : (

                criticalCompanies.map(

                  (item) => (

                    <div

                      key={item.company}

                      className="border-b py-2 cursor-pointer hover:bg-red-50"

                      onClick={() => {

                        setSelectedCompany(
                          item.company
                        );

                        setSelectedRisk(
                          item.company
                        );

                      }}

                    >
                    
                      <div className="font-semibold">

                        {item.company}

                      </div>

                      <div>

                        Score:
                        {item.score}

                      </div>

                    </div>

                  )

                )

              )

          }

        </div>

        <div className="bg-white rounded-xl shadow-md p-5">

          <h3 className="text-lg font-bold text-orange-600 mb-4">

            Empresas Alto Risco

          </h3>

          {

            highCompanies.length === 0

              ? (

                <p>

                  Nenhuma empresa alto risco

                </p>

              )

              : (

                highCompanies.map(

                  (item) => (

                    <div

                      key={item.company}

                      className="border-b py-2"

                    >

                      <div className="font-semibold">

                        {item.company}

                      </div>

                      <div>

                        Score:
                        {item.score}

                      </div>

                    </div>

                  )

                )

              )

          }

        </div>

      </div>

      </div>

      <div className="bg-white rounded-xl shadow-md p-5 mb-6">

        <h3 className="text-lg font-bold mb-4">

          <GraficoMotivosRisco
            dados={riskReasonsChart}/>

        </h3>

        <div className="space-y-4">

          <div>

            <div className="flex justify-between">

              <span>
                Quota insuficiente
              </span>

              <strong>
                {riskReasons.quota}
              </strong>

            </div>

          </div>

          <div>

            <div className="flex justify-between">

              <span>
                Advertências
              </span>

              <strong>
                {riskReasons.warnings}
              </strong>

            </div>

          </div>

          <div>

            <div className="flex justify-between">

              <span>
                Frequência baixa
              </span>

              <strong>
                {riskReasons.attendance}
              </strong>

            </div>

          </div>

          <div>

            <div className="flex justify-between">

              <span>
                Jornada excessiva
              </span>

              <strong>
                {riskReasons.journeys}
              </strong>

            </div>

          </div>

        </div>

      </div>

      <div className="space-y-6 mt-8">


      <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

        <h2 className="text-2xl font-bold mb-4"> 

          Predictive Risk

        </h2>

        <table className="w-full">

         <thead>

          <tr>

            <th className="text-left">
              Empresa
            </th>

            <th className="text-left">
              Score
            </th>

            <th className="text-left">
              Nível
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredRisk.map((item) => (

            <>

              <tr

                key={item.company}

                className="cursor-pointer hover:bg-gray-50"

                onClick={() =>

                  setSelectedRisk(

                    selectedRisk === item.company

                      ? null

                      : item.company

                  )

                }

              >

                <td>
                  {item.company}
                </td>

                <td>
                  {item.score}
                </td>

                <td>
                  {item.level}
                </td>

              </tr>

              {selectedRisk === item.company && (

                <tr>

                  <td
                    colSpan={3}
                    className="bg-gray-50 p-4"
                  >

                    <div className="space-y-2">

                      <div>

                        Quota:
                        <strong>

                          {" "}
                          {item.details.quota}

                        </strong>

                      </div>

                      <div>

                        Advertências:
                        <strong>

                          {" "}
                          {item.details.warnings}

                        </strong>

                      </div>

                      <div>

                        Frequência:
                        <strong>

                          {" "}
                          {item.details.attendance}

                        </strong>

                      </div>

                      <div>

                        Jornada:
                        <strong>

                          {" "}
                          {item.details.journeys}

                        </strong>

                      </div>

                      <hr />

                      <div>

                        Score Total:
                        <strong>

                          {" "}
                          {item.score}

                        </strong>

                      </div>

                    </div>

                  </td>

                </tr>

              )}

            </>

          ))}

        </tbody>

      </table>

    </div>


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
      
      {pedagogicalSummary && (

      <div className="mt-10">

        <h2 className="text-3xl font-bold mb-6">

          Módulo Pedagógico

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h3 className="text-gray-500">
              Turmas
            </h3>

            <p className="text-4xl font-bold text-blue-600 mt-2">
              {pedagogicalSummary.totalClassrooms}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h3 className="text-gray-500">
              Matrículas
            </h3>

            <p className="text-4xl font-bold text-green-600 mt-2">
              {pedagogicalSummary.totalEnrollments}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h3 className="text-gray-500">
              Aulas
            </h3>

            <p className="text-4xl font-bold text-purple-600 mt-2">
              {pedagogicalSummary.totalLessons}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h3 className="text-gray-500">
              Avaliações
            </h3>

            <p className="text-4xl font-bold text-orange-600 mt-2">
              {pedagogicalSummary.totalEvaluations}
            </p>

         </div>

        </div>

      </div>

    )}
     
  
      </div>

      <div className="mt-8">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-white rounded-xl shadow-md p-5">

          <div className="text-sm text-gray-500">

            Contratos Ativos

          </div>

          <div className="text-3xl font-bold">

            {activeContracts}

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-md p-5">

          <div className="text-sm text-gray-500">

            Empresas Críticas

          </div>

          <div className="text-3xl font-bold text-red-600">

            {criticalCount}

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-md p-5">

          <div className="text-sm text-gray-500">

            Empresas Alto Risco

          </div>

          <div className="text-3xl font-bold text-orange-600">

            {highCount}

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-md p-5">

          <div className="text-sm text-gray-500">

            Compliance Médio

          </div>

          <div className="text-3xl font-bold text-green-600">

            {complianceAverage}%

          </div>

        </div>

      </div>

        <GraficoStatus dados={chartData} />

        <GraficoRisco dados={riscoAgrupado} onSelect={(level) => setRiskFilter(level)}/>

        <GraficoTendenciaRisco dados={riskHistory}/>  

        <GraficoCompliance dados={complianceRanking .slice(0, 10)}/>

        <div className="bg-slate-900 text-white rounded-xl shadow-md p-6 mb-6">

          <h2 className="text-xl font-bold mb-4">

            Saúde Operacional

          </h2>

          <div className="flex items-center justify-between">

            <div>

              <div className="text-5xl font-bold">

                {operationalHealth}%

              </div>

            </div>

            <div className="text-3xl">

              {

                operationalLevel === "HEALTHY"

                  ? "🟢"

                  : operationalLevel === "ATTENTION"

                    ? "🟠"

                    : "🔴"

              }

            </div>

          </div>

        </div>


        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-md p-6 mb-6">

          <h2 className="text-xl font-bold mb-3">

            Maturidade Operacional

          </h2>

          <div className="text-5xl font-bold">

            {platformMaturity}%

          </div>

        </div>



        <GraficoSaudeOperacional dados={operationalHistory}/>        
      
        <div className="bg-indigo-950 text-white rounded-xl shadow-md p-6 mb-6">

          <h2 className="text-xl font-bold mb-4">

            Projeção 30 Dias

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div>

              <div className="text-sm opacity-70">

                Empresas críticas previstas

              </div>

              <div className="text-4xl font-bold">

                {predictedCriticalCompanies}

              </div>

            </div>

            <div>

              <div className="text-sm opacity-70">

                Contratos em risco

              </div>

              <div className="text-4xl font-bold">

                {predictedContractsAtRisk}

              </div>

            </div>

            <div>

              <div className="text-sm opacity-70">

                Compliance previsto

              </div>

              <div className="text-4xl font-bold">

                {predictedCompliance}%

              </div>

            </div>

          </div>

        </div>

          <div className="bg-slate-950 text-white rounded-xl shadow-md p-6 mb-6">

            <h2 className="text-xl font-bold mb-4">

              AI Intelligence Center

            </h2>

            {

              aiPredictions

                .slice(0, 5)

                .map((item) => (

                  <div

                    key={item.company}

                    className="border-b py-3"

                  >

                    <div className="font-bold">

                      {item.company}

                    </div>

                    <div>

                      Probabilidade:
                      {item.probability}%

                    </div>

                    <div className="mt-2 text-sm">

                      <div>

                        30 dias:
                        {item.forecast30}%

                      </div>

                      <div>

                        60 dias:
                        {item.forecast60}%

                      </div>

                      <div>

                        90 dias:
                        {item.forecast90}%

                      </div>

                    </div>


                    <div className="text-sm opacity-80">

                      {item.forecast}

                    </div>

                  </div>

                ))

            }

          </div>


        <div className="bg-white rounded-xl shadow-md p-5 mb-6">

          <h3 className="font-bold mb-3">

            Status Executivo

          </h3>

          <div className="text-3xl font-bold">

            {

              executiveStatus === "CRITICAL"

                ? "🔴 CRÍTICO"

                : executiveStatus === "ATTENTION"

                  ? "🟠 ATENÇÃO"

                  : "🟢 SAUDÁVEL"

            }

          </div>

        </div>


        <div className="bg-slate-900 text-white rounded-xl shadow-md p-6 mb-6">

          <h2 className="text-xl font-bold mb-4">

            Centro de Inteligência

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <div className="text-sm opacity-80">

                Contratos vencendo em 30 dias

              </div>

              <div className="text-4xl font-bold">

                {contractsExpiringSoon}

              </div>

            </div>

            <div>

              <div className="text-sm opacity-80">

                Empresas críticas

              </div>

              <div className="text-4xl font-bold">

                {criticalPercentage}%

              </div>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

          <h2 className="text-xl font-bold mb-4">

            Top 10 Contratos que Exigem Ação

          </h2>

          <div className="overflow-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-2">

                    Aprendiz

                  </th>

                  <th className="text-left py-2">

                    Empresa

                  </th>

                  <th className="text-left py-2">

                    Score

                  </th>

                  <th className="text-left py-2">

                    Nível

                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  contractRisk

                    .slice(0, 10)

                    .map((item) => (

                      <tr
                        key={item.contractId}
                        className="border-b"
                      >

                        <td className="py-2">

                          {item.apprentice}

                        </td>

                        <td>

                          {item.company}

                        </td>

                        <td>

                          {item.score}

                        </td>

                        <td>

                          <span

                            className={`

                              px-2 py-1 rounded text-white

                              ${

                                item.level === "CRITICAL"

                                  ? "bg-red-600"

                                  : item.level === "HIGH"

                                  ? "bg-orange-500"

                                  : item.level === "MEDIUM"

                                  ? "bg-yellow-500"

                                  : "bg-green-600"

                              }

                            `}

                          >

                            {item.level}

                          </span>

                        </td>

                      </tr>

                    ))

                }

              </tbody>

            </table>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

          <h2 className="text-xl font-bold mb-4">

            Heatmap Executivo de Empresas

          </h2>

          <div className="space-y-3">

            {

              predictiveRisk.map((item) => (

                <div

                  key={item.company}

                  className="flex justify-between items-center p-3 border rounded cursor-pointer hover:bg-slate-50"

                  onClick={() => {

                    setSelectedCompany(
                      item.company
                    );

                    setSelectedRisk(
                      item.company
                    );

                  }}

                >

                  <div>

                    <strong>

                      {item.company}

                    </strong>

                  </div>

                  <div className="flex items-center gap-3">

                    <span>

                      Score:
                      {item.score}

                    </span>

                    <span>

                      {

                        item.level === "CRITICAL"

                          ? "🔴"

                          : item.level === "HIGH"

                          ? "🟠"

                          : item.level === "MEDIUM"

                          ? "🟡"

                          : "🟢"

                      }

                    </span>

                  </div>

                </div>

              ))

            }

          </div>

        </div>


        <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

          <h2 className="text-2xl font-bold mb-6">

            Ranking Predictive Risk
            {riskFilter && (

              <span className="ml-4 text-sm text-blue-600">

                Filtro:
                {riskFilter && (

                <button

                  onClick={() =>

                    setRiskFilter(null)

                  }

                  className="ml-4 px-3 py-1 bg-gray-200 rounded"

                >

                  Limpar filtro

                </button>

              )}

              {selectedCompany && (

                <button

                  onClick={() => {

                    setSelectedCompany(
                      null
                    );

                    setSelectedRisk(
                      null
                    );

                  }}

                  className="ml-3 px-3 py-1 bg-red-100 rounded"

                >

                  Limpar empresa

                </button>

              )}

              </span>

            )}
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">

                  Empresa

                </th>

                <th className="text-left py-3">

                  Score

                </th>

                <th className="text-left py-3">

                  Nível

                </th>

              </tr>

            </thead>

            <tbody>

              {predictiveRisk.map((item) => (

                <tr
                  key={item.company}
                  className="border-b"
                >

                  <td className="py-3">

                    {item.company}

                  </td>

                  <td className="py-3">

                    {item.score}

                  </td>

                  <td className="py-3">

                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm

                      ${
                        item.level === "LOW"
                          ? "bg-green-500"
                          : item.level === "MEDIUM"
                          ? "bg-yellow-500"
                          : item.level === "HIGH"
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                    >

                      {item.level}

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


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

      <div className="bg-white rounded-3xl shadow-md p-6 mt-8">

        <h2 className="text-2xl font-bold mb-6">

         Ranking Pedagógico

        </h2>

        <div className="space-y-4">

          {pedagogicalRanking.map((student) => (

            <div
              key={student.id}
              className="
                flex
                items-center
                justify-between
                border-b
                pb-4
              "
            >

              <div>

                <h3 className="font-bold">

                  {student.name}

                </h3>

              </div>

              <div className="text-green-600 font-bold text-xl">

                {student.averageGrade}

              </div>

            </div>

          ))}

        </div>
        
        <div className="bg-white rounded-3xl shadow-md p-6 mt-8">

          <h2 className="text-2xl font-bold mb-6 text-red-600">

            Alunos em Risco Pedagógico

          </h2>

          <div className="space-y-4">

           {pedagogicalRisks.map((student) => (

             <div
               key={student.id}
               className="
                 border
                 border-red-200
                 bg-red-50
                 rounded-xl
                 p-4
                "
              >

                <div className="flex justify-between">

                  <h3 className="font-bold">

                    {student.name}

                  </h3>

                  <span className="text-red-600 font-bold">

                    Média: {student.averageGrade}

                  </span>

                </div>

              </div>

            ))}

          </div>

        </div> 


      </div>  

  </div>


    </div>

  );

}