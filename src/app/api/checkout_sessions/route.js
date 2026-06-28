import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../../lib/stripe'
import { getUser } from '@/lib/core/session'

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin') || new URL(request.url).origin
    
    const formData = await request.formData()
    const bookingId = formData.get("bookingId")
    const price = formData.get("totalPrice")
    const ticketTitle = formData.get('title')
    const ticketId =formData.get("ticketId")
    const user = await getUser()

    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized access profile." }, { status: 401 });
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: "bdt",
            unit_amount: Math.round(Number(price) * 100),
            product_data: {
              name: ticketTitle || "Travel Ticket",
            }
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id || '',
        price: Number(price),
        userEmail: user.email || '',
        bookingId: bookingId || '',
        ticketId,
        ticketTitle: ticketTitle || "Travel Ticket"
      },
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    console.error("Stripe Session Creation Failure:", err.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}