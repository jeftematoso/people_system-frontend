import { api } from "./api";

export const lessonAttendanceService = {

  save: async (
    lessonId: string,
    apprenticeId: string,
    present: boolean
  ) => {

    const res =
      await api.post(
        "/lesson-attendance",
        {
          lessonId,
          apprenticeId,
          present,
        }
      );

    return res.data;

  },

  listByLesson: async (
    lessonId: string
  ) => {

    const res =
      await api.get(
        `/lesson-attendance/${lessonId}`
      );

    return res.data;
      
  },

};  