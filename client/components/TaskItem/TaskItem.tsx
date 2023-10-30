import { StyledTaskItem as Styled, StyledTaskDate } from "./TaskItem.styled";
import dayjs from "dayjs";
import { TaskStatus as TaskStatusEnum } from "@/helpers/enums";
import { TableColumn } from "../../UI/Table/Table";
import { PixelFix } from "../../UI/PixelFix/PixelFix";
import { TaskStatus } from "../TaskStatus/TaskStatus";
import { ButtonIcon } from "../../UI/ButtonIcon/ButtonIcon";
import { Icon } from "../../UI/Icon/Icon";
import { colors } from "@/helpers";
import { useCompleteTask } from "@/hooks/task/useCompleteTask";
import { useTodoTask } from "@/hooks/task/useTodoTask";
import { useDeleteTask } from "@/hooks/task/useDeleteTask";
import ConfirmBeforeClick from "../ConfirmBeforeAction/ConfirmBeforeClick";
import { Button } from "../../UI/Button/Button";

export default function TaskItem({
  task,
  editTask,
  refetch,
  addDescription,
}: {
  task: ITask;
  editTask: (task: ITask) => void;
  addDescription: (task: ITask) => void;
  refetch: () => void;
}) {
  const { mutate: completeTask } = useCompleteTask(refetch);
  const { mutate: todoTask } = useTodoTask(refetch);
  const { mutate: deleteTask } = useDeleteTask(refetch);

  const localeDueDate = new Date(task.dueDate.toLocaleString());

  return (
    <Styled.TaskItem>
      <TableColumn>
        <Styled.Column $isFirst>
          <ButtonIcon
            color={
              task.status === TaskStatusEnum.COMPLETED
                ? colors["green100"]
                : colors["black"]
            }
            iconColor="#fff"
            icon={<Icon name="icon-24-check" color="none"></Icon>}
            size={{
              sizeIcon: 14,
              sizeBtn: 50,
            }}
            onClick={() =>
              task.status === TaskStatusEnum.COMPLETED
                ? todoTask({ id: task.id })
                : completeTask(
                    { id: task.id },
                    { onSuccess: () => addDescription(task) },
                  )
            }
          ></ButtonIcon>
        </Styled.Column>
      </TableColumn>
      <TableColumn>
        <Styled.Column>
          <Styled.Lines>
            <Styled.Line>{task.title}</Styled.Line>
          </Styled.Lines>
        </Styled.Column>
      </TableColumn>
      <TableColumn>
        <Styled.Column>
          <PixelFix $top="2px">
            <StyledTaskDate>
              <div>{dayjs(localeDueDate).format("MMMM DD, YYYY")}</div>
              <div>{dayjs(localeDueDate).format("hh:mm A")}</div>
            </StyledTaskDate>
          </PixelFix>
        </Styled.Column>
      </TableColumn>

      <TableColumn>
        <Styled.Column>
          <TaskStatus type={task.status as TaskStatusEnum} />
        </Styled.Column>
      </TableColumn>

      <TableColumn>
        <Styled.Column>
          {task.status === TaskStatusEnum.COMPLETED && (
            <Button
              onClick={() => addDescription(task)}
              style={{ padding: "4px 10px", height: "auto" }}
            >
              {!!task.description ? "See" : "Add"} result
            </Button>
          )}

          {task.status !== TaskStatusEnum.COMPLETED && <>-</>}
        </Styled.Column>
      </TableColumn>

      <TableColumn>
        <Styled.Column>
          {task.collaborators.map((collaborator) => (
            <Button key={collaborator.id} style={{ padding: "0 20px" }}>
              {collaborator.users.name.slice(0, 1)}
            </Button>
          ))}
        </Styled.Column>
      </TableColumn>

      <TableColumn>
        <Styled.Column $isLast $isFlexEnd>
          <Styled.Buttons>
            <ButtonIcon
              type="secondary"
              icon={<Icon name="icon-24-edit" color="none"></Icon>}
              size={{
                sizeIcon: 14,
                sizeBtn: 40,
              }}
              onClick={() => editTask(task)}
            />
            <ConfirmBeforeClick>
              <ButtonIcon
                type="secondary"
                icon={<Icon name="icon-24-delete" color="none"></Icon>}
                size={{
                  sizeIcon: 14,
                  sizeBtn: 40,
                }}
                onClick={() => deleteTask({ id: task.id })}
              />
            </ConfirmBeforeClick>
          </Styled.Buttons>
        </Styled.Column>
      </TableColumn>
    </Styled.TaskItem>
  );
}
