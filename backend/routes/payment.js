const router = require("express").Router();
const dotenv = require('dotenv');
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post("/create", async (req, res) => {
        try {
                const paymentIntent = await stripe.paymentIntents.create (
                        {
                                amount: req.body.amount,
                                currency: "cad",
                        });
                //console.log(paymentIntent);
                res.status(200).json(paymentIntent);          
        }
        catch(err)
        {
                console.log("payment error ==============================")
                console.log(err);
                res.status(500).json(err);
        }
});
module.exports = router;
