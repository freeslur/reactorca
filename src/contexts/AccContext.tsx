import React, { createContext, useContext, useState } from 'react';

type AccDateType = {
  state: { selDate: Date | null };
  actions: { setSelDate: (seldate: Date) => void };
};

const AccDateContext = createContext<AccDateType>({
  state: { selDate: new Date() },
  actions: { setSelDate: () => {} },
});

export const AccDateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selDate, setSelDate] = useState(new Date());
  const value: AccDateType = {
    state: { selDate: selDate },
    actions: { setSelDate: setSelDate },
  };
  return (
    <AccDateContext.Provider value={value}>{children}</AccDateContext.Provider>
  );
};

// export const { Consumer: AccDateContextConsumer } = AccDateContext;

export const useAccDateContext = () => {
  const state = useContext(AccDateContext);
  if (!state) {
    throw new Error('useAccDateContext Error!!!!');
  }
  return state;
};

//
//
// let changeStatus = {
//   index: -1,
//   acceptance_id: '',
//   acceptance_date: '',
//   acceptance_time: '',
//   patient_id: '',
//   code: -1,
// };

// type AccStatusType = {
//   state: { selDate: Date | null };
//   actions: { setSelDate: (seldate: Date) => void };
// };

// const AccDateContext = createContext<AccDateType>({
//   state: { selDate: new Date() },
//   actions: { setSelDate: () => {} },
// });

// export const AccDateContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [selDate, setSelDate] = useState(new Date());
//   const value: AccDateType = {
//     state: { selDate: selDate },
//     actions: { setSelDate: setSelDate },
//   };
//   return (
//     <AccDateContext.Provider value={value}>{children}</AccDateContext.Provider>
//   );
// };

// // export const { Consumer: AccDateContextConsumer } = AccDateContext;

// export const useAccDateContext = () => {
//   const state = useContext(AccDateContext);
//   if (!state) {
//     throw new Error('useAccDateContext Error!!!!');
//   }
//   return state;
// };
