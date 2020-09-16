import { axios_base } from '../api/DefaultCRUD';

// axios.defaults.withCredentials = true;
const client = axios_base();

export const getPatients = () => {
  return client.get('/patient_basic_info');
};
