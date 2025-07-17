console.log("✅ Registering /api routes…");
import { createServer } from "http";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "./env.js"; // ✅ use safe import
const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2025-06-30.basil',
});
export async function registerRoutes(app) {
    app.post("/api/create-payment-intent", async (req, res) => {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: 300,
                currency: "usd",
                metadata: {
                    product: "bio_page_creation"
                }
            });
            res.json({ clientSecret: paymentIntent.client_secret });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error creating payment intent: " + error.message });
        }
    });
    const httpServer = createServer(app);
    return httpServer;
}
