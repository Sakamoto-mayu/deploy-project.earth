import { Get } from "@/lib/fetchRelation/const/apiFetchrs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function suggest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await Get(`/suggest`);
  return res.status(200).json(data);
}
