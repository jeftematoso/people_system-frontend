interface Props {

  totalStudents: number;

  totalFilled: number;

  classAverage: string;

  excellent: number;

  good: number;

  warning: number;

  critical: number;

}

export function EvaluationDashboard({

  totalStudents,

  totalFilled,

  classAverage,

  excellent,

  good,

  warning,

  critical,

}: Props) {

  return (

    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">

      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-gray-500 text-sm">

          Alunos

        </p>

        <h2 className="text-3xl font-bold mt-2">

          {totalStudents}

        </h2>

      </div>

      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-gray-500 text-sm">

          Avaliados

        </p>

        <h2 className="text-3xl font-bold text-blue-600 mt-2">

          {totalFilled}

        </h2>

      </div>

      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-gray-500 text-sm">

          Média Geral

        </p>

        <h2 className="text-3xl font-bold text-green-600 mt-2">

          {classAverage}

        </h2>

      </div>

      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-gray-500 text-sm">

          Excelente

        </p>

        <h2 className="text-3xl font-bold text-green-600 mt-2">

          {excellent}

        </h2>

      </div>

      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-gray-500 text-sm">

          Bom

        </p>

        <h2 className="text-3xl font-bold text-blue-600 mt-2">

          {good}

        </h2>

      </div>

      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-gray-500 text-sm">

          Atenção

        </p>

        <h2 className="text-3xl font-bold text-yellow-500 mt-2">

          {warning}

        </h2>

      </div>

      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-gray-500 text-sm">

          Crítico

        </p>

        <h2 className="text-3xl font-bold text-red-600 mt-2">

          {critical}

        </h2>

      </div>

    </div>

  );

}   