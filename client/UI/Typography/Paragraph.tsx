import React, { FC } from "react";
import { StyledP4, StyledP6, StyledP7 } from "./Typography.styled";

export interface IP {
  children: React.ReactNode;
  className?: string;
  $isUppercase?: boolean;
  asElement?: any;
  $color?: string;
}

export const P4: FC<IP> = ({
  children,
  className = "",
  $isUppercase = false,
  asElement,
}) => (
  <StyledP4 as={asElement} className={className} $isUppercase={$isUppercase}>
    {children}
  </StyledP4>
);

export const P6: FC<IP> = ({
  children,
  className,
  $isUppercase = false,
  asElement,
  $color,
}) => (
  <StyledP6
    as={asElement}
    $isUppercase={$isUppercase}
    className={className}
    $color={$color}
  >
    {children}
  </StyledP6>
);

export const P7: FC<IP> = ({
  children,
  className = "",
  $isUppercase = false,
  asElement,
}) => (
  <StyledP7 as={asElement} $isUppercase={$isUppercase} className={className}>
    {children}
  </StyledP7>
);
