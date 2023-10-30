import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IApiError } from "@/helpers/interfaces";
import {
  todoTask,
  TodoTaskResponse,
  TodoTaskVariables,
} from "@/api/task/todoTask";

export const useTodoTask = (onSuccess?: () => void) => {
  return useMutation<
    TodoTaskResponse,
    AxiosError<IApiError>,
    TodoTaskVariables
  >({
    mutationFn: todoTask,
    onSuccess,
  });
};
