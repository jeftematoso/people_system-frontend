"use client";

interface Props {
  insights: {
    topStudents: any[];
    criticalStudents: any[];
    warningStudents: any[];
    goodStudents: any[];
    excellentStudents: any[];
  };
}

export default function PedagogicalInsights({
  insights,
}: Props) {

  return (

    <div className="bg-white rounded-2xl shadow p-6 mb-8">

      <h2 className="text-2xl font-bold mb-6">

        Insights Pedagógicos

      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        <div>

          <h3 className="font-bold text-green-600 mb-4">

            🏆 Destaques

          </h3>

          {

            insights.topStudents.length === 0 && (

              <p className="text-gray-400">

                Nenhuma avaliação lançada.

              </p>

            )

          }

          {

            insights.topStudents.map((student,index)=>(

              <div
                key={index}
                className="flex justify-between border-b py-2"
              >

                <span>

                  {student.name}

                </span>

                <strong>

                  {student.average}

                </strong>

              </div>

            ))

          }

        </div>

        <div>

          <h3 className="font-bold text-red-600 mb-4">

            ⚠ Necessitam atenção

          </h3>

          {

            insights.criticalStudents.length === 0 && (

              <p className="text-gray-400">

                Nenhum aluno crítico.

              </p>

            )

          }

          {

            insights.criticalStudents.map((student,index)=>(

              <div
                key={index}
                className="flex justify-between border-b py-2"
              >

                <span>

                  {student.name}

                </span>

                <strong>

                  {student.average}

                </strong>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );

}