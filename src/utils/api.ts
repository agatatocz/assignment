export const apiParamToNumber = (param: string | null): number | undefined =>
  param && param !== "undefined" ? Number(param) : undefined;
