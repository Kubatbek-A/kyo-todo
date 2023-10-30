import styled from "styled-components";
import { ReactNode, useMemo } from "react";
import ConditionalWrapper from "@/components/ConditionalWrapper/ConditionalWrapper";
import maybeFunction from "@/helpers/maybeFunction";
import useForceRender from "@/hooks/useForceRender/useForceRender";
import ReMount from "@/components/ReMount/ReMount";
import { H5 } from "../Typography";
import { Size, Table, TableColumn } from "../Table/Table";
import { Pagination } from "../Pagination/Pagination";
import LineButton from "../LineButton/LineButton";

const StyledBigTable = styled.div<{ $isLoading?: boolean }>`
  opacity: ${(props) => (props.$isLoading ? 0.7 : 1)};
  transition: opacity 0.2s;
`;

const StyledSearch = styled.div`
  max-width: 257px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SortButtons = styled.div`
  margin-top: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
`;
const HeaderButtons__Item = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  min-width: 180px;
  box-sizing: content-box;
`;

const StyledFirstColumn = styled.div<{ $offset?: string }>`
  margin-left: ${(props) => props.$offset ?? "20px"};
  height: 100%;
`;

const List = styled.div<{ $isLoading?: boolean }>`
  margin-top: 11px;
  margin-bottom: -8px;
  opacity: ${(props) => (props.$isLoading ? 0.5 : 1)};
  transition: opacity 0.2s;
`;

const EmptyList = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const List__Item = styled.div`
  margin-bottom: 8px;
`;
const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

const StyledColumn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export default function BigTableWithControls(props: {
  columnsSize?: Size[];
  headerSearch?: ReactNode;
  headerButtons?: JSX.Element[];
  sortButtons?: JSX.Element[];
  items:
    | JSX.Element[]
    | ((
        FirstColumnWrapper: (props: { children?: ReactNode }) => JSX.Element,
      ) => JSX.Element[]);
  pagination?: IPagination;
  onChangePage?: (page: number) => void;
  firstColumnOffset?: string;
  onResetControls?: () => void;
  hideResetControls?: boolean;
  isLoading?: boolean;
}) {
  const [remountControls, currentControlsMount] = useForceRender();

  const items = useMemo(
    () => maybeFunction(props.items)(StyledFirstColumn),
    [props.items, StyledFirstColumn],
  );

  function resetControls() {
    props.onResetControls?.();
    remountControls();
  }

  return (
    <StyledBigTable $isLoading={props.isLoading && items.length === 0}>
      <Header>
        {props.headerSearch && (
          <ReMount deps={[currentControlsMount]}>
            <StyledSearch>{props.headerSearch}</StyledSearch>
          </ReMount>
        )}
        {!!props.headerButtons?.length && (
          <HeaderButtons>
            {props.headerButtons.map((headerButton, index) => (
              <HeaderButtons__Item key={index}>
                {headerButton}
              </HeaderButtons__Item>
            ))}
          </HeaderButtons>
        )}
      </Header>
      <Table
        columns={
          props.columnsSize ?? [
            "108px",
            "15.2%",
            "8.8%",
            "9.6%",
            "138px",
            "110px",
          ]
        }
      >
        {!!props.sortButtons?.length && (
          <SortButtons>
            {props.sortButtons.map((sortButton, index) => (
              <TableColumn key={index}>
                <StyledColumn>
                  <ConditionalWrapper
                    condition={index === 0}
                    wrapper={(children) => (
                      <StyledFirstColumn $offset={props.firstColumnOffset}>
                        {children}
                      </StyledFirstColumn>
                    )}
                  >
                    {sortButton}
                  </ConditionalWrapper>
                  {props.onResetControls &&
                    !props.hideResetControls &&
                    index + 1 === props.sortButtons?.length && (
                      <LineButton onClick={resetControls}>Reset</LineButton>
                    )}
                </StyledColumn>
              </TableColumn>
            ))}
          </SortButtons>
        )}
        <List $isLoading={props.isLoading}>
          {items.length === 0 ? (
            <EmptyList>
              <H5>No Data</H5>
            </EmptyList>
          ) : (
            items.map((item, index) => (
              <List__Item key={index}>{item}</List__Item>
            ))
          )}
        </List>
      </Table>
      {!!(props.pagination && props.onChangePage) &&
        props.pagination.pageCount > 1 && (
          <StyledPagination>
            <Pagination
              currentPage={props.pagination.page}
              hasNextPage={props.pagination.hasNextPage}
              hasPreviousPage={props.pagination.hasPreviousPage}
              totalPages={props.pagination.pageCount}
              pageSize={props.pagination.limit}
              onChangePage={props.onChangePage}
            />
          </StyledPagination>
        )}
    </StyledBigTable>
  );
}
