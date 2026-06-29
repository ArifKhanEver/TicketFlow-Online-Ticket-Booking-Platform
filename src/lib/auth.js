import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin, jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

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
            signupRole: {
                type: "string",
                required: false,
                defaultValue: "user"
            }
        }
    }, databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    const finalRole = user.signupRole === "vendor" ? "vendor" : "user";
                    return {
                        data: {
                            ...user,
                            role: finalRole
                        }
                    };
                }
            }
        }
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
    },

    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 60* 24 * 30,
        }
    },
    plugins: [
        admin(), jwt()
    ]
});