import { DeepPartial } from "./deepPartial";

export default function withDefaultData<
  T extends Record<string, unknown>,
  TDefault extends DeepPartial<T>,
>(origin: T, defaultValues: TDefault) {
  const result = { ...origin } as Record<string, any>;

  Object.keys(defaultValues).forEach((key) => {
    if (result[key] === undefined || result[key] === null) {
      result[key] = defaultValues[key];

      return;
    }

    if (
      typeof defaultValues[key] === "object" &&
      !Array.isArray(defaultValues[key])
    ) {
      result[key] = withDefaultData(result[key], defaultValues[key]);
    }
  });

  return result as T & TDefault;
}
