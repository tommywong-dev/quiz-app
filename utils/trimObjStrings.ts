export const trimObjStrings = (target: object): object => {
  if (typeof target !== "object") return target;

  return Object.keys(target).reduce((prev, curr) => {
    const val = target[curr as keyof object];

    return {
      ...prev,
      [curr]: typeof val === "string" ? (val as string).trim() : val,
    };
  }, {});
};
