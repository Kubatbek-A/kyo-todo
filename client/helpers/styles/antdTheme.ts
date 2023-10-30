import { colors } from "..";

export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};

export const antdThemeLight = {
  token: {
    colorWhite: colors.white,
  },
  components: {
    Button: {
      colorPrimaryText: colors.white,
      colorText: colors.black,
      colorBorder: colors.black,
      colorBgContainer: "transparent",
      colorPrimaryBg: colors.black,
      colorPrimaryBgHover: "transparent",
      colorInfoBgHover: colors.black,
      colorIcon: colors.white,
    },
    Input: {
      colorBorder: colors["transparent-gray200"],
      colorPrimaryBorderHover: colors.black,
      colorText: colors.black,
      colorError: colors.red200,
      colorErrorBorder: colors.red200,
      colorTextDisabled: colors["transparent-gray200"],
      colorTextPlaceholder: colors.black,
      colorTextLabel: colors["transparent-gray300"],
      colorTextDescription: colors["transparent-gray300"],
    },
    Typography: {
      colorText: colors.black,
    },
    Divider: {
      colorSplit: colors["transparent-gray200"],
    },
    Select: {
      colorBgContainer: colors.transparent,
      controlItemBgActive: colors.gray200,
      colorBgElevated: colors.gray100,
      colorTextTertiary: colors.black,
      fontSize: 16,
      controlHeight: 54,
      borderRadius: 0,
      borderRadiusLG: 0,
      borderRadiusSM: 0,
      paddingXXS: 0,
      boxShadowSecondary: "none",
      colorBorder: colors["transparent-gray200"],
      colorPrimaryHover: colors.black,
      controlOutline: colors.transparent,
    },
  },
};

type ProjectAntdThemeLight = typeof antdThemeLight;

export type ProjectAntdTheme = Simplify<ProjectAntdThemeLight>;
