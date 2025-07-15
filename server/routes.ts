console.log("✅ Registering /api routes…");
// server/routes.ts
import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { STRIPE_SECRET_KEY } from "./env"; // ✅ use safe import

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2025-06-30.basil',
});

export async function registerRoutes(app: Express): Promise<Server> {
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
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error creating payment intent: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
