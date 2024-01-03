import { Request, Response } from "express";

interface ApiResponse {
  message: string;
  data?: any;
}

// Function to send a standard response
const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any
) => {
  const response: ApiResponse = { message };
  if (data) {
    response.data = data;
  }
  res.status(statusCode).json(response);
};

export default sendResponse;
