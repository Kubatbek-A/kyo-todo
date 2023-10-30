/* eslint-disable react/display-name */
import React from "react";
import { Icon } from "../Icon/Icon";
import { Size, StyledButton } from "./ButtonIcon.styled";
import { ButtonProps } from "antd";
import { Modify } from "@/helpers/utils";

export type IButtonIconProps = Modify<
  ButtonProps,
  {
    disabled?: boolean;
    type?: "primary" | "secondary" | "tertiary";
    icon: React.ReactNode;
    isLoading?: boolean;
    size?: "L" | "M" | "S" | Size;
    className?: string;
    color?: string;
    iconColor?: string;
    iconColorHover?: string;
    children?: React.ReactNode;
  }
>;

export const ButtonIcon = React.forwardRef<HTMLButtonElement, IButtonIconProps>(
  (
    {
      disabled = false,
      onClick,
      icon,
      isLoading = false,
      size = "L",
      type = "primary",
      className = "",
      color,
      iconColor,
      iconColorHover,
      children,
      ...restProps
    },
    ref,
  ) => (
    <StyledButton
      {...restProps}
      ref={ref}
      className={className}
      disabled={disabled}
      kind={type}
      onClick={onClick}
      icon={isLoading ? <Icon name="icon-24-loading" /> : icon}
      scale={size}
      color={color}
      $iconColor={iconColor}
      $iconColorHover={iconColorHover}
    >
      {children}
    </StyledButton>
  ),
);
