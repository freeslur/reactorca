import React from 'react';

export default function PatientData(props: any) {
  console.log('props : ', props.data);
  return (
    <>
      <div></div>
    </>
  );
}
// import { axios_base, server_url } from '../crud/DefaultCRUD';
// import MaterialTable, { Column } from 'material-table';

// // axios.defaults.withCredentials = true;
// const get_axios = axios_base('/patient_basic_info');
// const delete_axios = axios_base('/delete_patient');

// export const deletePatientData = (
//   id: string,
//   name: string,
//   name_kana: string,
//   birth_date: string,
//   sex: string
// ) => {
//   alert('clicked');
//   const params = {
//     id: id,
//     name: name,
//     name_kana: name_kana,
//     birth_date: birth_date,
//     sex: sex,
//   };
//   delete_axios
//     .delete(server_url + '/delete_patient', { data: params })
//     .then((res: any) => {
//       console.log(res.data);
//       // const id = res.data['Patient_ID']['#text'];
//       // const name = res.data['WholeName']['#text'];
//       // const name_kana = res.data['WholeName_inKana']['#text'];
//       // const birth_date = res.data['BirthDate']['#text'];
//       // const sex = res.data['Sex']['#text'];
//     })
//     .catch((err) => console.log(err));
// };

// interface Row {
//   id: string;
//   name: string;
//   name_kana: string;
//   birth_date: string;
//   sex: string;
// }

// interface TableState {
//   columns: Array<Column<Row>>;
//   data: Row[];
// }

// // const getPatientData = p_data;
// export const GetPatientData = () => {
//   const [state, setState] = useState<TableState>({
//     columns: [
//       { title: '患者ID', field: 'id' },
//       { title: '患者名', field: 'name' },
//       { title: '患者名カナ', field: 'name_kana' },
//       { title: '生年月日', field: 'birth_date' },
//       { title: '性別', field: 'sex' },
//     ],
//     data: [],
//   });
//   console.log('test');

//   // get_axios.get(server_url + '/patient_basic_info').then((res: any) => {
//   //   const id = res.data['Patient_ID']['#text'];
//   //   const name = res.data['WholeName']['#text'];
//   //   const name_kana = res.data['WholeName_inKana']['#text'];
//   //   const birth_date = res.data['BirthDate']['#text'];
//   //   const sex = res.data['Sex']['#text'];
//   //   setState((prevState) => {
//   //     const data = [...prevState.data];
//   //     data.push({ id, name, name_kana, birth_date, sex });
//   //     return { ...prevState, data };
//   //   });
//   // });
//   return (
//     <>
//       <MaterialTable
//         title='患者リスト'
//         columns={state.columns}
//         data={state.data}
//         editable={{
//           onRowAdd: (newData) =>
//             new Promise((resolve) => {
//               setTimeout(() => {
//                 resolve();
//                 setState((prevState) => {
//                   const data = [...prevState.data];
//                   data.push(newData);
//                   return { ...prevState, data };
//                 });
//               }, 600);
//             }),
//           onRowUpdate: (newData, oldData) =>
//             new Promise((resolve) => {
//               setTimeout(() => {
//                 resolve();
//                 if (oldData) {
//                   setState((prevState) => {
//                     const data = [...prevState.data];
//                     data[data.indexOf(oldData)] = newData;
//                     return { ...prevState, data };
//                   });
//                 }
//               }, 600);
//             }),
//           onRowDelete: (oldData) =>
//             new Promise((resolve) => {
//               setTimeout(() => {
//                 resolve();
//                 setState((prevState) => {
//                   const data = [...prevState.data];
//                   data.splice(data.indexOf(oldData), 1);
//                   return { ...prevState, data };
//                 });
//               }, 600);
//             }),
//         }}
//       />
//     </>
//   );
// };
