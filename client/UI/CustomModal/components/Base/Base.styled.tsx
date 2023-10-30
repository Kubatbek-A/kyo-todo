import { colors } from "@/helpers/styleColors";
import styled from "styled-components";

export const Base = {
  Base: styled.div<{ $isHidden?: boolean }>`
    position: fixed;
    inset: 0;
    z-index: 999;
    overflow: auto;
    overflow-x: hidden;
    background-color: ${colors["transparent-gray400"]};
    opacity: ${(props) => (props.$isHidden ? 0 : 1)};
    transition: opacity 0.3s;
  `,
};
