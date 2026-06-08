import { api } from "@/services/api";

export const apprenticeService = {

  list: async () => {
    const response = await api.get("/apprentice");
    return response.data;
  },

};