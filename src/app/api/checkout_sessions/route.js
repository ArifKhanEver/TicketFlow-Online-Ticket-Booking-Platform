import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../../lib/stripe'
import { getUser } from '@/lib/core/session'

export async function POST(request) {
  try {
    const headersList = await headers()
    // Fallback to the request's origin if the header is missing
    const origin = headersList.get('origin') || new URL(request.url).origin
    
    const formData = await request.formData()
    const bookingId = formData.get("bookingId")
    const totalPrice = formData.get("totalPrice") 
    const user = await getUser()

    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized access profile." }, { status: 401 });
    }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          // If the price is dynamic, replace 'price_...' with a dynamic price_data object
          price: 'price_1TmqV6K3hs4ff6WHRHV9GcQb', 
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id || '',
        userEmail: user.email || '',
        bookingId: bookingId || '', // Added so your webhook can identify this booking
      },
      mode: 'subscription',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    console.error("Stripe Session Creation Failure:", err);
    // Fixed: Return a proper error response instead of referencing an undefined session
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}