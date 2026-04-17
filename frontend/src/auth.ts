import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { JWT } from "next-auth/jwt";
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 10 * 60, // 10 minutes
    updateAge: 60,   // update every 1 minute
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          phone_number: user.phone_number,
          profile_image: user.profile_image,
          is_first_logged_in: user.is_first_logged_in,
          accessToken: user.accessToken,
        };
      }

      if (token.exp && (token.exp as number) < Date.now() / 1000) {
        console.log("Token expired");
        return null;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken as string,
        user: {
          ...session.user,
          id: token.id as string,
          phone_number: token.phone_number as string | null,
          profile_image: token.profile_image as string | null,
          is_first_logged_in: token.is_first_logged_in as boolean,
        },
      };
    },
  },
});

// Type augmentations
declare module "next-auth" {
  interface User {
    accessToken?: string;
    id: string;
    phone_number?: string | null;
    profile_image?: string | null;
    is_first_logged_in?: boolean;
  }

  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      phone_number?: string | null;
      profile_image?: string | null;
      is_first_logged_in?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
    phone_number?: string | null;
    profile_image?: string | null;
    is_first_logged_in?: boolean;
  }
}
