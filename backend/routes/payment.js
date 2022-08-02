const router = require("express").Router();
const stripe = require("stripe")(``);

console.log(process.env.STRIPE_SECRET);

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
