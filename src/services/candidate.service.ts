import { api } from "@/services/api";

export const candidateService = {

  list: async () => {
    const response = await api.get("/candidate");
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post("/candidate", data);
    return response.data;
  },

  hire: async (id: string) => {
    const response = await api.post(`/candidate/hire/${id}`);
    return response.data;
  },

};