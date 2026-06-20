import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID={
    "seeker_pro":"price_1TjG74J1ByIUkEuuzM8pbdOd",
    "seeker_premium":"price_1TjG7jJ1ByIUkEuuVdOpPU7s",
    "recruiter_growth":"price_1TjG8eJ1ByIUkEuuORS6lNgr",
    "recruiter_enterprise":"price_1TjG9LJ1ByIUkEuuzXB3hw89"
}