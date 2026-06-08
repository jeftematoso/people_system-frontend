import { api } from "@/services/api";

export const companyService = {

  list: async () => {
    const response = await api.get("/company");
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post("/company", data);
    return response.data;
  },

};