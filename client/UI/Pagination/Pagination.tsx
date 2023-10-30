import * as React from "react";
import { PaginationButton } from "./PaginationButton";
import { StyledPagination, StyledPaginationNumbers } from "./Pagination.styled";
import { PaginationNumber } from "./PaginationNumber";
import { PaginationDots } from "./PaginationDots";
import { Icon } from "../Icon/Icon";
import { DOTS, usePagination } from "@/hooks/usePagination/usePagination";

export interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  onChangePage: (page: number) => void;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  pageSize: number;
}

export function Pagination(props: IPaginationProps) {
  const {
    totalPages,
    currentPage,
    onChangePage,
    hasNextPage,
    hasPreviousPage,
    pageSize,
  } = props;

  const changePageHandler = (page: number) => {
    onChangePage(page);
  };

  const paginationRange = usePagination({
    currentPage,
    pageSize,
    totalPages,
    siblingCount: 1,
  });

  return (
    <StyledPagination>
      <PaginationButton
        icon={
          <Icon name="icon-24-chevron-left" color="white" className="icon" />
        }
        onClick={() => onChangePage(currentPage - 1)}
        disabled={!hasPreviousPage}
      />
      <StyledPaginationNumbers>
        {paginationRange?.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return <PaginationDots key={index} />;
          } else {
            return (
              <PaginationNumber
                key={index}
                onClick={() => changePageHandler(+pageNumber)}
                number={+pageNumber}
                isSelected={+pageNumber === currentPage}
              />
            );
          }
        })}
      </StyledPaginationNumbers>
      <PaginationButton
        icon={
          <Icon name="icon-24-chevron-right" color="white" className="icon" />
        }
        onClick={() => onChangePage(currentPage + 1)}
        disabled={!hasNextPage}
      />
    </StyledPagination>
  );
}
