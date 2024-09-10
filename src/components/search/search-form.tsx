"use client";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SelectWithSearch from "../form/select-with-search";
import { useSearchContext } from "@/contexts/search/search.context";
import { DatePickerWithRange } from "../ui/date-range";
import { Skeleton } from "../ui/skeleton";
import { DateRange } from "react-day-picker";
import { API_ROUTE, backendGetRequest } from "@/utils/requests/backendRequests";
import objectToQueryParams from "@/utils/objectToQueryParams";
import { ICourse } from "@/interfaces/Course";

const formSchema = z.object({
  instituteName: z.string(),
  courseName: z.string(),
  category: z.string(),
  deliveryMethod: z.string(),
  location: z.string(),
  language: z.string(),
  dateRange: z.object({
    startDateMin: z.string(),
    startDateMax: z.string(),
  }),
});

function SearchForm() {
  const searchContext = useSearchContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instituteName: "",
      courseName: "",
      category: "",
      deliveryMethod: "",
      location: "",
      language: "",
      dateRange: {
        startDateMin: "",
        startDateMax: "",
      },
    },
  });

  if (searchContext.isLoading) {
    return <Skeleton className=" h-[371px] rounded-lg" />;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await backendGetRequest<ICourse[]>(
      `${API_ROUTE}/course/search?`,
      objectToQueryParams(values),
    );

    searchContext.setResultLoaded(true);
    searchContext.setResult(response);
  }

  const renderSelectWithSearchField = (
    data: string[],
    fieldName:
      | "instituteName"
      | "courseName"
      | "category"
      | "deliveryMethod"
      | "location"
      | "language"
      | "dateRange"
      | "dateRange.startDateMin"
      | "dateRange.startDateMax",
    label: string,
    itemName: string,
  ) => {
    return (
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <SelectWithSearch
                data={data}
                itemName={itemName}
                onChange={(e) => {
                  field.onChange(e);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div className="w-100 flex justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Search Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-row flex-wrap gap-6">
                {renderSelectWithSearchField(
                  searchContext.categories,
                  "category",
                  "Category",
                  "Category",
                )}
                {renderSelectWithSearchField(
                  searchContext.deliveryMethods,
                  "deliveryMethod",
                  "Type",
                  "Locale",
                )}
                {renderSelectWithSearchField(
                  searchContext.locations,
                  "location",
                  "Location",
                  "Location",
                )}
              </div>
              <div className="flex flex-row flex-wrap gap-6 mt-4">
                {renderSelectWithSearchField(
                  searchContext.languages,
                  "language",
                  "Language",
                  "Language",
                )}
                {renderSelectWithSearchField(
                  searchContext.instituteNames,
                  "instituteName",
                  "Institute",
                  "Institute name",
                )}
                <FormField
                  control={form.control}
                  name="dateRange"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date (within selected range)</FormLabel>
                      <FormControl>
                        <DatePickerWithRange
                          from={new Date(searchContext.startDateMin)}
                          to={new Date(searchContext.startDateMax)}
                          onDateSelect={(dateRange: DateRange) => {
                            const maxDate = new Date(
                              dateRange.to ?? searchContext.startDateMax,
                            );
                            maxDate.setDate(maxDate.getDate() + 1);

                            field.onChange({
                              startDateMin: dateRange.from
                                ? new Date(dateRange.from ?? "")
                                    .toISOString()
                                    .split("T")[0]
                                : searchContext.startDateMin,
                              startDateMax: maxDate
                                ? maxDate.toISOString().split("T")[0]
                                : searchContext.startDateMax,
                            });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-10">
                {renderSelectWithSearchField(
                  searchContext.courseNames,
                  "courseName",
                  "Alternatively, you can search for the course here",
                  "Course Name",
                )}
              </div>
              <Button type="submit" className="mt-4">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SearchForm;
