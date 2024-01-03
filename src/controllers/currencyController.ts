import { Request, Response } from "express";
import axios from "axios";

export const getCurrencies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const API_KEY = process.env.API_KEY;

    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: {
          start: 1,
          limit: 100,
          convert: "USD",
        },
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
        },
      }
    );

    const currencies = response.data.data.map((crypto: any) => ({
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
    }));

    res.json(currencies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const convertCurrency = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { amount, id, symbol, time, convert } = req.query;

  try {
    const API_KEY = process.env.API_KEY;
    console.log(API_KEY);
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v2/tools/price-conversion",
      {
        params: {
          amount,
          id,
          symbol,
          time,
          convert: convert as string, // Explicitly cast convert to string
        },
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
        },
      }
    );

    const convertedAmount =
      response.data.data.quote[(convert as string).toUpperCase()].price; // Assert convert to string

    res.json({ convertedAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
