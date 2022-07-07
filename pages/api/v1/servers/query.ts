import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import StandardResponse from "../../../../typings/api/StandardResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) {
  if (req.method !== "GET")
    return res.status(405).json({
      message: "Method not allowed. Use GET",
      data: null,
    });

  if (Array.isArray(req.query.cursor))
    return res.status(400).json({
      message: "Cursor must be a string",
      data: null,
    });

  if (Array.isArray(req.query.id))
    return res.status(400).json({
      message: "ID must be a string",
      data: null,
    });

  if (Array.isArray(req.query.name))
    return res.status(400).json({
      message: "Name must be a string",
      data: null,
    });

  if (Array.isArray(req.query.size))
    return res.status(400).json({
      message: "Size must be a string",
      data: null,
    });

  if (
    !["TINY", "SMALL", "MEDIUM", "LARGE", "OPERATION", undefined].includes(
      req.query.size
    )
  )
    return res.status(400).json({
      message: "Size must be one of TINY, SMALL, MEDIUM, LARGE, OPERATION",
      data: null,
    });

  if (Array.isArray(req.query.serverId))
    return res.status(400).json({
      message: "ServerId must be a string",
      data: null,
    });

  await prisma.$connect();
  const query = await prisma.scamServer.findMany({
    take: 10,
    skip: req.query.cursor ? 1 : 0,
    cursor: req.query.cursor ? { id: req.query.cursor } : undefined,

    where: {
      id: req.query.id || undefined,
      name: req.query.name
        ? {
            contains: req.query.name,
          }
        : undefined,
      size: (req.query.size as any) || undefined,
      serverId: req.query.serverId || undefined,
      invites: req.query.invites?.length
        ? {
            hasSome: req.query.invites || undefined,
          }
        : undefined,
    },
  });

  return res.status(200).json({
    message: "Success",
    data: {
      query,
      cursor: query.at(-1),
    },
  });
}
