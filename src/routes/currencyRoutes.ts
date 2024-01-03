import express from "express";
import {
  getCurrencies,
  convertCurrency,
} from "../controllers/currencyController";

const router = express.Router();

router.get("/currencies", getCurrencies);
router.get("/convert", convertCurrency);

export default router;
