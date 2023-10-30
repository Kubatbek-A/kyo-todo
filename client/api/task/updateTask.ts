import { axiosRequest } from "@/helpers/axios-request";

export type UpdateTaskResponse = {
  title: string;
  dueOn: string;
};

export const updateTask = (data: ITaskUpdating) => {
  return axiosRequest<ITaskUpdating, UpdateTaskResponse>({
    method: "PATCH",
    url: `/api/tasks/${data.id}`,
    contentType: "application/json",
    baseURL: process.env.NEXT_PUBLIC_WIDGET_API_URL || "",
    data,
  });
};
