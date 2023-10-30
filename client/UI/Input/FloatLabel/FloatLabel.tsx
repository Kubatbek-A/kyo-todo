import React, { FC, useState } from "react";
import { StyledContainer, StyledLabel } from "./FloatLabel.styled";

interface IFloatLabelProps {
  label: string;
  isFilled: boolean;
  disabled: boolean;
  children: React.ReactNode;
  isForceFocus?: boolean;
  isSelect?: boolean;
  isHide?: boolean;
  isReadOnly?: boolean;
  leftOffset?: number;
}

export const FloatLabel: FC<IFloatLabelProps> = (props) => {
  const {
    children,
    label,
    disabled,
    isForceFocus,
    isSelect,
    isFilled,
    isReadOnly,
    leftOffset,
  } = props;
  const [focus, setFocus] = useState(false);

  const isFocus = isForceFocus || (focus && !isReadOnly) || isFilled;

  return (
    <StyledContainer
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {children}
      <StyledLabel
        isFocus={isFocus}
        disabled={disabled}
        isSelect={isSelect}
        leftOffset={leftOffset}
      >
        {label}
      </StyledLabel>
    </StyledContainer>
  );
};
