import { axiosRequest } from "@/helpers/axios-request";

export type CompleteTaskVariables = {
  id: string;
};

export type CompleteTaskResponse = { status: "OK" };

export const completeTask = (data: CompleteTaskVariables) => {
  return axiosRequest<CompleteTaskVariables, CompleteTaskResponse>({
    method: "PATCH",
    url: `/api/tasks/${data.id}/complete`,
    contentType: "application/json",
    baseURL: process.env.NEXT_PUBLIC_WIDGET_API_URL || "",
  });
};
