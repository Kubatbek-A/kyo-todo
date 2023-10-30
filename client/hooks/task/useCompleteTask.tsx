import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IApiError } from "@/helpers/interfaces";
import {
  completeTask,
  CompleteTaskResponse,
  CompleteTaskVariables,
} from "@/api/task/completeTask";

export const useCompleteTask = (onSuccess?: () => void) => {
  return useMutation<
    CompleteTaskResponse,
    AxiosError<IApiError>,
    CompleteTaskVariables
  >({
    mutationFn: completeTask,
    onSuccess,
  });
};
