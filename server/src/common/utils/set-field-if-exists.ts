export const setFieldIfExists = <T>(obj: T, field: keyof T, value) => {
  if (value !== undefined) {
    obj[field] = value;
  }
};
