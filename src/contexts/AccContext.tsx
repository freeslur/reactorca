import React, { createContext, useContext, useState } from 'react';

type ChangeStatusType = {
  index?: number;
  acc_id?: string;
  acc_date?: string;
  acc_time?: string;
  pati_id?: string;
  code?: number;
};

type AccContextType = {
  state: {
    selDate: Date | null;
    changeStatus: ChangeStatusType;
  };
  actions: {
    setSelDate: (seldate: Date) => void;
    setChangeStatus: ({
      index,
      acc_id,
      acc_date,
      acc_time,
      pati_id,
      code,
    }: ChangeStatusType) => void;
  };
};

const AccContext = createContext<AccContextType>({
  state: {
    selDate: new Date(),
    changeStatus: {
      index: -1,
      acc_id: '',
      acc_date: '',
      acc_time: '',
      pati_id: '',
      code: -1,
    },
  },
  actions: { setSelDate: () => {}, setChangeStatus: () => {} },
});

export const AccContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selDate, setSelDate] = useState(new Date());
  const [changeStatus, setChangeStatus] = useState<ChangeStatusType>({
    index: -1,
    acc_id: '',
    acc_date: '',
    acc_time: '',
    pati_id: '',
    code: -1,
  });
  const value: AccContextType = {
    state: { selDate: selDate, changeStatus: changeStatus },
    actions: { setSelDate: setSelDate, setChangeStatus: setChangeStatus },
  };
  return <AccContext.Provider value={value}>{children}</AccContext.Provider>;
};

// export const { Consumer: AccDateContextConsumer } = AccDateContext;

export const useAccContext = () => {
  const state = useContext(AccContext);
  if (!state) {
    throw new Error('useAccContext Error!!!!');
  }
  return state;
};
