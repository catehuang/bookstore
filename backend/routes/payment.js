const router = require("express").Router();
const stripe = require("stripe")(`sk_test_51L2PfuDPS4dF2ifL3Bke0jXtrlLmhQ6KD9XiYLHlHcQduIgoeswLgPQYaDaY8K9Hb7CVnVGZpN3yNKLORzyaIcAK00Jc6ds6js`);

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
