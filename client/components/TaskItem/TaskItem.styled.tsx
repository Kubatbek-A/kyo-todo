import styled from "styled-components";
import { P7 } from "../../UI/Typography";

export const StyledTaskItem = {
  TaskItem: styled.div`
    background-color: #ffffff;
    border-radius: 20px;
    min-height: 60px;
    display: flex;
    justify-content: space-between;
  `,
  Column: styled.div<{
    $isFirst?: boolean;
    $isLast?: boolean;
    $isFlexEnd?: boolean;
  }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-right: ${(props) => (props.$isLast ? 24 : 14)}px;
    word-break: break-word;
    align-items: ${(props) => (props.$isFlexEnd ? "flex-end" : "flex-start")};
    padding-left: ${(props) => (props.$isFirst ? 24 : 0)}px;
  `,
  Lines: styled.div`
    margin-bottom: -8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
  Line: styled.div`
    margin-bottom: 8px;
  `,
  Buttons: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 9px;
  `,
  Button: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
};

export const StyledTaskDate = styled(P7)`
  display: flex;
  flex-direction: column;
`;
