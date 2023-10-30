import { AddDescription as Styled } from "./AddDescription.styled";
import { Controller, useForm } from "react-hook-form";
import useSSRLayoutEffect from "@/hooks/useSSRLayoutEffect/useSSRLayoutEffect";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/UI/Button/Button";
import { useUpdateTask } from "@/hooks/task/useUpdateTask";
import dynamic from "next/dynamic";
import { isEditorContent } from "@/UI/TextEditor/editor-constant";
import { P4 } from "@/UI/Typography";

const TextEditor = dynamic(() => import("../../UI/TextEditor/TextEditor"), {
  ssr: false,
});

const schema = yup.object({
  description: yup.string().required("Description is required"),
});

export default function AddDescription(props: {
  onClose: () => void;
  refetch: () => void;
  taskToEdit?: ITask;
}) {
  const { onClose, refetch, taskToEdit } = props;

  const {
    control,
    handleSubmit,
    setError,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<ITaskDescriptionCreating>({
    resolver: yupResolver(schema),
  });

  const { mutate: updateTask, failureReason } = useUpdateTask(refetch);

  const onSuccess = () => {
    reset({
      description: "",
    });
    onClose();
  };

  async function sumbitForm() {
    handleSubmit(
      (values) => {
        updateTask(
          {
            id: taskToEdit?.id ?? "",
            description: values.description,
          },
          {
            onSuccess,
          },
        );
      },
      (errors) => console.error("Invalid data", errors),
    )();
  }

  useSSRLayoutEffect(() => {
    if (
      !failureReason ||
      !failureReason.response ||
      !failureReason.response.data.errors
    )
      return;

    const errors = failureReason.response.data.errors;

    Object.keys(errors).forEach((errorName) => {
      setError(errorName as any, {
        message: errors[errorName],
      });
    });
  }, [failureReason]);

  return (
    <Styled.AddDescription>
      <Styled.Header>
        <Styled.XContainer>
          <P4>Task results</P4>
        </Styled.XContainer>
      </Styled.Header>
      <Styled.Line></Styled.Line>
      <Styled.XContainer>
        <Styled.Content>
          <Styled.Editor>
            <Controller
              control={control}
              name={"description"}
              render={({ fieldState: { error } }) => (
                <>
                  <TextEditor
                    isInvalid={!!errors.description}
                    content={taskToEdit?.description}
                    onChange={(newDescription) => {
                      const parsedContent = JSON.parse(newDescription);

                      if (!isEditorContent(parsedContent)) return;

                      if (parsedContent.blocks.length > 0) {
                        clearErrors("description");
                      }

                      setValue("description", newDescription, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  />

                  <div
                    style={{
                      height: "20px",
                      padding: "4px 10px 0",
                      fontSize: "14px",
                      lineHeight: "14px",
                      textAlign: "end",
                      color: "#AC4825",
                    }}
                  >
                    {error?.message}
                  </div>
                </>
              )}
            />
          </Styled.Editor>
          <Styled.Buttons>
            <Button onClick={sumbitForm} type="primary">
              Save
            </Button>
          </Styled.Buttons>
        </Styled.Content>
      </Styled.XContainer>
    </Styled.AddDescription>
  );
}
