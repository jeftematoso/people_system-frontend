import { useMemo } from "react";

export function usePedagogicalInsights(
  students: any[],
  evaluations: Record<string, any>,
  calculateAverage: (evaluation: any) => number
) {

  return useMemo(() => {

    const ranking = students
      .map((student) => ({

        apprenticeId: student.apprenticeId,

        name:
          student.apprentice?.person?.name ??
          "Sem nome",

        average: calculateAverage(
          evaluations[student.apprenticeId]
        ),

      }))
      .filter(student => student.average > 0)
      .sort(
        (a, b) =>
          b.average - a.average
      );

    return {

      ranking,

      topStudents:
        ranking.slice(0, 3),

      criticalStudents:
        ranking.filter(
          student => student.average < 5
        ),

      warningStudents:
        ranking.filter(
          student =>
            student.average >= 5 &&
            student.average < 7
        ),

      goodStudents:
        ranking.filter(
          student =>
            student.average >= 7 &&
            student.average < 9
        ),

      excellentStudents:
        ranking.filter(
          student =>
            student.average >= 9
        ),

    };

  }, [students, evaluations]);

}