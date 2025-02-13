// Express server
const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "https://animated-meerkat-2d5d3b.netlify.app",
  })
);
app.use(express.json());

const stripe = require("stripe")("sk_test_51Kv9RvGa9sOwxIsovOU0IliCRkL4Qrvi0F1dis4M4Slk1TvEzcuYrx4zBuLZH1iU76ygkDtoXA3Gky6RJEdaBTDa00fDh2Oh1g");

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: req.body.email ? req.body.email : undefined,
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `https://animated-meerkat-2d5d3b.netlify.app/paymentsuccess/${req.body.secret}`,
      cancel_url: `https://animated-meerkat-2d5d3b.netlify.app/paymentfailed/${req.body.secret}`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/", async (req, res) => {
  res.send("Welcome to express server for payment");
});

app.listen(process.env.PORT || 5001, () => {
  console.log("🚀 Express server ready 🚀");
});
