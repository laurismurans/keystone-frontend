import { ICourse } from "@/interfaces/Course";
import { createContext, useContext } from "react";

export interface ISearchContext {
  courseNames: string[];
  categories: string[];
  deliveryMethods: string[];
  locations: string[];
  languages: string[];
  instituteNames: string[];
  startDateMin: string;
  startDateMax: string;
  isLoading: boolean;
  isError: boolean;

  resultLoaded: boolean;
  setResultLoaded: (value: boolean) => void;
  result: ICourse[];
  setResult: (value: ICourse[]) => void;
}

export function getDefaultValues(): ISearchContext {
  return {
    courseNames: [],
    categories: [],
    deliveryMethods: [],
    locations: [],
    languages: [],
    instituteNames: [],
    startDateMin: new Date().toDateString(),
    startDateMax: new Date().toDateString(),
    isLoading: true,
    isError: false,

    resultLoaded: false,
    setResultLoaded: (_value: boolean) => {},
    result: [],
    setResult: (_value: ICourse[]) => {},
  };
}

export const SearchContext = createContext(getDefaultValues());

export const useSearchContext = () => {
  const context = useContext<ISearchContext>(SearchContext);
  if (!context) {
    throw new Error("Context not found");
  }

  return context;
};
