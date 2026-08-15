import { EvaluationMap } from "../types";

export function calculateAverage(item?: {
  communication: number;
  behavior: number;
  attendance: number;
  performance: number;
}) {
  if (!item) return 0;

  const total =
    Number(item.communication) +
    Number(item.behavior) +
    Number(item.attendance) +
    Number(item.performance);

  return Number((total / 4).toFixed(1));
}

export function getAverageColor(

  media: number

) {

  if (media < 5)

    return "text-red-600";

  if (media < 7)

    return "text-yellow-600";

  if (media < 9)

    return "text-blue-600";

  return "text-green-600";

}

export function getAverageBadge(

  media: number

) {

  if (media >= 9) {

    return {

      text: "Excelente",

      color:
        "bg-green-100 text-green-700",

    };

  }

  if (media >= 7) {

    return {

      text: "Bom",

      color:
        "bg-blue-100 text-blue-700",

    };

  }

  if (media >= 5) {

    return {

      text: "Atenção",

      color:
        "bg-yellow-100 text-yellow-700",

    };

  }

  return {

    text: "Crítico",

    color:
      "bg-red-100 text-red-700",

  };

}

export function getScoreColor(

  score: number

) {

  if (score <= 4)

    return "bg-red-100 text-red-700";

  if (score <= 6)

    return "bg-yellow-100 text-yellow-700";

  if (score <= 8)

    return "bg-blue-100 text-blue-700";

  return "bg-green-100 text-green-700";

}