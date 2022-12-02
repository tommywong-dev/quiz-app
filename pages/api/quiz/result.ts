import { NextApiRequest, NextApiResponse } from "next";
import {
  calculateResult,
  throwBadRequest,
  throwInvalidMethod,
} from "../../../services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method?.toUpperCase()) {
    case "POST":
      const answers: string[] = req.body.answers;
      if (!answers) {
        return throwBadRequest(res);
      }
      return calculateResult(answers, res);
    default:
      return throwInvalidMethod(res);
  }
}
