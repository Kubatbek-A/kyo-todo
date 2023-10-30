import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useMemo,
} from "react";
import styled from "styled-components";
import { css } from "styled-components";

export type Size = `${number}${"px" | "%"}`;

const Context = createContext<Size[]>([]);

export function Table(props: { children: ReactNode; columns: Size[] }) {
  return (
    <Context.Provider value={useMemo(() => props.columns, props.columns)}>
      {props.children}
    </Context.Provider>
  );
}

const StyledColumn = styled.div<{ $sizes?: Size[]; $size?: string }>`
  flex: 1;

  ${(props) =>
    props.$size &&
    css`
      max-width: ${props.$size};
    `}
`;

export function TableColumn({
  order,
  ...props
}: Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "ref"
> & { order?: number }) {
  const sizes = useContext(Context);
  const currentSize = order ? sizes[order] : undefined;

  return (
    <StyledColumn $sizes={sizes} $size={currentSize} {...props}></StyledColumn>
  );
}
