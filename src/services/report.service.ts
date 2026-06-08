import { api } from "@/services/api";

export const reportService = {

  getSummary: async () => {
    
    const res = await api.get("/reports/summary");
    return res.data;
  },

  getContractsStatus: async () => {
    const res = await api.get("/reports/contracts-status");
    return res.data;
  },


  getCompanyQuota: async (companyId: string) => {

    const response =
      await api.get(`/quotas/company/${companyId}`);

    return response.data;

  },
  
  getContractsExpiringSoon: async () => {

    const response =
       await api.get("/reports/contracts-expiring");

    return response.data;

  },

  getAlerts: async () => {

    const response =
      await api.get("/alerts");

    return response.data;

  },

  getComplianceRanking: async () => {

    const response =
      await api.get(
        "/compliance/ranking"
      );

    return response.data;

  },
  
};