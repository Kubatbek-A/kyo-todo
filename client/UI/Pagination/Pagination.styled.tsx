import { colors } from "@/helpers/styleColors";
import styled, { css } from "styled-components";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import { P6 } from "../Typography";

export interface IPaginationNumberState {
  isSelected?: boolean;
}

export const StyledP6 = styled(P6)``;

export const StyledPaginationNumber = styled.button<IPaginationNumberState>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 54px;
  height: 54px;
  border-radius: 4px;
  padding: 16px 15px;
  border: 1px solid ${colors.gray200};

  &:hover {
    border-color: ${colors.gray300};
  }

  &:disabled {
    border-color: ${colors.gray200};
    cursor: not-allowed;
    ${StyledP6} {
      color: ${colors.gray300};
    }
  }
  &:focus {
    border-color: ${colors.green200};
  }
  ${({ isSelected }) => {
    if (isSelected) {
      return css`
        background: ${colors.black};
        border: unset;
        &:focus {
          border: 1px solid ${colors.green200};
        }
        ${StyledP6} {
          color: ${colors.white};
        }
      `;
    }
  }}
`;

export const StyledPaginationButtonWrapper = styled(ButtonIcon)`
  &.button {
    background-color: ${colors.black}!important;
    border: none !important;
    &:focus {
      border: 1px solid ${colors.green200}!important;
    }
    &:hover:not(:disabled) {
      background-color: ${colors.transparent}!important;
      & > svg {
        fill: ${colors.black};
      }
    }
  }
`;

export const StyledPagination = styled.div`
  display: flex;
  gap: 12px;
`;

export const StyledPaginationNumbers = styled.div`
  display: flex;
  gap: 4px;
`;

export const StyledDots = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const StyledDot = styled.div`
  width: 4px;
  height: 4px;
  background-color: ${colors.black};
  border-radius: 50%;
`;
