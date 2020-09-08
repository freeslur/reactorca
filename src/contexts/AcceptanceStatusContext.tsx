import React, {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
  useContext,
} from 'react';

export type AcceptanceStatus = { acceptance_id: number; code: number };
type AcceptanceStatusState = AcceptanceStatus[];
const AcceptanceStatusContext = createContext<
  AcceptanceStatusState | undefined
>(undefined);

type Action =
  | { type: 'SELECT'; acceptance_id: number; code: number }
  | { type: 'ADD'; data: AcceptanceStatusState };
type AcceptanceStatusDispatch = Dispatch<Action>;
const AcceptanceStatusDispatchContext = createContext<
  AcceptanceStatusDispatch | undefined
>(undefined);

const AcceptanceStatusReducer = (
  state: AcceptanceStatusState,
  action: Action
) => {
  switch (action.type) {
    case 'ADD': {
      return (state = action.data);
    }
    case 'SELECT': {
      return state.map((status) =>
        status.acceptance_id === action.acceptance_id
          ? {
              ...status,
              code: action.code,
            }
          : status
      );
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
  const [acceptanceStatus, dispatch] = useReducer(AcceptanceStatusReducer, []);
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
