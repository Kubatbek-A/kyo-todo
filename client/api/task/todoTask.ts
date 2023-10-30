import { axiosRequest } from "@/helpers/axios-request";

export type TodoTaskVariables = {
  id: string;
};

export type TodoTaskResponse = { status: "OK" };

export const todoTask = (data: TodoTaskVariables) => {
  return axiosRequest<TodoTaskVariables, TodoTaskResponse>({
    method: "PATCH",
    url: `/api/tasks/${data.id}/todo`,
    contentType: "application/json",
    baseURL: process.env.NEXT_PUBLIC_WIDGET_API_URL || "",
  });
};
