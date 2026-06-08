import { api } from "@/services/api";

export const absenceService = {

  list: async () => {
    const response = await api.get("/absence");
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post("/absence", data);
    return response.data;
  },

  justify: async (id: string) => {
    const response = await api.patch(`/absence/${id}/justify`);
    return response.data;
  },

};