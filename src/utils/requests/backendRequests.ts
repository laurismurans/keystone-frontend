import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const API_ROUTE = "/api";
export const COURSE_FILTER_ROUTE = `${API_ROUTE}/coursefilter`;

export async function backendGetRequest<R>(
  url: string,
  queryParams: string = "",
): Promise<any> {
  return await axios
    .get<R>(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}${queryParams}`)
    .then((res) => res.data);
}

export async function backendPostRequest(
  url: string,
  body: unknown,
): Promise<any> {
  return await axios
    .post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
      JSON.stringify(body),
      config,
    )
    .then((res) => res.data)
    .catch((e) => {
      return e;
    });
}
