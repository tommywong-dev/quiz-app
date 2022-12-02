import { NextApiRequest, NextApiResponse } from "next";
import { getQuiz, throwInvalidMethod } from "../../../services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method?.toUpperCase()) {
    case "GET":
      return getQuiz(req.query.id, res);
    default:
      return throwInvalidMethod(res);
  }
}
