import React, { useState, useEffect } from 'react';
import * as api from '../api/Patient';

import MaterialTable from 'material-table';
import {
  Card,
  CardHeader,
  CardContent,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
} from '@material-ui/core';
// import PatientData from './PatientData';

interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

function createData(
  Patient_ID: string,
  WholeName: string,
  WholeName_inKana: string,
  BirthDate: string,
  Sex: string
): IPatient {
  return { Patient_ID, WholeName, WholeName_inKana, BirthDate, Sex };
}

const rows = [
  createData('Cupcake', '305', '3.7', '67', '4.3'),
  createData('Donut', '452', '25.0', '51', '4.9'),
  createData('Eclair', '262', '16.0', '24', '6.0'),
  createData('Frozen yoghurt', '159', '6.0', '24', '4.0'),
  createData('Gingerbread', '356', '16.0', '49', '3.9'),
  createData('Honeycomb', '408', '3.2', '87', '6.5'),
  createData('Ice cream sandwich', '237', '9.0', '37', '4.3'),
  createData('Jelly Bean', '375', '0.0', '94', '0.0'),
  createData('KitKat', '518', '26.0', '65', '7.0'),
  createData('Lollipop', '392', '0.2', '98', '0.0'),
  createData('Marshmallow', '318', '0', '81', '2.0'),
  createData('Nougat', '360', '19.0', '9', '37.0'),
  createData('Oreo', '437', '18.0', '63', '4.0'),
];

interface IPatient {
  Patient_ID: string;
  WholeName: string;
  WholeName_inKana: string;
  BirthDate: string;
  Sex: string;
}
const PatientsPage = () => {
  const [patient, setPatient] = useState<IPatient>({
    Patient_ID: '',
    WholeName: '',
    WholeName_inKana: '',
    BirthDate: '',
    Sex: '',
  });
  const columns = [
    { title: '患者ID', field: 'Patient_ID' },
    { title: '患者名', field: 'WholeName' },
    { title: '患者名カナ', field: 'WholeName_inKana' },
    { title: '生年月日', field: 'BirthDate' },
    { title: '性別', field: 'Sex' },
  ];
  useEffect(() => {
    api
      .getPatients()
      .then((resp) => {
        const data: IPatient = {
          Patient_ID: resp.data.Patient_ID,
          WholeName: resp.data.WholeName,
          WholeName_inKana: resp.data.WholeName_inKana,
          BirthDate: resp.data.BirthDate,
          Sex: resp.data.Sex,
        };
        setPatient(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  interface HeadCell {
    disablePadding: boolean;
    id: keyof IPatient;
    label: string;
    numeric: boolean;
  }
  const headCells: HeadCell[] = [
    { id: 'Patient_ID', numeric: false, disablePadding: true, label: '患者ID' },
    { id: 'WholeName', numeric: false, disablePadding: true, label: '患者名' },
    {
      id: 'WholeName_inKana',
      numeric: false,
      disablePadding: true,
      label: '患者名カナ',
    },
    {
      id: 'BirthDate',
      numeric: false,
      disablePadding: true,
      label: '生年月日',
    },
    { id: 'Sex', numeric: false, disablePadding: true, label: '性別' },
  ];

  return (
    <>
      <Card>
        <CardHeader title='API Test'></CardHeader>
        <CardContent>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox />
              </TableCell>
            </TableRow>
          </TableHead>
        </CardContent>
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
