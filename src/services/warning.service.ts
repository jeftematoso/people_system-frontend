import { api } from "@/services/api";

export const warningService = {

  list: async () => {

    const res =
      await api.get("/warnings");

    return res.data;

  },

  create: async (data: any) => {

    const res =
      await api.post(
        "/warnings",
        data
      );

    return res.data;

  },

};