import { Delete, Get, Patch, Post } from "@/lib/fetchRelation/const/apiFetchrs";
import type { NextApiRequest, NextApiResponse } from "next";

// カート関連のみ。
// 必要条件はカートPOST、DELETE、PATCH
export default async function getCartitems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await Get(`/cartitems?user_id=eq.${req.body}`);
  return res.status(200).json(data);
}
