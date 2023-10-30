import { NewTask as Styled, StyledGridItem } from "./NewTask.styled";
import { useForm } from "react-hook-form";
import useSSRLayoutEffect from "@/hooks/useSSRLayoutEffect/useSSRLayoutEffect";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/UI/Button/Button";
import { useCreateTask } from "@/hooks/task/useCreateTask";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useUpdateTask } from "@/hooks/task/useUpdateTask";
import { Input } from "@/UI/Input/Input";
import { P4 } from "@/UI/Typography";
import TaskDateInput from "@/UI/TaskDateInput/TaskDateInput";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  dueDate: yup
    .object({
      date: yup.string().required("Due date is required"),
      time: yup.string().required("Due time is required"),
    })
    .required("Due date is required"),
  description: yup.string(),
});

export default function NewTask(props: {
  onClose: () => void;
  refetch: () => void;
  actionType: "create" | "edit";
  taskToEdit?: ITask;
}) {
  const { onClose, refetch, actionType, taskToEdit } = props;

  const { control, handleSubmit, setError, reset, setValue, clearErrors } =
    useForm<ITaskCreating>({
      resolver: yupResolver(schema),
    });

  useEffect(() => {
    if (!taskToEdit?.title) {
      reset({
        title: "",
        dueDate: {
          date: "",
          time: "",
        },
      });
      return;
    }

    const dueDate = {
      date: dayjs(taskToEdit.dueDate).format("YYYY-MM-DD"),
      time: dayjs(taskToEdit.dueDate).format("hh:mm"),
    };

    setValue("title", taskToEdit.title);
    setValue("dueDate", dueDate);
  }, [taskToEdit]);

  const { mutate: createTask, failureReason } = useCreateTask(refetch);
  const { mutate: updateTask, failureReason: updateTaskFailureReason } =
    useUpdateTask(refetch);

  const onSuccess = () => {
    reset({
      title: "",
      dueDate: {
        date: "",
        time: "",
      },
    });
    onClose();
  };

  async function sumbitForm() {
    handleSubmit(
      (values) => {
        const data = {
          title: values.title,
          dueDate: values.dueDate.date,
          dueTime: values.dueDate.time,
        };

        if (actionType === "create") {
          createTask(data, {
            onSuccess,
          });
        } else if (actionType === "edit") {
          updateTask(
            { ...data, id: taskToEdit?.id ?? "" },
            {
              onSuccess,
            },
          );
        }
      },
      (errors) => console.error("Invalid data", errors),
    )();
  }

  useSSRLayoutEffect(() => {
    if (
      !failureReason ||
      !failureReason.response ||
      !failureReason.response.data.errors ||
      !updateTaskFailureReason ||
      !updateTaskFailureReason.response ||
      !updateTaskFailureReason.response.data.errors
    )
      return;

    const errors =
      failureReason.response.data.errors ||
      updateTaskFailureReason.response.data.errors;

    Object.keys(errors).forEach((errorName) => {
      setError(errorName as any, {
        message: errors[errorName],
      });
    });
  }, [failureReason, updateTaskFailureReason]);

  return (
    <Styled.NewTask>
      <Styled.Header>
        <Styled.XContainer>
          <P4>{actionType === "create" ? "New" : "Edit"} task</P4>
        </Styled.XContainer>
      </Styled.Header>
      <Styled.Line></Styled.Line>
      <Styled.XContainer>
        <Styled.Content>
          <Styled.Elements>
            <StyledGridItem>
              <Input
                label="Title"
                controllerProps={{ control, name: "title" }}
              />
            </StyledGridItem>
            <StyledGridItem>
              <TaskDateInput
                label="Task date & time *"
                controllerProps={{ control, name: "dueDate" }}
                calendarProps={{
                  minDate: dayjs().add(1, "day").toDate(),
                }}
                displayFormat="MM.DD.YYYY"
              />
            </StyledGridItem>
          </Styled.Elements>
          <Styled.Buttons>
            <Button onClick={sumbitForm} type="primary">
              {actionType === "create" ? "Create new task" : "Save"}
            </Button>
          </Styled.Buttons>
        </Styled.Content>
      </Styled.XContainer>
    </Styled.NewTask>
  );
}
