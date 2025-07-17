// server/env.ts
import dotenv from 'dotenv';
dotenv.config();
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
