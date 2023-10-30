import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IApiError } from "@/helpers/interfaces";
import {
  DeleteTaskResponse,
  DeleteTaskVariables,
  deleteTask,
} from "@/api/task/deleteTask";

export const useDeleteTask = (onSuccess?: () => void) => {
  return useMutation<
    DeleteTaskResponse,
    AxiosError<IApiError>,
    DeleteTaskVariables
  >({
    mutationFn: deleteTask,
    onSuccess,
  });
};
