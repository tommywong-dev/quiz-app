import { IResponse } from "../interfaces";

export const makeResponse = <T>(
  statusCode: number,
  message?: string,
  data?: T
): IResponse<T> => {
  return { statusCode, message, data };
};
