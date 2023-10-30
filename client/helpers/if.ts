// "any" is to support the dynamic conversion to boolean
export function If<F, S>(condition: any, first: F, second: S): F | S {
  return condition ? first : second;
}
