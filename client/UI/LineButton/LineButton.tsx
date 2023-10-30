import { ReactNode } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import { P6 } from "../Typography";
import ConditionalWrapper from "@/components/ConditionalWrapper/ConditionalWrapper";

const StyledLineButton = styled.button<{ $isFilling?: boolean }>`
  padding: 8px;
  margin: -8px;
  cursor: pointer;

  ${(props) =>
    props.$isFilling &&
    css`
      display: block;
      width: 100%;
    `}
`;

export default function LineButton(props: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  color?: string;
  isFilling?: boolean;
}) {
  return (
    <ConditionalWrapper
      condition={props.href !== undefined}
      wrapper={(children) => <Link href={props.href!}>{children}</Link>}
    >
      <StyledLineButton
        onClick={props.onClick}
        as={props.href ? "a" : "button"}
        $isFilling={props.isFilling}
      >
        <P6 $color="#AC4825">{props.children}</P6>
      </StyledLineButton>
    </ConditionalWrapper>
  );
}
