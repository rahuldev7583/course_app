import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_URL = process.env.API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { id } = req.query;
      const response = await axios.post(`${API_URL}/course/${id}`, null, {
        headers: {
          Cookie: req.headers.cookie || "",
        },
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: "Error purchasing course", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
