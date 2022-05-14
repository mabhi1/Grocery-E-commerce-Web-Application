// Apollo Server
const { ApolloServer } = require("apollo-server");

const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 Apollo Server ready at ${url} 🚀`);
});

// Express server
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

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
            success_url: `http://localhost:3000/paymentsuccess/${req.body.secret}`,
            cancel_url: `http://localhost:3000/paymentfailed/${req.body.secret}`,
        });
        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen({ port: process.env.PORT || 5001 }, () => {
    console.log("🚀 Express server ready at http://localhost:5001 🚀");
});
