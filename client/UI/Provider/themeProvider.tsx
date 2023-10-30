import { ThemeProvider } from "styled-components";
import { antdThemeLight, ProjectAntdTheme } from "@/helpers/styles/antdTheme";
import { themeDark } from "@/helpers/styles/customTheme";
import React, { useMemo } from "react";
import { DeepPartial } from "@/helpers/deepPartial";

interface IThemeProvider {
  children: React.ReactNode;
  overwrite?: (original: ProjectAntdTheme) => DeepPartial<ProjectAntdTheme>;
}

const CustomThemeProvider = ({ children, overwrite }: IThemeProvider) => {
  const theme = useMemo(() => {
    const original = antdThemeLight as ProjectAntdTheme;
    return {
      antd: {
        ...original,
        ...(overwrite?.(original) ?? {}),
      },
      custom: themeDark,
    };
  }, [overwrite]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
