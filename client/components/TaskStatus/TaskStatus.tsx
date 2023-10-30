import styled from "styled-components";
import { TaskStatus as TaskStatusEnum } from "@/helpers/enums";
import { PixelFix } from "../../UI/PixelFix/PixelFix";

export interface IStatus {
  name: string;
  color: string;
  backgroundColor: string;
  fontSize?: string;
}

export const types: Record<TaskStatusEnum, IStatus | undefined> = {
  todo: {
    name: "Todo",
    color: "#fff",
    backgroundColor: "#9D8F85",
  },
  completed: {
    name: "Completed",
    color: "#fff",
    backgroundColor: "#69967B",
  },
};

const Styled = styled.div<{ $status: IStatus }>`
  display: inline-block;
  max-width: max-content;
  padding: 6px 16px;
  font-family: "SuisseIntl", sans-serif;
  font-size: ${(props) => props.$status.fontSize ?? "16px"};
  line-height: 1.125;
  text-align: center;
  font-weight: 300;
  border-radius: 99px;
  color: ${(props) => props.$status.color};
  background-color: ${(props) => props.$status.backgroundColor};
`;

export function TaskStatus(props: { type?: TaskStatusEnum | IStatus }) {
  const status: IStatus =
    typeof props.type === "string"
      ? types[props.type] ?? (types["todo"] as IStatus)
      : (props.type as IStatus);

  return (
    <Styled $status={status}>
      <PixelFix $top="1.5px">{status.name}</PixelFix>
    </Styled>
  );
}
