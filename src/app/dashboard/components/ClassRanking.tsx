    "use client";

interface StudentRank {

  apprenticeId: string;

  name: string;

  average: number;

}

interface Props {

  ranking: StudentRank[];

}

export default function ClassRanking({

  ranking,

}: Props) {

  if (!ranking.length) return null;

  return (

    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">

        🏆 Ranking da Turma

      </h2>

      <div className="space-y-3">

        {ranking.map((student, index) => (

          <div

            key={student.apprenticeId}

            className="flex justify-between items-center border-b pb-2"

          >

            <div className="flex gap-3 items-center">

              <span className="font-bold w-8">

                {index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : `${index + 1}º`}

              </span>

              <span>

                {student.name}

              </span>

            </div>

            <span className="font-bold text-blue-600">

              {student.average.toFixed(1)}

            </span>

          </div>

        ))}

      </div>

    </div>

  );

}