import { useMemo } from "react";

interface Lesson {
  id: string;
  title: string;
}

interface Evaluation {
  lessonId: string;
  communication: number;
  behavior: number;
  attendance: number;
  performance: number;
}

export function useClassEvolution(

  lessons: Lesson[],

  history: Evaluation[]

) {

  return useMemo(() => {

    return lessons.map((lesson) => {

      const lessonEvaluations = history.filter(

        item => item.lessonId === lesson.id

      );

      if (!lessonEvaluations.length) {

        return {

          lesson: lesson.title,

          average: 0,

        };

      }

      const averages = lessonEvaluations.map(item =>

        (

          item.communication +

          item.behavior +

          item.attendance +

          item.performance

        ) / 4

      );

      const classAverage =

        averages.reduce(

          (sum, value) => sum + value,

          0

        ) / averages.length;

      return {

        lesson: lesson.title,

        average: Number(

          classAverage.toFixed(1)

        ),

      };

    });

  }, [lessons, history]);

}