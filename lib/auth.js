import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import GoogleProdiver from "next-auth/providers/google";
import { redirect } from "next/navigation";

const db_url =
  "https://notes2-4ef20-default-rtdb.europe-west1.firebasedatabase.app";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        let allUsers = [];
        const response = await fetch(`${db_url}/users.json`);
        const data = await response.json();

        if (!data) console.log("Failed to fetch data from db (lib/auth)");

        for (const key in data) {
          let obj = data[key];
          obj.id = key;
          allUsers.push(obj);
        }

        const user = allUsers.find((user) => user.email === credentials.email);
        if (!user) console.log("Failed to find user from data (lib/auth)");

        if (user && user.password === credentials.password) {
          const userWithoutPassword = {
            username: user.username,
            email: user.email,
            id: user.id,
          };
          return userWithoutPassword;
        }
        console.log("Failed to authenticate user (lib/auth)");
        return null;
      },
    }),
    GoogleProdiver({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
