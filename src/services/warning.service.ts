import { api } from "@/services/api";

export const warningService = {

  list: async () => {
    const res = await api.get("/warning");
    return res.data;
  },

  create: async (data: any) => {
    const res = await api.post("/warning", data);
    return res.data;
  }

};