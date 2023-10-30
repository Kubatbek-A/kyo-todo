import React, { FC } from "react";
import { colors } from "@/helpers/index";
import { Icon } from "../Icon/Icon";
import { StyledModal } from "./Modal.styled";
import { ModalProps } from "antd";
import useBlockScroll from "@/hooks/useBlockScroll/useBlockScroll";

interface IModalProps extends ModalProps {
  children: React.ReactNode;
  open?: boolean;
  onCancel?: () => void;
  isLargeSide?: boolean;
  isCloseWhite?: boolean;
}

export const Modal: FC<IModalProps> = (props) => {
  const { open, isLargeSide, isCloseWhite, ...rest } = props;

  useBlockScroll(!!open);

  return (
    <StyledModal
      open={open}
      isLargeSide={!!isLargeSide}
      centered={!isLargeSide}
      footer={null}
      isCloseWhite={!!isCloseWhite}
      closeIcon={
        <Icon
          name="icon-24-cross"
          color={!!isCloseWhite === !!isLargeSide ? colors.black : colors.white}
        />
      }
      {...rest}
    />
  );
};
