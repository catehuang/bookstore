const router = require("express").Router();
const dotenv = require('dotenv');
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post("/create", (req, res) => {
        stripe.paymentIntents.create(
                {
                        amount: req.body.amount,
                        currency: "cad",
                },
                (stripeErr, stripeRes) => {
                        if (stripeErr) {
                                res.status(500).json(stripeErr);
                        } else {
                                res.status(200).json(stripeRes);
                        }
                }
        );
});
module.exports = router;
