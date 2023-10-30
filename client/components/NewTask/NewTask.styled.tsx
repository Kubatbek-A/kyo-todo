import { MediaBreakpoints } from "@/helpers/styleBreakpoints";
import styled from "styled-components";
import { css } from "styled-components";
import { media } from "@/helpers/index";

export const NewTask = {
  NewTask: styled.div``,
  Header: styled.header`
    padding-top: 32px;
    padding-bottom: 32px;
  `,
  XContainer: styled.div`
    padding: 0 24px;
  `,
  Content: styled.div`
    padding-top: 32px;
    padding-bottom: 32px;
  `,
  Elements: styled.div`
    display: grid;
    column-gap: 24px;

    ${media.tablet} {
      grid-template-columns: 2fr 1fr;
    }
  `,
  Line: styled.div`
    height: 1px;
    background-color: #e2e0dc;
  `,
  Buttons: styled.div`
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  `,
};

export const StyledGridItem = styled.div<{
  span?: Partial<Record<keyof typeof MediaBreakpoints, number>>;
}>`
  ${(props) => {
    const { mobile, ...rest } = props.span || {};
    return css`
      grid-column: span ${mobile || 1};

      ${Object.entries(rest).map(
        ([breakpoint, span]) => css`
          ${media[breakpoint]} {
            grid-column: span ${span};
          }
        `,
      )}
    `;
  }}
`;
