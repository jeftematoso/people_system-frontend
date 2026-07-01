"use client";

import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [collapsed, setCollapsed] =
    useState(false);

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar
        collapsed={collapsed}
      />

      <main className="flex-1 p-8 overflow-y-auto">

        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <div className="mt-8">

          {children}

        </div>

      </main>

    </div>

  );

}