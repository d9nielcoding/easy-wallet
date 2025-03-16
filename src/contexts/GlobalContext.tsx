import { IAccount } from "@/types/bo";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface GlobalProviderProps {
  children: ReactNode;
}

interface IGlobalContextData {
  account: IAccount | null;
  setAccount: (account: IAccount | null) => void;
}

const GlobalContext = createContext<IGlobalContextData | undefined>(undefined);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [account, setAccount] = useState<IAccount | null>(null);
  const globalContextData: IGlobalContextData = useMemo(() => {
    return { account, setAccount };
  }, [account, setAccount]);

  return (
    <GlobalContext.Provider value={globalContextData}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const globalContextData = useContext(GlobalContext);

  if (globalContextData === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return globalContextData;
};
