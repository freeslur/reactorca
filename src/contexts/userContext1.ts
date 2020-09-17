import { createContext } from 'react';

export type StatusDataType = {
  title: string;
  color: string;
  textColor: string;
};

export const AccStatusContext = createContext<StatusDataType | undefined>(
  undefined
);
