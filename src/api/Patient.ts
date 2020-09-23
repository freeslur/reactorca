import { axios_base } from '../api/DefaultCRUD';

// axios.defaults.withCredentials = true;
const client = axios_base();

export const getPatient = (pID: string) => {
  return client.get('/patient', {
    params: { id: pID },
  });
};
