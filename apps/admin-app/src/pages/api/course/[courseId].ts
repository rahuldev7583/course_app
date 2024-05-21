import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_URL = process.env.API_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { courseId } = req.query;

  if (req.method === "PUT") {
    try {
      const response = await axios.put(
        `${API_URL}/course/${courseId}`,
        req.body,
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
  } else if (req.method === "DELETE") {
    try {
      const response = await axios.delete(`${API_URL}/course/${courseId}`, {
        headers: {
          Cookie: req.headers.cookie || "",
        },
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: "Error deleting course", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
