# 🚀 TicketFlow Client (Frontend Web Application)

TicketFlow Client is the flagship, highly responsive, and intuitively designed frontend interface for the **TicketFlow Online Ticket Booking Platform**. Engineered on top of the Next.js App Router paradigm, this application delivers a blazing-fast, single-page experience optimized for discovering, filtering, and booking multi-modal travel tickets (Bus, Train, Launch, and Flight). It features a unified design language powered by HeroUI and seamless state-to-URL synchronization, ensuring fluid journeys for passengers, transport operators, and system administrators alike.

---

## 🔗 Live Application & API Gateways

* **Production Web Deployment:** [https://ticket-flow-online.vercel.app](https://ticket-flow-online.vercel.app)
* **Backend API Instance:** [https://ticket-flow-server.vercel.app](https://ticket-flow-online.vercel.app)

---

## 🛠️ Tech Stack & Client-Side Dependency Matrix

The client architecture is built using a modern, compiled, and component-driven frontend stack:

* **Core Framework:** Next.js (App Router Architecture featuring Server and Client Components mix)
* **UI Library & Design System:** `@heroui/react` (Seamless, accessible, and high-performance Tailwind-integrated primitive components)
* **Animation Engine:** `motion/react` / Framer Motion (Orchestrating micro-interactions, layout transitions, and page entrances)
* **State & Authentication:** `better-auth` (Managing stateful database-backed sessions, social OAuth sign-ins, and secure routing)
* **Data Visualization:** `recharts` (Rendering live business telemetry, ticket performance graphs, and revenue streams on the Vendor Dashboard)
* **Payment Integration:** `@stripe/stripe-js` & `@stripe/react-stripe-js` (Injecting elements for secure credit card authorization)
* **Icons:** `react-icons` (Uniform iconography utilizing Feather and Financial vectors)

---

## 🛰️ Core Client Architecture & Design Systems

### 1. Proxy Search Routing Engine
The interface minimizes redundant data fetching through an asynchronous **Proxy Query Interception** pattern embedded in the home banner. Instead of triggering expensive real-time API scans directly from the landing viewport, the Hero Search Module intercepts user inputs (`from`, `to`, `transportType`), sanitizes the inputs, and dispatches them via client-side routing to the dedicated `/tickets` query engine.

### 2. Compound State-to-URL Synchronization
The discovery ledger employs a highly optimized, fully reactive query matrix pipeline. Filters for specific fleets (Bus, Train, Launch, Flight), dynamic sorting mechanisms (Price low-to-high, high-to-low, earliest departure), and interactive page transitions are bound directly to Next.js `useSearchParams`. This design layout facilitates bookmarkable URLs, seamless browser history traversal, and instant reactive rendering.

### 3. Defensive Prerendering & Build-Time Insulation
To handle dynamic server-side tasks during global deployment pipelines (`npm run build`), all administrative and transaction-heavy paths deploy strict **Static Opt-Out** boundaries using `export const dynamic = "force-dynamic";`. This defensive fallback paradigm prevents build-time compilation failure caused by missing environment tokens or null API responses.

---

## 💻 Multi-Tenant Dashboard Ecosystem

### 👤 1. Passenger Hub
* **Unified Discovery Grids:** Comprehensive filtering arrays coupled with case-insensitive location filters.
* **Stateful Checkout Pipelines:** Secured Stripe elements wrappers that fetch authenticated transaction intents from the core server.
* **Active Bookings Tracker:** Real-time visual cards displaying ticket trip statuses, countdown vectors, and travel details.

### 🚌 2. Transport Vendor Console
* **Fleet Control Panel:** Full CRUD interface for adding transport inventory, modifying seat pricing, and tracking individual asset schedules.
* **Booking Ledger Control:** Operations center allowing localized fleet operators to run state mutations (`Accept` or `Reject`) on pending passenger invoices.
* **Telemetry Analytics:** A data dashboard driven by `recharts` mapping visual analytics on monthly bookings and performance trends.

### 👑 3. Central Administration Command
* **Inventory Verification Pools:** Moderation pipeline to globally review, approve, or reject vendor-submitted listings.
* **Ad Space Management:** A dedicated curation matrix capped at a maximum of 6 active elements to toggle priority homepage features.
* **Platform Security Layer:** Global control panels to manage user access, elevate user records to staff nodes, or permanently flag fraudulent vendors.

---

## 🔑 Environment Variables Configuration

To launch this application on your local machine, establish a .env.local file inside the root workspace directory and provide the necessary target variables:

### API Endpoint Targets
NEXT_PUBLIC_API_URL=http://localhost:5000

### BetterAuth Service Links
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

### Gateway Access Clefs
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_publishable_key


### 📦 Local Installation Guide

Follow these steps to run the client-side system locally for feature modification:

1. Clone the repository:
   git clone [Insert Client Repo Link Here]
   cd ticket-flow-client

2. Install project dependencies:
   npm install

3. Initialize the local development node:
   npm run dev

Open http://localhost:3000 in your browser to view the application workspace.

---

Developed with 💻 and architectural precision by Shafiqul Islam Khan 