import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch(
    `${process.env.DB_URL}/farmer_data?order=id.desc&limit=4`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DB_KEY}`,
        apikey: `${process.env.DB_KEY}`,
      },
    }
  );
  const data = await response.json();
  res.status(200).json(data);
}
