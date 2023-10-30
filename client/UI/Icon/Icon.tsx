import { FC } from "react";
import { StyledIcon } from "./Icon.styled";

type TSizeIcon = 12 | 16 | 24 | 32 | 54 | 64 | number;

interface IIconProps {
  name: string;
  color?: string;
  size?: TSizeIcon;
  className?: string;
  fill?: string;
}

export const Icon: FC<IIconProps> = (props) => {
  const { name, color = "black", size = 24, className, fill } = props;

  return (
    <StyledIcon
      color={color}
      size={size}
      fill={fill ?? color}
      className={className}
    >
      <use xlinkHref={`#${name}`} />
    </StyledIcon>
  );
};
