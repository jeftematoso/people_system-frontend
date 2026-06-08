"use client";

import { useEffect, useState } from "react";
import { companyService } from "@/services/company.service";

export default function CompaniesPage() {

  const [companies, setCompanies] = useState<any[]>([]);

  const [corporateName, setCorporateName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cnae, setCnae] = useState("");
  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {

    const data = await companyService.list();

    console.log("EMPRESAS:", data);

    setCompanies(data);

  }

  async function handleCreateCompany(
    e: React.FormEvent
  ) {

    e.preventDefault();

    await companyService.create({
      corporateName,
      cnpj,
      cnae,
      totalEmployees,
    });

    setCorporateName("");
    setCnpj("");
    setCnae("");
    setTotalEmployees(0);

    await loadCompanies();
    
  }

  return (

    <div>

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            Empresas
          </h1>

          <p className="text-gray-500 mt-2">
            Gestão de empresas parceiras
          </p>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

        <h2 className="text-xl font-bold mb-4">
          Nova Empresa
        </h2>

        <form
          onSubmit={handleCreateCompany}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

        <input
          placeholder="Razão Social"
          value={corporateName}
          onChange={(e) =>
            setCorporateName(e.target.value)
          } 
          className="border rounded p-3"
        />

        <input
          placeholder="CNPJ"
          value={cnpj}
          onChange={(e) =>
            setCnpj(e.target.value)
          }
          className="border rounded p-3"
        />

        <input
          placeholder="CNAE"
          value={cnae}
          onChange={(e) =>
            setCnae(e.target.value)
          }
          className="border rounded p-3"
        />

        <input
          type="number"
          placeholder="Funcionários"
          value={totalEmployees}
          onChange={(e) =>
            setTotalEmployees(Number(e.target.value))
          }
          className="border rounded p-3"
        />

          <button
            type="submit"
            className="bg-blue-600 text-white rounded p-3 md:col-span-2"
          >
            Cadastrar Empresa
          </button>

        </form>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">

        <table className="w-full">

          <thead>

            <tr className="border-b text-left">

              <th className="p-3">Razão Social</th>
              <th className="p-3">CNPJ</th>
              <th className="p-3">CNAE</th>
              <th className="p-3">Funcionários</th>

            </tr>

          </thead>

          <tbody>

            {companies.map((company) => (

              <tr
                key={company.id}
                className="border-b"
              >

                <td className="p-3">
                  {company.corporateName}
                </td>

                <td className="p-3">
                  {company.cnpj}
                </td>

                <td className="p-3">
                  {company.cnae ?? "-"}
                </td>

                <td className="p-3">
                  {company.totalEmployees}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}