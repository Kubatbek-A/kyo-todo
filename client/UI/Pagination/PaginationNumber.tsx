import * as React from "react";
import { StyledP6, StyledPaginationNumber } from "./Pagination.styled";

export interface IPaginationNumberProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  number: number;
  isSelected: boolean;
}

export function PaginationNumber(props: IPaginationNumberProps) {
  const { number, ...buttonProps } = props;
  return (
    <StyledPaginationNumber {...buttonProps}>
      <StyledP6>{number}</StyledP6>
    </StyledPaginationNumber>
  );
}
