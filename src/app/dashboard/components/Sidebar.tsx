"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  FileText,
  Building2,
  BarChart3,
} from "lucide-react";
import { LogOut } from "lucide-react";
import { GraduationCap } from "lucide-react";

export default function Sidebar() {

  const router = useRouter();

  return (

    <aside className="w-72 min-h-screen bg-gradient-to-b from-blue-950 to-blue-800 text-white p-6 flex flex-col">

      <div className="mb-12">

        <h1 className="text-4xl font-bold">
          Jovem
        </h1>

        <p className="text-3xl font-light">
          Aprendiz
        </p>

      </div>

      <nav className="flex flex-col gap-3">

        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-blue-700 transition-all"
        >

          <LayoutDashboard size={22} />

          <span>Dashboard</span>

        </Link>

        <Link
          href="/dashboard/people"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-blue-700 transition-all"
>
          <Users size={22} />
          <span>Pessoas</span>

        </Link>

        <Link
          href="/dashboard/candidates"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-blue-700 transition-all"
        >
        
          <Users size={22} />

          <span>Candidatos</span>

        </Link>
        
        <Link
          href="/dashboard/apprentices"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-blue-700 transition-all"
        >

          <Users size={22} />

          <span>Aprendizes</span>

        </Link>

        <Link
          href="/dashboard/contracts"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-blue-700 transition-all"
        >

          <FileText size={22} />

          <span>Contratos</span>

        </Link>

        <Link
          href="/dashboard/companies"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-blue-700 transition-all"
        >

          <Building2 size={22} />

          <span>Empresas</span>

        </Link>

        <Link
          href="/dashboard/reports"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-blue-700 transition-all"
        >

          <BarChart3 size={22} />

          <span>Relatórios</span>

        </Link>

      </nav>
      <div className="mt-auto pt-10">

        <button
         className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-500 transition-all"
         onClick={() => {

          localStorage.removeItem("token");

          router.push("/login");

        }}
      >

        <LogOut size={22} />

        <span>Sair</span>

      </button>

    </div>
    </aside>

  );

}