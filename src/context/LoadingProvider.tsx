import { createContext, PropsWithChildren, useContext } from "react";

interface LoadingType {
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  return (
    <LoadingContext.Provider value={{ setLoading: () => {} }}>
      <main className="main-body main-active">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
