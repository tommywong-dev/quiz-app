export const trimObjStrings = <T>(target: T): T => {
  if (typeof target !== "object") return target;

  return Object.keys(target).reduce((prev, curr) => {
    const val = target[curr as keyof T];

    return {
      ...prev,
      [curr]: typeof val === "string" ? val.trim() : val,
    };
  }, {} as T);
};
