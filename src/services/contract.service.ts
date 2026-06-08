import { api } from "@/services/api";

export const contractService = {

async getAll() {


const res = await api.get("/contract");

return res.data;


},

async create(data: {

apprenticeId: string;
companyId: string;
startDate: string;
endDate: string;
salary: number;
workload: number;


}) {


const res = await api.post(
  "/contract",
  data
);

return res.data;


},

};
