"use client";

import {
  backendGetRequest,
  COURSE_FILTER_ROUTE,
} from "@/utils/requests/backendRequests";
import { SearchContext } from "./search.context";
import useSwr from "swr";
import { useEffect, useState } from "react";
import { ICourse } from "@/interfaces/Course";

export default function SearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [result, setResult] = useState<ICourse[]>([]);
  const [resultLoaded, setResultLoaded] = useState<boolean>(false);

  const {
    data: courseNames,
    error: courseNamesError,
    isLoading: courseNamesLoading,
  } = useSwr(`${COURSE_FILTER_ROUTE}/course-names`, backendGetRequest);
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useSwr(`${COURSE_FILTER_ROUTE}/categories`, backendGetRequest);
  const {
    data: deliveryMethods,
    error: deliveryMethodsError,
    isLoading: deliveryMethodsLoading,
  } = useSwr(`${COURSE_FILTER_ROUTE}/delivery-methods`, backendGetRequest);
  const {
    data: locations,
    error: locationsError,
    isLoading: locationsLoading,
  } = useSwr(`${COURSE_FILTER_ROUTE}/locations`, backendGetRequest);
  const {
    data: languages,
    error: languagesError,
    isLoading: languagesLoading,
  } = useSwr(`${COURSE_FILTER_ROUTE}/languages`, backendGetRequest);
  const {
    data: instituteNames,
    error: instituteNamesError,
    isLoading: instituteNamesLoading,
  } = useSwr(`${COURSE_FILTER_ROUTE}/institute-names`, backendGetRequest);
  const {
    data: dateRange,
    error: dateRangeError,
    isLoading: dateRangeLoading,
  } = useSwr<{
    startDateMin: string;
    startDateMax: string;
  }>(`${COURSE_FILTER_ROUTE}/start-date-range`, backendGetRequest);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Ideally would be wrapped in swrconfig but this will do
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (
      courseNamesLoading ||
      categoriesLoading ||
      deliveryMethodsLoading ||
      locationsLoading ||
      languagesLoading ||
      dateRangeLoading ||
      instituteNamesLoading
    ) {
      setIsLoading(true);
      return;
    }

    setIsLoading(false);
  }, [
    courseNamesLoading,
    categoriesLoading,
    deliveryMethodsLoading,
    locationsLoading,
    languagesLoading,
    dateRangeLoading,
    instituteNamesLoading,
  ]);

  useEffect(() => {
    if (
      courseNamesError ||
      categoriesError ||
      deliveryMethodsError ||
      locationsError ||
      languagesError ||
      dateRangeError ||
      instituteNamesError
    ) {
      setIsError(true);
      return;
    }

    setIsError(false);
  }, [
    courseNamesError,
    categoriesError,
    deliveryMethodsError,
    locationsError,
    languagesError,
    dateRangeError,
    instituteNamesError,
  ]);

  return (
    <SearchContext.Provider
      value={{
        courseNames: courseNames ?? [],
        categories: categories ?? [],
        deliveryMethods: deliveryMethods ?? [],
        locations: locations ?? [],
        languages: languages ?? [],
        instituteNames: instituteNames ?? [],
        startDateMin:
          dateRange?.startDateMin ?? new Date().toISOString().split("T")[0],
        startDateMax:
          dateRange?.startDateMax ?? new Date().toISOString().split("T")[0],
        isLoading,
        isError,

        result,
        resultLoaded,
        setResult,
        setResultLoaded,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
