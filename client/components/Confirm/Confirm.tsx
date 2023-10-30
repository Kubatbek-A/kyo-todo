import styled from "styled-components";
import { H3 } from "../../UI/Typography";
import { Button } from "../../UI/Button/Button";

const StyledConfirm = {
  Confirm: styled.div`
    padding-top: 64px;
    padding-bottom: 64px;
  `,
  Rows: styled.div<{ $gap: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: ${(props) => props.$gap};
  `,
  Columns: styled.div<{ $gap: string }>`
    display: flex;
    align-items: center;
    gap: ${(props) => props.$gap};
  `,
};

export default function Confirm(props: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <StyledConfirm.Confirm>
      <StyledConfirm.Rows $gap="32px">
        <H3 $isUppercase>Are you sure?</H3>
        <StyledConfirm.Columns $gap="16px">
          <Button type="primary" onClick={props.onConfirm}>
            Yes
          </Button>
          <Button onClick={props.onCancel}>No</Button>
        </StyledConfirm.Columns>
      </StyledConfirm.Rows>
    </StyledConfirm.Confirm>
  );
}
