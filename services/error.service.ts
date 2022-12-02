import { NextApiResponse } from "next";
import { makeResponse } from "../utils";

export const throwBadRequest = (res: NextApiResponse) => {
  res.status(400).json(makeResponse(400, "bad request"));
};

export const throwInvalidMethod = (res: NextApiResponse) => {
  res.status(405).json(makeResponse(405, "invalid request method"));
};
