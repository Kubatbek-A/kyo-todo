import React, { FC } from "react";
import { StyledC1 } from "./Typography.styled";

interface IH {
  children: React.ReactNode;
  $isUppercase?: boolean;
  className?: string;
}

export const C1: FC<IH> = ({
  children,
  $isUppercase = false,
  className = "",
}) => (
  <StyledC1 $isUppercase={$isUppercase} className={className}>
    {children}
  </StyledC1>
);
