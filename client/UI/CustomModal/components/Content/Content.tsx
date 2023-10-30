import { ReactNode } from "react";
import { IContentProps, Content as Styled } from "./Content.styled";
import { Icon } from "@/UI/Icon/Icon";

export default function Content({
  children,
  onClose,
  ...rest
}: {
  children: ReactNode;
  onClose?: () => void;
} & IContentProps) {
  return (
    <Styled.Content {...rest}>
      {onClose && (
        <Styled.CloseButton onClick={onClose}>
          <Icon name="icon-24-cross" size={24}></Icon>
        </Styled.CloseButton>
      )}
      {children}
    </Styled.Content>
  );
}
