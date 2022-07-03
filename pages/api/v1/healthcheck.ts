import { NextApiRequest, NextApiResponse } from "next";
import StandardResponse from "../../../typings/api/StandardResponse";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse<null>>
) {
  res.status(200).json({
    message: "Healthcheck successful",
    data: null,
  });
}
