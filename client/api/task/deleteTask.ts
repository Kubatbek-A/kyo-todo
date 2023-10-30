import { axiosRequest } from "@/helpers/axios-request";

export type DeleteTaskVariables = {
  id: string;
};

export type DeleteTaskResponse = { status: "OK" };

export const deleteTask = (data: DeleteTaskVariables) => {
  return axiosRequest<DeleteTaskVariables, DeleteTaskResponse>({
    method: "DELETE",
    url: `/api/tasks/${data.id}/delete`,
    contentType: "application/json",
    baseURL: process.env.NEXT_PUBLIC_WIDGET_API_URL || "",
  });
};
