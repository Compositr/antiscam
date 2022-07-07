import { NextApiRequest, NextApiResponse } from "next";
import StandardResponse from "../../../../typings/api/StandardResponse";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse<null | string>>
) {
  if (req.headers.authorization !== `Bearer ${process.env.REPORT_APIKEY}`)
    return res.status(401).json({
      message: "Unauthorized. Missing/Incorrect API Key",
      data: null,
    });

  if (req.method === "POST") {
    if (!req.body?.name)
      return res.status(400).json({
        message: "Missing name",
        data: null,
      });
    if (!req.body?.invites?.length)
      return res.status(400).json({
        message: "No invites provided",
        data: null,
      });
    if (
      !["TINY", "SMALL", "MEDIUM", "LARGE", "OPERATION"].includes(
        req.body?.size
      )
    )
      return res.status(400).json({
        message:
          "Invalid size. It must be one of TINY, SMALL, MEDIUM, LARGE, OPERATION",

        data: null,
      });

    if (!req.body?.serverId)
      return res.status(400).json({
        message: "Missing serverId",
        data: null,
      });

    await prisma?.$connect();

    const doc = await prisma.reportedServer.findFirst({
      where: {
        serverId: req.body.serverId,
      },
    });
    const doc2 = await prisma.scamServer.findFirst({
      where: {
        serverId: req.body.serverId,
      },
    });
    if (doc !== null)
      return res.status(409).json({
        message: "Server already reported, serverId conflict",
        data: null,
      });
    if (doc2 !== null)
      return res.status(409).json({
        message: "Server already in scamServers collection, serverId conflict",
        data: null,
      });
    const created = await prisma.reportedServer.create({
      data: {
        serverId: req.body.serverId,
        name: req.body.name,
        size: req.body.size,
        invites: req.body.invites,
      },
    });
    res.status(201).json({
      message: "Success",
      data: created.id,
    });
  }

  return res.status(405).json({
    message: "Method not allowed",
    data: null,
  });
}
