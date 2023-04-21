import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.cookies;
  const url = `${process.env.DB_URL}/sales?user_id=eq.${id}&select=farmer_data(farm_name,icon_imageurl),items(id,name,image)&order=id.desc&limit=1`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.DB_KEY}`,
      apikey: `${process.env.DB_KEY}`,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json(); //8000で取ってきたresponseをdataに代入,JSONからJSに変換
  res.status(200).json(data); //この関数handle(req,res)の引数で、fetch元のRecord関数へエクスポートする
}
