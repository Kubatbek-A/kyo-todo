import { ReactNode } from "react";
import styled from "styled-components";
import { LoadingOverlay } from "@/UI/TaskDateInput/TaskDateInput.styled";

export const Content = styled.div`
  background-color: #f0eeeb;
  padding: 34px 60px;
  flex: 1;
  min-height: 100vh;
`;

export default function Layout(props: {
  children: ReactNode;
  isLoading?: boolean;
}) {
  const isPageLoading = props.isLoading;
  return (
    <>
      {!!isPageLoading && <LoadingOverlay />}
      <Content>{props.children}</Content>
    </>
  );
}
