import { Delete, Get, Patch, Post } from "@/lib/fetchRelation/const/apiFetchrs";
import type { NextApiRequest, NextApiResponse } from "next";

// カート関連のみ。
// 必要条件はカートPOST、DELETE、PATCH
export default async function cartDataEdit(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.body.method === "POST") {
    const data = await Post(req.body.bodyValue, `/cartitems`);
    return res.status(200).json(data);
  }
  if (req.body.method === "PATCH") {
    const data = await Patch(
      req.body.bodyValue,
      `/cartitems?user_id=eq.${req.body.bodyValue.user_id}&item_id=eq.${req.body.bodyValue.item_id}`
    );
    return res.status(200).json(data);
  }
  if (req.body.method === "DELETE") {
    const data = await Delete(
      `/cartitems?user_id=eq.${req.body.bodyValue.user_id}&item_id=eq.${req.body.bodyValue.item_id}`
    );
    return res.status(200).json(data);
  }
  if (req.body.method === "GET") {
    const data = await Get(
      `/cartitems?select=*,items(*)&user_id=eq.${req.body.bodyValue.user_id}`
    );
    return res.status(200).json(data);
  }
}
