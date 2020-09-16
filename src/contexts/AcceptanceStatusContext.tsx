import React, {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
  useContext,
} from 'react';

export type AcceptanceStatusState = {
  index?: number;
  acceptance_id?: string;
  code?: number;
};

type Action = {
  type: 'SET_STATUS';
  index: number;
  acceptance_id: string;
  code: number;
};
type AcceptanceStatusDispatch = Dispatch<Action>;

// type AcceptanceStatusState = AcceptanceStatus[];

const AcceptanceStatusContext = createContext<
  AcceptanceStatusState | undefined
>(undefined);

const AcceptanceStatusDispatchContext = createContext<
  AcceptanceStatusDispatch | undefined
>(undefined);

const AcceptanceStatusReducer = (
  state: AcceptanceStatusState,
  action: Action
) => {
  switch (action.type) {
    case 'SET_STATUS': {
      return {
        index: action.index,
        acceptance_id: action.acceptance_id,
        code: action.code,
      };
    }
    default:
      throw new Error('unhandled action');
  }
};

export const AcceptanceStatusContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [acceptanceStatus, dispatch] = useReducer(AcceptanceStatusReducer, {
    index: -1,
    acceptance_id: '',
    code: 0,
  });
  return (
    <AcceptanceStatusDispatchContext.Provider value={dispatch}>
      <AcceptanceStatusContext.Provider value={acceptanceStatus}>
        {children}
      </AcceptanceStatusContext.Provider>
    </AcceptanceStatusDispatchContext.Provider>
  );
};

export const useAcceptanceStatusState = () => {
  const state = useContext(AcceptanceStatusContext);
  if (!state) throw new Error('AcceptanceStatusProvider not found');
  return state;
};

export const useAcceptanceStatusDispatch = () => {
  const dispatch = useContext(AcceptanceStatusDispatchContext);
  if (!dispatch)
    throw new Error('AcceptanceStatusProvider(Dispatch) not found');
  return dispatch;
};
