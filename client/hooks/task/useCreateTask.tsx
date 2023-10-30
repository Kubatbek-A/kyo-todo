import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IApiError } from "@/helpers/interfaces";
import { CreateTaskResponse, createTask } from "@/api/task/createTask";

export const useCreateTask = (onSuccess?: () => void) => {
  return useMutation<CreateTaskResponse, AxiosError<IApiError>, ITaskCreating>({
    mutationFn: createTask,
    onSuccess,
  });
};
