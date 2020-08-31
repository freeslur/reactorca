import { axios_base } from '../api/DefaultCRUD';

// axios.defaults.withCredentials = true;
const client = axios_base();

export const getPatients = () => {
  return client.get('/patient_basic_info');
};

export const addPatient = (addParams: {
  Patient_ID: string;
  WholeName: string;
  WholeName_inKana: string;
  BirthDate: string;
  Sex: string;
}) => {
  console.log(addParams);
  return client.post('/add_patient', { data: addParams });
};

export const editPatient = (searchParams: any, editParams: any) => {
  console.log('searchParams : ', searchParams);
  console.log('editParams', editParams);
  return client.get('/patient_basic_info');
};

export const deletePatient = (deleteParams: {
  Patient_ID: string;
  WholeName: string;
  WholeName_inKana: string;
  BirthDate: string;
  Sex: string;
}) => {
  console.log('delete Params: ', deleteParams);
  return client.post('/delete_patient', { data: deleteParams });
};
