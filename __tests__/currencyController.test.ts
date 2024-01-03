import axios from "axios";
import { Request, Response } from "express";
import {
  getCurrencies,
  convertCurrency,
} from "../src/controllers/currencyController";

jest.mock("axios");

describe("Currency Controller Tests", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should get currencies successfully", async () => {
    const mockData = {
      data: {
        data: [
          { id: 1, name: "Bitcoin", symbol: "BTC" },
          { id: 2, name: "Ethereum", symbol: "ETH" },
        ],
      },
    };

    // @ts-ignore
    axios.get.mockResolvedValue(mockData);

    await getCurrencies(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith([
      { id: 1, name: "Bitcoin", symbol: "BTC" },
      { id: 2, name: "Ethereum", symbol: "ETH" },
    ]);
  });

  it("should handle errors when getting currencies", async () => {
    // @ts-ignore
    axios.get.mockRejectedValue(new Error("Network error"));

    await getCurrencies(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
    });
  });

  it("should convert currency successfully", async () => {
    const mockData = {
      data: {
        data: {
          quote: {
            USD: { price: 5000 },
            EUR: { price: 4000 },
          },
        },
      },
    };

    // @ts-ignore
    axios.get.mockResolvedValue(mockData);

    mockRequest.query = {
      amount: "10",
      id: "1",
      symbol: "BTC",
      time: "now",
      convert: "EUR",
    };

    await convertCurrency(mockRequest as Request, mockResponse as Response);

    // Update the expectation to match the correct value
    expect(mockResponse.json).toHaveBeenCalledWith({ convertedAmount: 4000 });
  });

  it("should handle errors when converting currency", async () => {
    // Mocking a rejected promise for the axios.get call
    // @ts-ignore
    axios.get.mockRejectedValue(new Error("Conversion error"));

    // Adding necessary query parameters, assuming they are all required
    mockRequest.query = {
      amount: "10",
      id: "1",
      symbol: "USD",
      time: "now",
      convert: "EUR",
    };

    // Calling the convertCurrency function
    await convertCurrency(mockRequest as Request, mockResponse as Response);

    // Assertions for error handling
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
    });
  });
});
