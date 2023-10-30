import styled from "styled-components";
import { Input } from "antd";
import { media } from "@/helpers/styleBreakpoints";

interface StyledInputProps {
  isHideLabel?: boolean;
  isFilled?: boolean;
}

export const StyledInput = styled(Input)<StyledInputProps>`
  padding: 25px 0 12px 0;
  border: none;
  background-color: transparent;
  color: ${(props) =>
    props.disabled
      ? props.theme.antd.components.Input.colorTextDisabled
      : props.theme.antd.components.Input.colorText};
  border-bottom: 1px solid
    ${(props) =>
      props.status === "error"
        ? props.theme.antd.components.Input.colorErrorBorder
        : props.theme.antd.components.Input.colorBorder};
  border-radius: 0;
  outline: none;
  box-shadow: none !important;

  font-weight: 300;
  font-size: 16px;
  line-height: 35px;
  font-family: SuisseIntl, sans-serif;

  ${media.tablet} {
    padding: ${(props) => (props.isFilled ? "19px" : "19px")} 0 8px 0;
  }

  .ant-input {
    font-family: SuisseIntl, sans-serif !important;

    &-disabled {
      background-color: transparent !important;
    }
  }

  &:hover {
    border-color: ${({ theme }) =>
      theme.antd.components.Input.colorPrimaryBorderHover} !important;
  }

  input {
    background: transparent;
  }

  &.ant-input-affix-wrapper {
    ${media.tablet} {
      input {
        &.ant-input {
          padding-top: 5px;
        }
      }
    }
  }

  .ant-input-prefix {
    margin-inline-end: 16px;
  }

  &.ant-input-affix-wrapper-focused {
    box-shadow: none;
    border-color: ${({ theme }) =>
      theme.antd.components.Input.colorPrimaryBorderHover};
  }
`;

export const StyledInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
`;

export const StyledHintsWrapper = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
`;

export const StyledError = styled.span`
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.antd.components.Input.colorError};
`;
