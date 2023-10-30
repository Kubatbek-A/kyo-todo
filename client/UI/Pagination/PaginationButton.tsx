import { colors } from "@/helpers/styleColors";
import * as React from "react";
import { StyledPaginationButtonWrapper } from "./Pagination.styled";
import { IButtonIconProps } from "../ButtonIcon/ButtonIcon";

export interface IPaginationButtonProps extends IButtonIconProps {}

export function PaginationButton(props: IPaginationButtonProps) {
  return (
    <StyledPaginationButtonWrapper
      className="button"
      size="M"
      type="secondary"
      color={colors.white}
      {...props}
    />
  );
}
