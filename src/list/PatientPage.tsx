import React, { useState, useEffect } from 'react';
import * as api from '../api/Patient';

import MaterialTable from 'material-table';
import { Card, CardHeader, CardContent } from '@material-ui/core';
// import PatientData from './PatientData';
interface IPatient {
  id: string;
  name: string;
  name_kana: string;
  birth_date: string;
  sex: string;
}
const PatientsPage = () => {
  const [patient, setPatient] = useState<IPatient>({
    id: '',
    name: '',
    name_kana: '',
    birth_date: '',
    sex: '',
  });
  const columns = [
    { title: '患者ID', field: 'id' },
    { title: '患者名', field: 'name' },
    { title: '患者名カナ', field: 'name_kana' },
    { title: '生年月日', field: 'birth_date' },
    { title: '性別', field: 'sex' },
  ];
  useEffect(() => {
    api
      .getPatients()
      .then((resp) => {
        const data: IPatient = {
          id: resp.data.Patient_ID,
          name: resp.data.WholeName,
          name_kana: resp.data.WholeName_inKana,
          birth_date: resp.data.BirthDate,
          sex: resp.data.Sex,
        };
        setPatient(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Card>
        <CardHeader title='API Test'></CardHeader>
        <CardContent></CardContent>
      </Card>

      {/* <PatientData data={patient} /> */}
      <MaterialTable
        title='患者リスト'
        columns={columns}
        data={[patient]}
        editable={{
          onRowAdd: (rowData) =>
            new Promise(() => {
              console.log(rowData);
            }),
          onRowUpdate: (rowData) => new Promise(() => {}),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
                console.log('oldData:', oldData);
                const deleteParams = { ...patient };
                api.deletePatient(deleteParams).then((resp) => {
                  console.log('deletePatient : ', resp);
                });
                // console.log('dataDelete', dataDelete);
                // const index = oldData.id;
                // // dataDelete.splice(index, 1);
                // setPatient({ ...dataDelete });
              }, 1000);
            }),
        }}
      />
    </>
  );
};

export default PatientsPage;
