"use client";

import {
  Bell,
  Search,
  Menu,
} from "lucide-react";

interface HeaderProps {

  collapsed: boolean;

  setCollapsed: (
    value: boolean
  ) => void;

}

export default function Header({
  collapsed,
  setCollapsed,
}: HeaderProps) {

  return (

    <header className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-3xl p-6 flex items-center justify-between shadow-lg">

      <div className="flex items-center gap-4">

        <button
          onClick={() =>
            setCollapsed(
              !collapsed
            )
          }
          className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
        >

          <Menu className="text-white" />

        </button>

        <div>

          <h1 className="text-3xl font-bold text-white">

            Dashboard

          </h1>

          <p className="text-blue-100">

            Painel administrativo

          </p>

        </div>

      </div>

      <div className="flex items-center gap-4">

        <button className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">

          <Bell className="text-white" />

        </button>

        <button className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">

          <Search className="text-white" />

        </button>

        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-lg">

          A

        </div>

      </div>

    </header>

  );

}