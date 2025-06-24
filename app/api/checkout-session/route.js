// app/api/checkout-session/route.js
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"],
    });
    // Extract only necessary fields
    const filteredResponse = {
      id: session.id,
      payment_intent: session.payment_intent?.id,
      payment_status: session.payment_status,
      amount_total: session.amount_total * 100,
      currency: session.currency,
      metadata: session.metadata,
    };

    return NextResponse.json(filteredResponse);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
