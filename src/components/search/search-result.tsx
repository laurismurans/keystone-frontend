import { useSearchContext } from "@/contexts/search/search.context";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import ApplyForm from "../apply-form/apply-form";

function SearchResult(): JSX.Element {
  const searchContext = useSearchContext();

  if (!searchContext.resultLoaded) {
    return <></>;
  }

  const renderCourses = (): JSX.Element[] => {
    return searchContext.result.map((course) => {
      return (
        <Card key={course.courseId} className="flex flex-col w-[400px] mt-2">
          <CardHeader>
            <CardTitle>
              {course.courseName} ({course.instituteName})
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex gap-2 font-medium">
              <span>Category:</span>
              <span>{course.category}</span>
            </div>
            {course.language != "NULL" && (
              <div className="flex gap-2 font-medium">
                <span>Language:</span>
                <span>{course.language}</span>
              </div>
            )}
            <div className="flex gap-2 font-medium">
              <span>Location:</span>
              <span>{course.location}</span>
            </div>
            <div className="flex gap-2 font-medium">
              <span>Locale:</span>
              <span>{course.deliveryMethod}</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p>
              Course start date:{" "}
              {new Date(course.startDate).toLocaleDateString()}
            </p>
            <ApplyForm
              course={course}
              onApplySuccess={() => {
                alert("Succesfully applied to course");
              }}
            />
          </CardFooter>
        </Card>
      );
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Search Result</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap max-h-[600px] overflow-y-auto gap-4">
          {!searchContext.result || searchContext.result.length === 0 ? (
            <p>No courses found with selected search parameters </p>
          ) : (
            renderCourses()
          )}
        </CardContent>
        <CardFooter>
          <p>Total courses found: {searchContext.result.length}</p>
        </CardFooter>
      </Card>
    </>
  );
}

export default SearchResult;
