import React, { FC } from "react";
import { StyledH3, StyledH5 } from "./Typography.styled";

interface IH {
  children?: React.ReactNode;
  $isUppercase?: boolean;
  className?: string;
  asElement?: any;
  html?: string;
}

export const H3: FC<IH> = ({
  children,
  className = "",
  $isUppercase = false,
  asElement,
  html,
}) => (
  <StyledH3
    className={className}
    $isUppercase={$isUppercase}
    as={asElement}
    {...(children
      ? { children }
      : { dangerouslySetInnerHTML: { __html: html } })}
  ></StyledH3>
);

export const H5: FC<IH> = ({
  children,
  className = "",
  $isUppercase = false,
  asElement,
  html,
}) => (
  <StyledH5
    className={className}
    $isUppercase={$isUppercase}
    as={asElement}
    {...(children
      ? { children }
      : { dangerouslySetInnerHTML: { __html: html } })}
  ></StyledH5>
);
