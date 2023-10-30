import styled from "styled-components";
import { css } from "styled-components";

const Undisplayed = styled.div<{ $isVisible?: boolean }>`
  ${(props) =>
    !props.$isVisible &&
    css`
      display: none;
    `}
`;

export default Undisplayed;
