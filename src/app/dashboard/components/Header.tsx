"use client";

import {
  Bell,
  Search,
} from "lucide-react";

export default function Header() {

  return (

    <header className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-3xl p-6 flex items-center justify-between shadow-lg">

      <div>

        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-blue-100">
          Painel administrativo
        </p>

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