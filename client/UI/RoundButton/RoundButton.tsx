import { ReactNode } from "react";

import {
  StyledRoundBase as Styled,
  Icon,
  Text,
  BaseProps,
} from "./RoundBase.styled";
import { StyledRoundButton } from "./RoundButton.styled";

export default function RoundButton({
  children,
  iconRight,
  iconLeft,
  onClick,
  isReversedRightIcon,
  isReversedLeftIcon,
  error,
  ...rest
}: {
  children: ReactNode;
  iconRight?: JSX.Element;
  iconLeft?: JSX.Element;
  onClick?: () => void;
  isReversedRightIcon?: boolean;
  isReversedLeftIcon?: boolean;
  error?: string;
} & BaseProps) {
  return (
    <Styled.Wrap>
      <StyledRoundButton onClick={onClick} as="button" {...rest}>
        {iconLeft && (
          <Styled.LeftIcon>
            <Icon $isReversed={isReversedLeftIcon === true}>{iconLeft}</Icon>
          </Styled.LeftIcon>
        )}
        <Text>{children}</Text>
        {iconRight && (
          <Styled.RightIcon>
            <Icon $isReversed={isReversedRightIcon === true}>{iconRight}</Icon>
          </Styled.RightIcon>
        )}
      </StyledRoundButton>
      {error && <Styled.Error>{error}</Styled.Error>}
    </Styled.Wrap>
  );
}
