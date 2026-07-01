"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Menu,
  LayoutDashboard,
  Users,
  UserPlus,
  GraduationCap,
  Building2,
  FileText,
  ClipboardList,
  BookOpen,
  School,
  ChevronDown,
  ChevronRight,
  LogOut,
  BarChart3,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";


export default function Sidebar() {

  const router = useRouter();

  const [collapsed, setCollapsed] =
    useState(false);

  const [openGroup, setOpenGroup] =
    useState<string | null>(null);

   useEffect(() => {

    const saved =
      localStorage.getItem(
        "sidebar-collapsed"
      );

    if (saved) {

      setCollapsed(
        JSON.parse(saved)
      );

    }

  }, []);

  function toggleSidebar() {

    const next =
      !collapsed;

    setCollapsed(next);

    localStorage.setItem(
      "sidebar-collapsed",
      JSON.stringify(next)
    );

  }

  function handleLogout() {

    localStorage.removeItem(
      "token"
    );

    router.push("/login");

  }

  function toggleGroup(
    group: string
  ) {

    setOpenGroup(
      openGroup === group
        ? null
        : group
    );

  }

  function menuClass() {

    return `
      flex items-center gap-3 p-2 rounded
      hover:bg-gray-800
    `;

  }

  return (

    <aside
      className={`
        bg-gray-900
        text-white
        h-screen
        transition-all
        duration-300
        overflow-y-auto

        ${
          collapsed
            ? "w-20"
            : "w-72"
        }
      `}
    >

      <div className="p-4">

        <div className="flex items-center justify-between mb-8">

          {!collapsed && (

            <h1 className="font-bold text-xl">

              People System

            </h1>

          )}

          <button
            onClick={
              toggleSidebar
            }
          >

            <Menu size={22} />

          </button>

        </div>

        <nav className="space-y-2">

          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-800"
          >

            <LayoutDashboard size={18} />

            {!collapsed &&
              "Dashboard"}

          </Link>

          {/* GESTÃO DE PESSOAS */}

          <button
            onClick={() =>
              toggleGroup(
                "people"
              )
            }
            className="w-full flex items-center justify-between p-2 hover:bg-gray-800 rounded"
          >

            <div className="flex items-center gap-3">

              <Users size={18} />

              {!collapsed &&
                "Gestão Pessoas"}

            </div>

            {!collapsed &&
              (
                openGroup ===
                "people"
              )

              ? (
                <ChevronDown size={16} />
              )

              : (
                <ChevronRight size={16} />
              )}

          </button>

          {!collapsed &&
            openGroup ===
              "people" && (

            <div className="ml-8 space-y-2">

              <Link href="/dashboard/people">
                Pessoas
              </Link>

              <br />

              <Link href="/dashboard/candidates">
                Candidatos
              </Link>

              <br />

              <Link href="/dashboard/apprentices">
                Aprendizes
              </Link>

            </div>

          )}


          {/* ACOMPANHAMENTO */}

          <button
            onClick={() =>
              toggleGroup("tracking")
            }
            className="w-full flex items-center justify-between p-2 hover:bg-gray-800 rounded"
          >

            <div className="flex items-center gap-3">

              <AlertTriangle size={18} />

              {!collapsed &&
                "Acompanhamento"}

            </div>

            {!collapsed &&

              (openGroup === "tracking")

                ? (
                  <ChevronDown size={16} />
                )

                : (
                  <ChevronRight size={16} />
                )

            }

          </button>

          {!collapsed &&
            openGroup === "tracking" && (

            <div className="ml-8 space-y-2">

              <Link
                href="/dashboard/absence"
                className="block hover:text-yellow-300"
              >
                Faltas
              </Link>

              <Link
                href="/dashboard/warnings"
                className="block hover:text-yellow-300"
              >
                Advertências
              </Link>

            </div>

          )}

          {/* EMPRESAS */}

          <button
            onClick={() =>
              toggleGroup(
                "companies"
              )
            }
            className="w-full flex items-center justify-between p-2 hover:bg-gray-800 rounded"
          >

            <div className="flex items-center gap-3">

              <Building2 size={18} />

              {!collapsed &&
                "Empresas"}

            </div>

            {!collapsed &&
              (
                openGroup ===
                "companies"
              )

              ? (
                <ChevronDown size={16} />
              )

              : (
                <ChevronRight size={16} />
              )}

          </button>

          {!collapsed &&
            openGroup ===
              "companies" && (

            <div className="ml-8 space-y-2">

              <Link href="/dashboard/companies">
                Empresas
              </Link>

              <br />

              <Link href="/dashboard/contracts">
                Contratos
              </Link>

            </div>

          )}

          {/* PEDAGÓGICO EXECUTIVO */}

          <button
            onClick={() =>
              toggleGroup(
                "executive"
              )
            }
            className="w-full flex items-center justify-between p-2 hover:bg-gray-800 rounded"
          >

            <div className="flex items-center gap-3">

              <GraduationCap size={18} />

              {!collapsed &&
                "Pedagógico Executivo"}

            </div>

            {!collapsed &&
              (
                openGroup ===
                "executive"
              )

              ? (
                <ChevronDown size={16} />
              )

              : (
                <ChevronRight size={16} />
              )}

          </button>

          {!collapsed &&
            openGroup ===
              "executive" && (

            <div className="ml-8 space-y-2">

              <Link href="/dashboard/pedagogico/cursos">
                Cursos
              </Link>

              <br />

              <Link href="/dashboard/pedagogico/aulas">
                Aulas
              </Link>

              <br />

              <Link href="/dashboard/pedagogico/turmas">
                Turmas
              </Link>

              <br />

              <Link href="/dashboard/pedagogico/matriculas">
                Matrículas
              </Link>

              <br />

              <Link href="/dashboard/pedagogico/frequencia">
                Frequência Escolar
              </Link>

              <br />

              <Link href="/dashboard/companyAttendance">
                Frequência Empresa
              </Link>

              <br />

              <Link href="/dashboard/evaluation">
                Avaliações
              </Link>

              <br />

              <Link href="/dashboard/pedagogicalNote">
                Observações
              </Link>

            </div>

          )}

          {/* GESTÃO PEDAGÓGICA */}

          <button
            onClick={() =>
              toggleGroup(
                "management"
              )
            }
            className="w-full flex items-center justify-between p-2 hover:bg-gray-800 rounded"
          >

            <div className="flex items-center gap-3">

              <BarChart3 size={18} />

              {!collapsed &&
                "Gestão Pedagógica"}

            </div>

          </button>

          {!collapsed &&
            openGroup ===
              "management" && (

            <div className="ml-8 space-y-2">

              <Link href="/dashboard/pedagogical">
                Dashboard
              </Link>

              <br />

              <Link href="/dashboard/pedagogical/attendance">
                Frequência
              </Link>

              <br />

              <Link href="/dashboard/pedagogical/evaluations">
                Avaliações
              </Link>

              <br />

              <Link href="/dashboard/pedagogical/risks">
                Riscos
              </Link>

            </div>

          )}

          {/* ADMIN */}

          <Link
            href="/dashboard/reports"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-800"
          >

            <FileText size={18} />

            {!collapsed &&
              "Relatórios"}

          </Link>

          <button
            onClick={
              handleLogout
            }
            className="
              mt-8
              bg-red-600
              w-full
              p-2
              rounded
              flex
              items-center
              justify-center
              gap-2
            "
          >

            <LogOut size={18} />

            {!collapsed &&
              "Sair"}

          </button>

        </nav>

      </div>

    </aside>

  );

}