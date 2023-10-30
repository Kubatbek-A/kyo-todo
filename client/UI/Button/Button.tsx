/* eslint-disable react/display-name */
import React from "react";
import { StyledButton } from "./Button.styled";
import { ButtonProps } from "antd";

interface IButtonProps extends ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  iconPrimaryLeft?: React.ReactNode;
  iconPrimaryRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  type?: "primary" | "default";
  className?: string;
  onClick?: () => void;
  iconColor?: string;
  iconColorHover?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (props, ref) => {
    const {
      children,
      disabled = false,
      iconPrimaryLeft,
      iconPrimaryRight,
      iconLeft,
      iconRight,
      type = "default",
      className,
      onClick,
      iconColor,
      iconColorHover,
      ...rest
    } = props;

    const vectorIcon = () => {
      if (iconPrimaryLeft && iconPrimaryRight) {
        return "All";
      }

      if (iconPrimaryLeft) {
        return "Left";
      }

      if (iconPrimaryRight) {
        return "Right";
      }

      return undefined;
    };

    return (
      <StyledButton
        ref={ref}
        disabled={disabled}
        vectoricon={vectorIcon()}
        type={type}
        className={className}
        onClick={onClick}
        $iconColor={iconColor}
        $iconColorHover={iconColorHover}
        {...rest}
      >
        {(iconPrimaryLeft || iconLeft) && (
          <span className={iconLeft ? "icon-default" : "icon-primary"}>
            {iconLeft || iconPrimaryLeft}
          </span>
        )}
        {children}
        {(iconPrimaryRight || iconRight) && (
          <span className={iconRight ? "icon-default" : "icon-primary"}>
            {iconRight || iconPrimaryRight}
          </span>
        )}
      </StyledButton>
    );
  },
);
