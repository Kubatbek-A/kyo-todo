import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import { Icon } from "../Icon/Icon";
import useOuterClick from "@/hooks/useOuterClick/useOuterClick";
import useEventCallback from "@/hooks/useEventCallback/useEventCallback";
import {
  Text as RoundButtonText,
  StyledRoundBase,
  Icon as StyledIconBase,
  baseHeight,
} from "../RoundButton/RoundBase.styled";
import RoundButton from "../RoundButton/RoundButton";
import voidFunc from "@/helpers/voidFunc";
import useConst from "@/hooks/useConst/useConst";
import { PixelFix } from "../PixelFix/PixelFix";
import { If } from "@/helpers/if";

export interface IOption<T extends string | number = string | number> {
  value: T;
  label: string;
  icon?: JSX.Element;
}

const Styled = {
  Select: styled.div`
    position: relative;
  `,
  Icon: styled.div``,
  List: styled.div<{ $isHidden?: boolean }>`
    position: absolute;
    top: ${baseHeight + 8}px;
    left: 0;
    right: 0;
    max-height: ${baseHeight * 4}px;
    max-height: min(100vh, ${baseHeight * 4}px);
    border-radius: 26px;
    z-index: 20;
    overflow: auto;
    opacity: 1;
    transform-origin: top center;
    transition:
      transform 0.2s,
      opacity 0.2s;

    ${(props) =>
      props.$isHidden &&
      css`
        opacity: 0;
        transform: translateY(-8px) scale(0.95);
        pointer-events: none;
      `}
  `,
  Option: styled.div`
    height: ${baseHeight}px;
    display: flex;
    align-items: center;
    padding-left: 21px;
    padding-right: 21px;
    background-color: #e6e4e1;
    cursor: pointer;
  `,
};

export default function Select<
  T extends string | number = string | number,
>(props: {
  options: IOption<T>[];
  activeOption?: IOption<T> | T;
  placeholder?: string;
  defaultValue?: IOption<T>;
  onSelect(option: IOption<T>): void;
  icon?: JSX.Element;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOption, setCurrentOption] = If(
    useConst(props.activeOption !== undefined),
    [
      useMemo(
        () =>
          typeof props.activeOption === "string" ||
          typeof props.activeOption === "number"
            ? props.options.find(
                (option) => option.value === props.activeOption,
              )
            : (props.activeOption as IOption<T>),
        [props.activeOption, props.options],
      ),
      voidFunc,
    ],
    useState(props.defaultValue),
  );

  const selectElement = useRef<HTMLDivElement>(null);

  useOuterClick(
    selectElement,
    useEventCallback(() => {
      isOpen && setIsOpen(false);
    }),
    [],
    useEventCallback(() => isOpen),
  );

  function selectHandler(option: IOption<T>) {
    setCurrentOption(option);
    props.onSelect(option);
  }

  return (
    <Styled.Select ref={selectElement}>
      <RoundButton
        onClick={() => setIsOpen((old) => !old)}
        iconRight={
          <Icon name="down-arrow-perfect" size={12} color="none"></Icon>
        }
        iconLeft={props.icon ?? currentOption?.icon}
        isReversedRightIcon={isOpen}
      >
        <PixelFix $top="1.5px">
          {currentOption?.label ??
            props.defaultValue?.label ??
            props.placeholder}
        </PixelFix>
      </RoundButton>
      <Styled.List $isHidden={!isOpen}>
        {props.options
          .filter((options) => options.value !== currentOption?.value)
          .map((option, index) => (
            <Styled.Option
              key={index}
              onClick={() => {
                selectHandler(option);
                setIsOpen(false);
              }}
            >
              {option.icon && (
                <StyledRoundBase.LeftIcon>
                  <StyledIconBase>{option.icon}</StyledIconBase>
                </StyledRoundBase.LeftIcon>
              )}
              <RoundButtonText>
                <PixelFix $top="1.5px">{option.label}</PixelFix>
              </RoundButtonText>
            </Styled.Option>
          ))}
      </Styled.List>
    </Styled.Select>
  );
}
