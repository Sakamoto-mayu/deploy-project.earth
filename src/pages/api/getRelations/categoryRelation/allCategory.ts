import { Get } from "@/lib/fetchRelation/const/apiFetchrs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function allCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await Get(`/category`);
  return res.status(200).json(data);
}
