import { createGuest, getGuest } from "@/app/_services/data-service";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Google auth
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        const guest = await getGuest(user.email);

        if (!guest) await createGuest({ email: user.email, name: user.name });

        return true;
      } catch (err) {
        return false;
      }
    },

    async session({ session, user }) {
      const guest = await getGuest(session.user.email);

      console.log(session, "session");

      session.user.guestId = guest?.id;

      return session;
    },
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authOptions);
