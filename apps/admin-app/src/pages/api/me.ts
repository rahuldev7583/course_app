import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_URL = process.env.API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Cookie: req.headers.cookie || "",
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin profile", error });
  }
}
