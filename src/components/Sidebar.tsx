"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function Sidebar() {

  const router = useRouter();

  function handleLogout() {

    localStorage.removeItem("token");

    router.push("/login");

  }

  return (

    <aside className="w-64 h-screen bg-gray-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-8">
        People System
      </h1>

      <nav className="flex flex-col gap-4">

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/dashboard/people">
          Pessoas
        </Link>

        <Link href="/dashboard/candidates">
          Candidatos
        </Link>

        <Link href="/dashboard/apprentices">
          Aprendizes
        </Link>

        <Link href="/dashboard/companies">
          Empresas
        </Link>

        <Link href="/dashboard/contracts">
          Contratos
        </Link>

        <Link href="/dashboard/absence">
          Faltas
        </Link>

        <Link href="/dashboard/warnings">
          Advertências
        </Link>

        <Link href="/dashboard/reports">
          Relatórios
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 p-2 rounded mt-6"
        >
          Sair
        </button>

      </nav>

    </aside>

  );

}