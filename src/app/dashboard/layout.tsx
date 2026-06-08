import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

       <main className="flex-1 p-8 overflow-y-auto">

        <Header />

        <div className="mt-8">

          {children}

        </div>

      </main>

    </div>

  );

}