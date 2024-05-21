import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_URL = process.env.API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { courseId } = req.query;
  const { published } = req.body;

  try {
    const response = await axios.put(
      `${API_URL}/course/publish/${courseId}`,
      { published },
      {
        headers: {
          Cookie: req.headers.cookie || "",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error });
  }
}
