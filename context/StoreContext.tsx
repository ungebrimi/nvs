import { createContext, useContext, useState } from "react";

type StoreProviderProps = {
  children: React.ReactNode;
};

type StoreContextProps = {
  id: number;
  setId: (id: number) => void;
  store: any;
  setStore: (store: any) => void;
};

const StoreContext = createContext({} as StoreContextProps);

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [id, setId] = useState<number>(0);
  const [store, setStore] = useState<any>(null)

  return (
    <StoreContext.Provider
      value={{
        id,
        setId,
        store,
        setStore
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
