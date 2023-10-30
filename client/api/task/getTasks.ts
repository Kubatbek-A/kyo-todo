import { DeepPartial } from "@/helpers/deepPartial";
import { axiosRequest } from "@/helpers/axios-request";
import { TaskStatus } from "@/helpers/enums";
import { convertObjectToQueryParams } from "@/helpers/utils";
import withDefaultData from "@/helpers/withDefaultData";

export type GetTasksResponse = {
  data: ITask[];
  meta: IPagination;
};

export type GetTasksVariables = {
  filter?: {
    search?: string;
    dueDate?: string;
    status?: TaskStatus;
  };
  page?: IPaginationRequest;
  sort: {
    sortBy: "createdAt" | "status" | "dueDate";
    sortAt: "ASC" | "DESC";
  };
};

export const getTasks = (userData: DeepPartial<GetTasksVariables> = {}) => {
  const data: GetTasksVariables = withDefaultData(userData, {
    sort: {
      sortBy: "createdAt",
      sortAt: "DESC",
    },
  } as const);

  return axiosRequest<GetTasksVariables, GetTasksResponse>({
    method: "GET",
    url: "/api/tasks",
    contentType: "application/json",
    baseURL: process.env.NEXT_PUBLIC_WIDGET_API_URL || "",
    params: convertObjectToQueryParams(data),
  });
};
