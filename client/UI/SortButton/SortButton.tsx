import { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon } from "../Icon/Icon";
import CustomThemeProvider from "../Provider/themeProvider";
import { P7 } from "../Typography";

const Styled = {
  Button: styled.button`
    display: flex;
    align-items: center;
  `,
  Arrows: styled.div`
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #616161;
  `,
  Arrow: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  ArrowIcon: styled.div<{ $isReversed?: boolean; $isActive?: boolean }>`
    transform-origin: center;
    transform: rotate(${(props) => (props.$isReversed ? 180 : 0)}deg)
      scale(${(props) => (props.$isActive ? 1 : 0.9)});
    opacity: ${(props) => (props.$isActive ? 1 : 0.5)};
    transition:
      transform 0.2s,
      opacity 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

export default function SortButton(props: {
  children?: string;
  isDecorative?: boolean;
  onClick?: (isToLarge: boolean) => void;
  defaultIsToLarge?: boolean;
  isActive?: boolean;
}) {
  const [isToLarge, setIsSmallToLarge] = useState(
    props.defaultIsToLarge ?? true,
  );

  useEffect(() => {
    setIsSmallToLarge(props.defaultIsToLarge ?? true);
  }, [props.defaultIsToLarge]);

  return (
    <CustomThemeProvider
      overwrite={(old) => ({
        ...old,
        components: {
          ...old.components,
          Typography: {
            ...old.components.Typography,
            colorText: "#616161",
          },
        },
      })}
    >
      <Styled.Button
        as={props.isDecorative ? "div" : "button"}
        onClick={() => {
          if (props.isDecorative) return;

          setIsSmallToLarge((old) => !old);
          props.onClick?.(!isToLarge);
        }}
      >
        <P7>{props.children}</P7>
        {!props.isDecorative && (
          <Styled.Arrows>
            <Styled.Arrow>
              <Styled.ArrowIcon
                $isActive={isToLarge || !props.isActive}
                $isReversed
              >
                <Icon name="down-arrow-perfect" size={12} color="none"></Icon>
              </Styled.ArrowIcon>
            </Styled.Arrow>
            <Styled.Arrow>
              <Styled.ArrowIcon $isActive={!isToLarge || !props.isActive}>
                <Icon name="down-arrow-perfect" size={12} color="none"></Icon>
              </Styled.ArrowIcon>
            </Styled.Arrow>
          </Styled.Arrows>
        )}
      </Styled.Button>
    </CustomThemeProvider>
  );
}
