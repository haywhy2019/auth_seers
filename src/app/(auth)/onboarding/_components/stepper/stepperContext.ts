import { createContext, useContext} from "react"

type StepperContextType = {
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
  };

export const initialContext = createContext<StepperContextType | undefined>(undefined)


export const StepperContext = (): StepperContextType => {
  const context = useContext(initialContext);
  if (!context) {
    throw new Error("useStepper must be used within a StepperProvider");
  }
  return context;
};


export default StepperContext