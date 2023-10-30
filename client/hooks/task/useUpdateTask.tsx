import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IApiError } from "@/helpers/interfaces";
import { UpdateTaskResponse, updateTask } from "@/api/task/updateTask";

export const useUpdateTask = (onSuccess?: () => void) => {
  return useMutation<UpdateTaskResponse, AxiosError<IApiError>, ITaskUpdating>({
    mutationFn: updateTask,
    onSuccess,
  });
};
