export interface ICourse {
  courseId: string;
  instituteName: string;
  courseName: string;
  category: string;
  deliveryMethod: string;
  location: string;
  language: string;
  startDate: Date | string;
}
