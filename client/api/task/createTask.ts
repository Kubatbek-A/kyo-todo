import { axiosRequest } from "@/helpers/axios-request";

export type CreateTaskResponse = {
  title: string;
  dueOn: string;
};

export const createTask = (data: ITaskCreating) => {
  return axiosRequest<ITaskCreating, CreateTaskResponse>({
    method: "POST",
    url: `/api/tasks`,
    contentType: "application/json",
    baseURL: process.env.NEXT_PUBLIC_WIDGET_API_URL || "",
    data,
  });
};
