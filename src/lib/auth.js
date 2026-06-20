import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("TicketFlow");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
    //...other options
    emailAndPassword: {
        enabled: true,
    },
    user: {
       additionalFields: {
          role: {
              type: "string",
              default: "seeker"
            },
            plan: {
                default: "seeker_free"
            } 
        }
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
    },
    plugins: [
        admin()
    ]
});