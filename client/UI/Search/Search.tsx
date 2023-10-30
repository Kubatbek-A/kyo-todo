import { If } from "@/helpers/if";
import useConst from "@/hooks/useConst/useConst";
import { useState } from "react";
import styled from "styled-components";
import { Icon } from "../Icon/Icon";

const Styled = {
  Search: styled.div`
    position: relative;
    width: 100%;
  `,
  Button: styled.button`
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    display: flex;
    color: #616161;
  `,
  Input: styled.input`
    width: 100%;
    padding: 17px 16px 14px 50px;
    font-size: 14px;
    line-height: 20px;
    font-family: var(--font-suisseIntl), sans-serif;
    color: #616161;
    border: none;
    border-radius: 999px;
  `,
};

export default function Search(props: {
  outerValue?: string;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  placeholder?: string;
}) {
  const [value, setValue] = If(
    useConst(props.outerValue !== undefined),
    [props.outerValue || "", () => {}],
    useState(""),
  );

  return (
    <Styled.Search>
      <Styled.Button type="button" onClick={() => props.onSearch?.(value)}>
        <Icon name="search-icon" color="none" size={18}></Icon>
      </Styled.Button>
      <Styled.Input
        value={props.outerValue ?? value}
        onChange={(event) => {
          setValue(event.target.value);
          props.onChange?.(event.target.value);
        }}
        placeholder={props.placeholder ?? "Search"}
        onKeyDown={(event) => event.key === "Enter" && props.onSearch?.(value)}
      ></Styled.Input>
    </Styled.Search>
  );
}
