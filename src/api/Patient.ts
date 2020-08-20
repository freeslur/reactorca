import { axios_base } from '../api/DefaultCRUD';

// axios.defaults.withCredentials = true;
const client = axios_base();

export const getPatients = () => {
  return client.get('/patient_basic_info');
};

export const addPatient = (params: any) => {
  console.log(params);
  return client.get('/patient_basic_info');
};

export const editPatient = (searchParams: any, editParams: any) => {
  console.log('searchParams : ', searchParams);
  console.log('editParams', editParams);
  return client.get('/patient_basic_info');
};

export const deletePatient = (deleteParams: {
  id: string;
  name: string;
  name_kana: string;
  birth_date: string;
  sex: string;
}) => {
  console.log('delete Params: ', deleteParams);
  return client.post('/delete_patient', { data: deleteParams });
};
