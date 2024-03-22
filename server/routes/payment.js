import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post('/checkout', (req, res) => {
    const { cardNumber, expirationDate, cvv } = req.body;
  
    // Validate card number length (16 digits)
    if (cardNumber.length !== 16 || /\D/.test(cardNumber)) {
      return res.status(400).send('Invalid card number');
    }
  
    // Validate expiration date format (MM/YY)
    const expirationDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expirationDatePattern.test(expirationDate)) {
      return res.status(400).send('Invalid expiration date');
    }
  
    // Validate CVV length (3 or 4 digits)
    const cvvLength = cvv.length;
    if (cvvLength !== 3 && cvvLength !== 4 || /\D/.test(cvv)) {
      return res.status(400).send('Invalid CVV');
    }
  
    // If all validations pass, simulate a successful payment
    res.status(200).send('Payment successful');
  });

  export default router;