import { colors } from "@/helpers/styleColors";
import styled from "styled-components";

export const Backdrop = styled.div<{ $isHidden: boolean }>`
  height: 100%;
  background-color: ${colors["transparent-gray400"]};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  opacity: ${(props) => (props.$isHidden ? 0 : 1)};
  transition: opacity 0.3s;
`;
