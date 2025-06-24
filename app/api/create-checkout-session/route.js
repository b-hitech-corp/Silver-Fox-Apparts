// app/api/create-checkout-session/route.js
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.json();
  const { roomDetails, formData, user } = body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/rooms`,
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            // currency: "usd",
            currency: "xof",
            product_data: {
              name: `Booking: ${roomDetails.room_type}`,
            },
            unit_amount: Number(roomDetails.price) * 1000,
          },
          quantity: 1,
        },
      ],
      metadata: {
        user_id: user.uid,
        roomId: roomDetails.id,
        guests_count: formData.guests_count,
        check_in: formData.start_date,
        check_out: formData.end_date,
        room_type: roomDetails.room_type,
        room_price: roomDetails.price,
        payment_mode: formData.payment_mode,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
