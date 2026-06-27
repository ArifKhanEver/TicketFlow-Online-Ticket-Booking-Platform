import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID={
    "seeker_pro":"price_1TmqV6K3hs4ff6WHRHV9GcQb",

}