import { api } from "@/services/api";

export const peopleService = {

list: async () => {


const response = await api.get("/person");
return response.data;


},

create: async (data: any) => {

const response = await api.post("/person", data);
return response.data;


},

update: async (


id: string,
data: any


) => {


const response = await api.put(
  `/person/${id}`,
  data
);

return response.data;


},

remove: async (id: string) => {


const response = await api.delete(
  `/person/${id}`
);

return response.data;


},

};
