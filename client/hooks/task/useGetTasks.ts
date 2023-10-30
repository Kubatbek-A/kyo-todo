import { GetTasksVariables, getTasks } from "@/api/task/getTasks";
import { DeepPartial } from "@/helpers/deepPartial";
import { useQuery } from "@tanstack/react-query";

export const GET_TASKS = "getTasks";

export const useGetTasks = (params: DeepPartial<GetTasksVariables> = {}) => {
  return useQuery({
    queryKey: [GET_TASKS, params],
    queryFn: () => getTasks(params),
  });
};
