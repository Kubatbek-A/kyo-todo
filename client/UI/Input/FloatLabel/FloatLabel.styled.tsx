import styled from "styled-components";

interface IStyledLabel {
  isFocus: boolean;
  isSelect?: boolean;
  disabled: boolean;
  leftOffset?: number;
}

export const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const StyledLabel = styled.label<IStyledLabel>`
  font-size: ${(props) => (props.isFocus ? "14px" : "16px")};
  font-weight: 300;
  font-family: var(--font-suisseIntl), sans-serif;
  position: absolute;
  pointer-events: none;
  left: ${(props) => props.leftOffset ?? 0}px;
  top: ${({ isFocus, isSelect }) =>
    isFocus ? (isSelect ? "0px" : "5px") : "22px"};
  transition: 0.2s ease all;
  color: ${({ disabled, isFocus, theme }) => {
    if (disabled) {
      return theme.antd.components.Input.colorTextDisabled;
    } else {
      return isFocus
        ? theme.antd.components.Input.colorTextLabel
        : theme.antd.components.Input.colorTextPlaceholder;
    }
  }};
`;
