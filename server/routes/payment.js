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

  router.put('/membership/plus', (req, res) => {
    // Assuming you have some logic here to identify the user whose membership type needs to be changed
    const userId = req.body.userId; // Assuming you receive the user ID in the request body

    // Update the membership type to "Plus" in the database
    db.updateUserMembershipType(userId, 'Plus', (err) => {
        if (err) {
            return res.status(500).send('Error updating membership type');
        }
        res.status(200).send('Membership type updated to Plus');
    });
});

// Route to remove membership type and change it to "S"
router.post('/change-membership', (req, res) => {
  const userId = req.body.userId; // Assuming you have the user ID in the request body

  // Update membership type to "S" directly in the database
  db.query("UPDATE userregistration SET MembershipTypeID = 'Plus' WHERE user_id = ?", [userId], (err, result) => {
      if (err) {
          console.error("Error updating membership type:", err);
          return res.status(500).send('Internal Server Error');
      }
      res.status(200).send('Membership type changed to Plus');
  });
});


  export default router;