import { Dispatch, Reducer, createContext, useContext, useReducer } from "react";

export enum AppAction {
  updateLoading = "UPDATE_LOADING",
  updateError = "UPDATE_ERROR"
}

export interface IAppArguments {
  type: AppAction;
  payload?: boolean;
}

export interface AppState {
  isLoading: boolean;
  hasError: boolean;
}

export const appInitialState: AppState = {
  isLoading: false,
  hasError: false
};

export const appContextReducer: Reducer<AppState, IAppArguments> = (
  state: AppState = appInitialState,
  action: IAppArguments
): AppState => {
  switch (action.type) {
    case AppAction.updateLoading:
      return {
        ...state,
        isLoading: action.payload as boolean
      };
    case AppAction.updateError:
      return {
        ...state,
        hasError: action.payload as boolean
      };
    default:
      return state;
  }
};

export const AppContext = createContext<[AppState, Dispatch<IAppArguments>]>([
  appInitialState,
  (action: IAppArguments) => appContextReducer(appInitialState, action)
]);

type Props = {
  children: React.ReactNode;
};

export function AppContextProvider({ children }: Props) {
  return <AppContext.Provider value={useReducer(appContextReducer, appInitialState)}>{children}</AppContext.Provider>;
}

export function useAppContext(): [AppState, Dispatch<IAppArguments>] {
  const [context, dispatch] = useContext(AppContext);
  if (context === undefined) throw new Error("AppContext was used outside the AppContextProvider");
  return [context, dispatch];
}

export const uiSetLoading = (dispatch: Dispatch<IAppArguments>, isLoading: boolean): void => {
  dispatch({ type: AppAction.updateLoading, payload: isLoading });
};

export const uiSetError = (dispatch: Dispatch<IAppArguments>, show: boolean): void => {
  dispatch({ type: AppAction.updateError, payload: show });
};
