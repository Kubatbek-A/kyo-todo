import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const convertToQuery = (query: Record<string, string | number>) => {
  return Object.entries(query).reduce((acc, [key, value], i, arr) => {
    if (!acc) return `${key}=${value}`;
    else if (i === arr.length - 1) return `${acc}&${key}=${value}`;
    else return `${acc}&${key}=${value}`;
  }, "");
};

const parseQuery = (hash: string) => {
  return hash
    .split("&")
    .filter((el) => el)
    .reduce<Record<string, string>>((acc, item) => {
      const [key, value] = item.split("=");
      acc[key] = value;
      return acc;
    }, {});
};

interface BaseFilterValues {
  filter?: Record<string, any>;
  sort?: Record<string, any>;
  page?: Record<string, any>;
}

interface QueryFields {
  filter?: string[];
  page?: string[];
  sort?: string[];
}

type GetInitialCallback<T extends BaseFilterValues> = Dispatch<
  SetStateAction<T>
>;

type AdditionalActions = [string, Dispatch<SetStateAction<any>>][];

export const useLastRoute = <T extends BaseFilterValues>(
  fields?: QueryFields,
  cb?: GetInitialCallback<T>,
  actions?: AdditionalActions,
) => {
  const [query, setQuery] = useState<Record<string, string | number>>({});
  const [filterFields, setFilterFields] = useState(["search"]);
  const [sortFields, setSortFields] = useState(["sortBy", "sortAt"]);
  const [pageFields, setPageFields] = useState(["page", "limit"]);

  const { back: routerBack, events, asPath } = useRouter();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const initialQuery = parseQuery(hash);
    setQuery(initialQuery);
    cb?.((prev) => {
      const copy = { ...prev };
      if (!copy.filter) copy.filter = {};
      if (!copy.sort) copy.sort = {};
      if (!copy.page) copy.page = {};

      filterFields.forEach((field) => {
        if (initialQuery[field]) copy.filter![field] = initialQuery[field];
      });
      sortFields.forEach((field) => {
        if (initialQuery[field]) copy.sort![field] = initialQuery[field];
      });
      pageFields.forEach((field) => {
        if (initialQuery[field]) copy.page![field] = initialQuery[field];
      });

      return copy;
    });

    actions?.forEach(([key, action]) => {
      if (initialQuery[key]) {
        action(initialQuery[key]);
      }
    });
  }, [filterFields, sortFields, pageFields]);

  useEffect(() => {
    setFilterFields((prev) => [...prev, ...(fields?.filter ?? [])]);
    setSortFields((prev) => [...prev, ...(fields?.sort ?? [])]);
    setPageFields((prev) => [...prev, ...(fields?.page ?? [])]);
  }, []);

  useEffect(() => {
    const handler = () => {
      const queryString = convertToQuery(query);
      const purePath = asPath.replace(/#.*/g, "");
      sessionStorage.setItem(
        "last-url",
        `${purePath}${queryString ? `#${queryString}` : queryString}`,
      );
    };

    events.on("routeChangeStart", handler);

    return () => {
      events.off("routeChangeStart", handler);
    };
  }, [query]);

  const checkPrevPage = () => {
    if (typeof window !== "undefined") {
      const lastUrl = sessionStorage.getItem("last-url");
      if (!lastUrl) {
        return false;
      }
      return true;
    }
    return false;
  };

  const getBackLink = (defaultLink: string, withAction?: boolean) => {
    if (checkPrevPage()) {
      if (withAction) {
        routerBack();
      }

      return sessionStorage.getItem("last-url") ?? "";
    } else {
      return defaultLink;
    }
  };

  const updateQuery = (newQuery: Record<string, string | number>) => {
    const tempQuery = { ...query };

    Object.entries(newQuery).forEach(([key, value]) => {
      if (value) tempQuery[key] = value;
      else delete tempQuery[key];
    });

    setQuery(tempQuery);

    window.location.hash = convertToQuery(tempQuery);
  };

  const resetQuery = () => {
    window.location.hash = "";
    setQuery({});
  };

  return {
    getBackLink,
    updateQuery,
    resetQuery,
  };
};
